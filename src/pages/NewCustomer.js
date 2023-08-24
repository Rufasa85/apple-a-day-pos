import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../utils/API";
import dayjs from "dayjs"
import { classCondition } from "../utils";

const NewCustomer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [infoText, setInfoText] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const saveCustomer = async (event) => {
    event.preventDefault()
    if (firstName === "") {
      return alert("First name cannot be blank");
    }
    if (lastName === "") {
      return alert("Last name cannot be blank");
    }
    const dob = dayjs(dateOfBirth).format("MM/DD/YYYY")
    const body = {firstName, lastName, dateOfBirth: dob}
    const response = await api.createCustomer(body)
    if (response.status === 200) {
      setDateOfBirth(null)
      setFirstName("")
      setLastName("")
      setInfoText("Successfully added!")
      setTimeout(() => {
        setInfoText("")
      }, 3000);
    } else {
      console.log(response)
      alert("something went wrong (check console for more info)")
    }
  }

  const validInfo = () => {
    if (firstName !== "" && lastName !== "") {
      return true
    } else {
      return false
    }
  }

  return (
    <div className="p-6">
      <h3 className=" text-2xl">New Customer</h3>
      <p className="italic text-green-500 font-light mb-3">{infoText}</p>
      <form onSubmit={saveCustomer}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="first-name"
          >
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="first-name"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="last-name"
          >
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="last-name"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="birthday"
          >
            Birthday
          </label>
          <DatePicker selected={dateOfBirth} onChange={(date) => setDateOfBirth(date)} id="birthday" placeholderText="MM/DD/YYYY"
          dateFormat={"MM/dd/yyyy"}/>
        </div>
        <button
              className={classCondition(!validInfo() ? "bg-red-200" : "bg-red-400 hover:bg-red-500", "text-white rounded shadow-md p-2")}
              type="submit"
              disabled={!validInfo()}
            >
              Save Customer
            </button>
      </form>
    </div>
  );
};

export default NewCustomer;
