import React, { useState } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import api from "../utils/API";
import Loading from "../components/Loading";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

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
      getItemCounts(response.data.Orders);
      setDate(dayjs(response.data.date).format("MMMM Do, YYYY"));
    },
  });

  const getItemCounts = (orders) => {
    const counts = {};
    setOrders(
      orders.map((order) => {
        order.OrderItems.forEach((orderItem) => {
          if (orderItem.Item.name in counts) {
            counts[orderItem.Item.name] = counts[orderItem.Item.name] + 1;
          } else {
            counts[orderItem.Item.name] = 1;
          }
        });
        return (
          <div className="card p-3 m-2 shadow bg-slate-50" key={order.id}>
            <h3>Order ID: {order.id}</h3>
            <h3>Customer ID: {order.CustomerId}</h3>
            <h3>Items:</h3>
            <ul>
              {order.OrderItems.map((orderItem) => {
                return <li key={orderItem.id}>{orderItem.Item.name}</li>;
              })}
            </ul>
          </div>
        );
      })
    );
    setItemCounts(counts);
  };

  console.log(Object.values(itemCounts));

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="my-4 text-3xl">Shift Report for {date}</h3>
      <div className="">
        <Doughnut
          data={{
            labels: Object.keys(itemCounts),
            datasets: [
              {
                label: "# of Votes",
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
        />
      </div>
      <div>
        <h4>Orders:</h4>
        {isLoading ? <Loading /> : null}
        {orders.length > 0 ? <div>{orders}</div> : null}
      </div>
    </div>
  );
};

export default ShiftReport;
