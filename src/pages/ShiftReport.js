import { useState } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import api from "../utils/API";
import Loading from "../components/Loading";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import OrderCard from "../components/OrderCard";

ChartJS.register(ArcElement, Tooltip, Legend);
dayjs.extend(advancedFormat);

const ShiftReport = () => {
  const [itemCounts, setItemCounts] = useState({});
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState("");

  const shiftId = window.location.pathname.split("/")[3];

  const { data, isLoading } = useQuery({
    queryKey: `report-${shiftId}`,
    queryFn: () => api.getOneShift(shiftId),
    onSuccess: (response) => {
      if (response && response.data) {
        getItemCounts(response.data.Orders);
        setDate(dayjs(response.data.date).format("MMMM Do, YYYY"));
      } else {
        setDate("No shift with this ID")
      }
    },
  });

  const getItemCounts = (orders) => {
    const counts = {};
    setOrders(
      orders.map((order) => {
        order.OrderItems.forEach((orderItem) => {
          if (orderItem.Item.name in counts) {
            counts[orderItem.Item.name] =
              counts[orderItem.Item.name] + orderItem.quantity;
          } else {
            counts[orderItem.Item.name] = orderItem.quantity;
          }
        });
        return order;
      })
    );
    setItemCounts(counts);
  };

  const sortOrders = () => {
    const sorted = orders.sort((a, b) => {
      if (a.Customer && b.Customer) {
        return a.Customer?.firstName.localeCompare(b.Customer?.firstName);
      } else if (!a.Customer) {
        return 1;
      } else {
        return -1;
      }
    });
    setOrders(sorted);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h3 className="text-2xl mb-0">Shift Report</h3>
      {isLoading ? <Loading /> : null}
      <h5 className="text-xl text-gray-600">{date}</h5>
      <div className="grid grid-cols-6 mt-5 gap-6">
        <div className="col-span-4">
          <h4 className="text-2xl mb-3">Items</h4>
          <div className="h-[450px]">
            <Doughnut
              className="mx-auto"
              style={{height: "450px", width: "450px"}}
              data={{
                labels: Object.keys(itemCounts),
                datasets: [
                  {
                    label: "Quantity",
                    data: Object.values(itemCounts),
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      font: {
                        size: 20
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="col-span-2 ">
          <div className="mb-4">
            <h4 className="text-2xl">Orders</h4>
            {/* <button className="text-blue-400" onClick={sortOrders}>
              Sort by customer name
            </button> */}
          </div>
          {orders.length > 0 ? (
            <ul className="h-[480px] overflow-y-scroll">
              {orders.map((order) => {
                return <OrderCard order={order} key={order.id} />;
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ShiftReport;
