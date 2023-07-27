import React, { useState } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import api from "../utils/API";
import Loading from "../components/Loading";
import ComboboxEl from "../components/ComboboxEl";
import getEmoji from "../utils/getEmoji";
import twColors from "../utils/twColors";
import classCondition from "../utils/classCondition";

const Service = ({ userId }) => {
  const [order, setOrder] = useState({});
  // const [orderIds, setOrderIds] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [shiftId, setShiftId] = useState(0);
  const [customer, setCustomer] = useState({ id: 0, name: "NONE" });

  const today = dayjs().format("MM/DD/YYYY");
  const { data: itemData, isLoading: itemLoading } = useQuery({
    queryKey: `items-${today}`,
    queryFn: () => api.getTodaysItems(userId),
    onSuccess: (data) => {
      // setItems(data.items)
      // if 404, redirect to menu
      setShiftId(data.data.id);
    },
  });

  const { data: customerData, isLoading: customerLoading } = useQuery({
    queryKey: `all-customers`,
    queryFn: () => api.getAllCustomers(),
  });

  const submitOrder = async () => {
    const yes = window.confirm(`Are you sure you'd like to submit this order?`);
    if (yes) {
      const orderIds = []
      for (const key in order) {
        for (let i=0; i>order[key].count;  i++) {
          orderIds.push(key)
        }
      }
      const res = await api.createOrder({
        ShiftId: shiftId,
        CustomerId: customer.id === 0 ? null : customer.id,
        ItemIds: orderIds,
      });
      if (res.status === 200) {
        console.log("order added!");
        reset();
      } else {
        window.alert("order failed");
      }
    }
  };

  const reset = () => {
    setCustomer({ id: 0, name: "NONE" });
    setItemCount(0);
    setOrder({});
    // setOrderIds([]);
  };

  const addToOrder = (id, name) => {
    if (id in order) {
      order[id].count = order[id].count + 1;
    } else {
      order[id] = { name, count: 1 };
    }
    // setOrderIds([...orderIds, id]);
    setItemCount(itemCount + 1);
  };

  const decrementItem = (itemId) => {
    // setOrder(prevState => {
    //   const temp = {itemId: {...prevState[itemId], count: prevState[itemId].count - 1}}
    //   return temp
    // })
    const temp = {...order}

    temp[itemId].count = temp[itemId].count -1
    setOrder(temp)
  }

  return (
    <main className="pt-8 px-24 pb-16 flex flex-col">
      <header className="p-4 gap-1 flex flex-col place-content-center place-items-center  rounded-3xl mb-4">
        <h1 className="text-4xl font-medium">Service</h1>
        <h3 className="text-xl font-light">{today}</h3>
      </header>
      {customerLoading ? null : (
        <div className="mb-10">
          <h2 className="text-xl mb-4">
            Select Customer <span className="text-slate-400">(optional)</span>
          </h2>
          <ComboboxEl
            customerList={[
              { id: 0, name: "NONE" },
              ...customerData.data.map((x) => {
                return { id: x.id, name: x.firstName + " " + x.lastName };
              }),
            ]}
            customer={customer}
            setCustomer={setCustomer}
          />
        </div>
      )}

      {itemLoading ? (
        <Loading />
      ) : (
        <article className="grid grid-cols-8 gap-6 mb-6">
          <section className="col-span-6 grid grid-cols-2 gap-8">
            {itemData?.data.Items.length > 0 &&
              itemData?.data.Items.sort(
                (a, b) => a.ShiftItem.createdAt > b.ShiftItem.createdAt
              ).map(({ id, name }, i) => {
                return (
                  <button
                    key={`menuitem-${id}`}
                    className={classCondition(
                      twColors.getColorClasses(i),
                      "p-12 h-72 gap-4 flex grow flex-col place-content-center place-items-center rounded-3xl border-2 opacity-95 shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-gray-200 hover:opacity-90 active:shadow-md active:shadow-gray-200 active:opacity-100"
                    )}
                    onClick={() => addToOrder(id, name)}
                  >
                    <h2 className="text-9xl font-semibold">{getEmoji(name)}</h2>
                    <h2 className="text-3xl font-semibold">{name}</h2>
                  </button>
                );
              })}
          </section>
          <section className="col-span-2">
            <h2 className="text-2xl">Current Order:</h2>
            <div className="mb-8">
              <ul>
                {Object.entries(order).map((item) => {
                  return (
                    <li key={item[0]} className="flex">
                      <p className="p-1">
                        {item[1].count}x {item[1].name}
                      </p>
                      <button className="p-1 bg-red-500 text-white hover:bg-red-700 rounded ml-2" onClick={() => decrementItem(item[0])}>
                        Delete
                      </button>
                      <button className="p-1 bg-blue-500 text-white hover:bg-blue-700 rounded ml-2">
                        Update quantity
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="">
              <button
                className={classCondition(
                  "bg-green-700 text-white font-bold p-3 text-lg rounded shadow",
                  itemCount === 0
                    ? "opacity-50"
                    : "opacity-100 hover:bg-green-900"
                )}
                disabled={itemCount === 0}
                onClick={submitOrder}
              >
                Submit Order
              </button>
            </div>
          </section>
        </article>
      )}
    </main>
  );
};

export default Service;
