import React, { useState } from "react";
import { classCondition } from "../utils";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";

const OrderCard = ({ order }) => {

  const customerInfo = order.Customer;
  return (
    <li className="items-center text-gray-900 mb-4" key={order.id}>
      <div className="rounded-md w-5/6 mx-auto shadow-lg p-2 bg-white">
        <div className="text-md pl-2">
          <div className="mb-1 text-gray-600">Order ID：<span className="text-gray-900">{order.id}</span></div>
          <div className="mb-1 text-gray-600">
            Customer：
            <span className="text-gray-900">{customerInfo ? `${customerInfo.firstName} ${customerInfo.lastName}` : "None"}</span>
          </div>
        </div>
        <div className="border-double border-t-4 border-b-4 border-l-0 border-r-0 border-gray-900 my-3">
          <div className="flex text-sm pt-1 px-1">
            <span className="w-3/6 text-gray-600">Item</span>
            <span className="w-3/6 text-gray-600 text-right">Quantity</span>
          </div>
          <div className="border-dashed border-t border-b border-l-0 border-r-0 border-gray-900 mt-1 my-2 py-2 px-1">
            {order.OrderItems.map((item) => {
              return (
                <div className="flex justify-between text-sm" key={item.id}>
                  <span className="w-3/6 truncate">{item.Item.name}</span>
                  <span className="w-3/6 text-right">{item.quantity}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </li>
  );
};

export default OrderCard;
