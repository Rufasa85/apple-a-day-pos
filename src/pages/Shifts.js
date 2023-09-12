import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import Loading from "../components/Loading";
import { api } from "../utils";

dayjs.extend(advancedFormat);

const Shifts = () => {
  const today = dayjs().format("MM-DD-YYYY");

  const { data: response, isLoading } = useQuery({
    queryKey: `${today}/all-shifts`,
    queryFn: () => api.getAllShifts(),
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="p-6">
          <h2 className="text-3xl mb-5">Recent Shifts</h2>
          <ul>{response?.data?.map(shiftCard)}</ul>
          {!response ? <p>No shifts yet :(</p> : null}
        </div>
      )}
    </>
  );
};

const shiftCard = (shiftObj) => {
  const totalOrders = shiftObj.Orders.length;
  const itemCounts = {};

  shiftObj.ShiftItems.forEach((shiftitem) => {
    itemCounts[shiftitem.Item.id] = { name: shiftitem.Item.name, count: 0 };
  });

  shiftObj.Orders.forEach((order) => {
    order.OrderItems.forEach((orderItem) => {
      itemCounts[orderItem.ItemId].count =
        itemCounts[orderItem.ItemId].count + orderItem.quantity;
    });
  });

  let bestItem = {
    name: "",
    count: 0,
  };

  for (const [key, value] of Object.entries(itemCounts)) {
    if (value.count > bestItem.count) {
      bestItem = value;
    }
  }

  return (
    <li
      className="mb-4 p-3 bg-white rounded shadow hover:bg-red-100"
      key={shiftObj.id}
    >
      <Link to={`/reports/shifts/${shiftObj.id}`}>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className=""
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-medium text-gray-600 truncate">
              Date:{" "}
              <span className="font-semibold text-gray-900">
                {dayjs(shiftObj.date, "YYYY-MM-DD").format("MMMM Do, YYYY")}
              </span>
            </p>
            <p className="text-md font-medium text-gray-600 truncate">
              Total Orders:{" "}
              <span className="font-semibold text-gray-900">
                {shiftObj.Orders.length}
              </span>
            </p>
          </div>
          <div className="inline-flex items-center text-base text-gray-600">
            Best Selling Item:&nbsp;
            <span className="font-semibold text-gray-900">{`${bestItem.name} (${bestItem.count})`}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Shifts;
