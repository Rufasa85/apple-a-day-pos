import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import Loading from "../components/Loading";
import api from "../utils/API";
import Icons from "../components/Icons";

dayjs.extend(advancedFormat);

const Customers = () => {
  const today = dayjs().format("MM-DD-YYYY");

  const { data: response, isLoading } = useQuery({
    queryKey: `${today}/all-customers`,
    queryFn: () => api.getAllCustomers(),
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="p-6">
          <h2 className="text-3xl text-gray-900 mb-5">All Customers</h2>
          <ul>{response?.data?.map(customerCard)}</ul>
          {!response ? <p>No customers yet :(</p> : null}
        </div>
      )}
    </>
  );
};

const customerCard = (customerObj) => {
  return (
    <li className="mb-4 p-3 bg-white rounded shadow hover:bg-red-100" key={customerObj.id}>
      <Link to={`/reports/customers/${customerObj.id}`}>
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
            <p className="text-md font-medium text-gray-900 truncate">
              {customerObj.firstName} {customerObj.lastName}
            </p>
            <p className="text-sm text-gray-500 truncate flex">
              {Icons.Cake({ className: "h-5 mr-1" })}
              {dayjs(customerObj.dateOfBirth, "YYYY-MM-DD").format(
                "MMM DD, YYYY"
              )}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900">
            Orders: {customerObj.Orders.length}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Customers;
