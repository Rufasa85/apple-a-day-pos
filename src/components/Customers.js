import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import Loading from "../components/Loading";
import api from "../utils/API";

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
        <>
          <h2 className="text-2xl text-gray-900 mb-5">All Customers</h2>
          {response.data.map(customerCard)}
        </>
      )}
    </>
  );
};

const customerCard = (customerObj) => {
  return (
    <Link to={`/reports/customers/${customerObj.id}`} key={customerObj.id}>
      <div className="card p-3 shadow bg-slate-50 my-3 hover:bg-slate-100">
        <h2>Name: {`${customerObj.firstName} ${customerObj.lastName}`}</h2>
        <h2>DOB: {dayjs(customerObj.dateOfBirth).format("MMMM Do, YYYY")}</h2>
        <h2>Number of orders: {customerObj.Orders.length}</h2>
      </div>
    </Link>
  );
};

export default Customers;
