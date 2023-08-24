import React, {useState} from 'react'
import { Link, Outlet, useNavigate } from "react-router-dom";
import classCondition from "../utils/classCondition";

const Aside = ({setView, view}) => {

    return (
      <div className="flex flex-col justify-between h-full">
        <div className="flex-grow">
          <div className="px-4 py-6 text-center border-b">
            <h1 className="text-xl font-bold leading-none">
              <span className="text-red-700">Apple a Day</span> Dashboard
            </h1>
          </div>
          <div className="p-0">
            <Link
              to="/reports/shifts"
              className={classCondition(
                "flex items-center font-bold text-sm py-3 px-4 w-full outline-none ",
                view === "shifts"
                  ? "bg-red-200 text-red-900 border-0"
                  : "hover:bg-red-50"
              )}
              onClick={() => setView("shifts")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="text-lg mr-4"
                viewBox="0 0 16 16"
              >
                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
              </svg>
              Shifts
            </Link>
            <Link
              to="/reports/customers"
              className={classCondition(
                "flex items-center font-bold text-sm py-3 px-4 w-full outline-none ",
                view === "customers"
                  ? "bg-red-200 text-red-900 border-0"
                  : "hover:bg-red-50"
              )}
              onClick={() => setView("customers")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="text-lg mr-4"
                viewBox="0 0 16 16"
              >
                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
              </svg>
              Customers
            </Link>
            <Link
              to="/reports/new-customer"
              className={classCondition(
                "flex items-center font-bold text-sm py-3 px-4 w-full outline-none ",
                view === "new-customer"
                  ? "bg-red-200 text-red-900 border-0"
                  : "hover:bg-red-50"
              )}
              onClick={() => setView("new-customer")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="text-lg mr-4"
                viewBox="0 0 16 16"
              >
                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
              </svg>
              Add a Customer
            </Link>


          </div>
        </div>
        <div className="p-4">
          <button
            type="button"
            className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              className=""
              viewBox="0 0 16 16"
            >
              <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg>
          </button>{" "}
          <span className="font-bold text-sm ml-2">Logout</span>
        </div>
      </div>

    )
}

export default Aside