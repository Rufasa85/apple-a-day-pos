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
            counts[orderItem.Item.name] =
              counts[orderItem.Item.name] + orderItem.quantity;
          } else {
            counts[orderItem.Item.name] = orderItem.quantity;
          }
        });
        return <OrderCard order={order} />;
      })
    );
    setItemCounts(counts);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h3 className="text-3xl mb-1">Shift Report</h3>
      {isLoading ? <Loading /> : null}
      <h5 className="text-2xl text-gray-600">{date}</h5> 
      <div className="grid grid-cols-6 mt-5 gap-6">
        <div className="col-span-4 max-h-screen">
          <h4 className="text-xl mb-3">Items</h4>
          <Doughnut
            className="text-lg"
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
          />
        </div>
        <div className="col-span-2">
          <h4 className="text-xl mb-4">Orders</h4>
          
          {orders.length > 0 ? <ul className="overflow-scroll max-h-screen">{orders}</ul> : null}
        </div>
      </div>
    </div>
  );
};

export default ShiftReport;
