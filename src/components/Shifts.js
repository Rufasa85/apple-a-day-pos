import React, {useState} from 'react'
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
dayjs.extend(advancedFormat);

const Shifts = ({shifts}) => {

    return (
        <>
          {shifts.map(shiftCard)}
        </>
    )
}

const shiftCard = (shiftObj) => {
  const totalOrders = shiftObj.Orders.length;
  const itemCounts = {};
  shiftObj.Items.forEach((item) => {
    itemCounts[item.id] = { name: item.name, count: 0 };
  });
  shiftObj.Orders.forEach((order) => {
    order.OrderItems.forEach((orderItem) => {
      itemCounts[orderItem.ItemId].count =
        itemCounts[orderItem.ItemId].count + 1;
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
    <Link to={`/reports/shifts/${shiftObj.id}`} key={shiftObj.id}>
      <div className="card p-3 shadow bg-slate-50 my-3 hover:bg-slate-100">
        <h2>Date: {dayjs(shiftObj.date).format("MMMM Do, YYYY")}</h2>
        <h2>Total Orders: {totalOrders}</h2>
        <h4>
          Best Selling Item: {bestItem.name} ({bestItem.count})
        </h4>
      </div>
    </Link>
  );
};

export default Shifts