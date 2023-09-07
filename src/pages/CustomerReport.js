import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../utils/API";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import dayjs from "dayjs";
import OrderCard from "../components/OrderCard";
import { classCondition } from "../utils";

const CustomerReport = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [visible, setVisible] = useState(false);

  const customerId = window.location.pathname.split("/")[3];

  const { data: response, isLoading } = useQuery({
    queryKey: `customer/${customerId}`,
    queryFn: () => api.getOneCustomer(customerId),
    onSuccess: (response) => {
      const { data } = response;
      const { firstName, lastName, dateOfBirth } = data;
      setFirstName(firstName);
      setLastName(lastName);
      setDateOfBirth(
        dateOfBirth ? new Date(dayjs(dateOfBirth, "YYYY-MM-DD").format("MM/DD/YYYY")) : null
      );
    },
  });

  const updateCustomer = async (event) => {
    event.preventDefault();
    if (firstName === "") {
      return alert("First name cannot be blank");
    }
    if (lastName === "") {
      return alert("Last name cannot be blank");
    }
    const response = await api.updateCustomer(customerId, {
      firstName,
      lastName,
      dateOfBirth,
    });
    if (response.status === 200) {
      window.location.assign("/reports/customers");
    } else {
      alert("something went wrong (check console for more info)");
    }
  };

  //checking if anything has changed (button disable if no)
  const newInfo = () => {
    const day1 = response.data.dateOfBirth ? new Date(
      dayjs(response.data.dateOfBirth, "YYYY-MM-DD").format("MM/DD/YYYY")
    ).getTime() : null;
    const day2 = dateOfBirth ? new Date(dateOfBirth).getTime() : null;
    const disabled =
      response.data.firstName === firstName &&
      response.data.lastName === lastName &&
      day1 === day2;
    return disabled;
  };

  const confirmDeleteCustomer = async () => {
    setVisible(true)
  }

  const deleteCustomer = async (e) => {
    e.preventDefault()
    const res = await api.deleteCustomer(customerId)
    window.location.replace("/reports/customers")
  }

  const modalOptions = {
		visible,
		setVisible,
		title: 'Confirm Delete',
		description: `Are you sure you want to delete ${firstName} ${lastName}?`,
		buttonText: 'Delete',
		buttonClassName: "bg-red-600 text-white rounded px-2",
		onSubmit: deleteCustomer
	};

  return (
    <div className="relative">
      <Link
        to="/reports/customers"
        className="absolute -left-5 top-7 hover:border-b-2 border-black"
      >
        <img
          width="30"
          height="30"
          src="https://img.icons8.com/ios/50/long-arrow-left.png"
          alt="long-arrow-left"
          className=""
        />
        {/* <span className="inline flex text-2xl ml-2">Back</span> */}
      </Link>
      <div className="p-6">
        <h3 className="text-3xl mb-4">Customer Info</h3>
        {isLoading ? <Loading /> : null}
        {response ? (
          <div>
            <form onSubmit={updateCustomer} className="mb-4">
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
                <DatePicker
                  selected={dateOfBirth}
                  onChange={(date) => setDateOfBirth(date)}
                  id="birthday"
                  placeholderText="MM/DD/YYYY"
                />
              </div>
            </form>
            <div>

              <button
                className={classCondition(
                  newInfo() ? "bg-blue-200" : "bg-blue-400 hover:bg-blue-500",
                  "text-white rounded shadow-md p-2"
                )}
                type="submit"
                disabled={newInfo()}
                onClick={updateCustomer}
              >
                Save Customer
              </button>
              <button
                className="bg-red-600 text-white p-2 rounded shadow-md hover:bg-red-700 ml-5"
                onClick={confirmDeleteCustomer}
              >
                Delete Customer
                
              </button>
            </div>
            <div className="justify-start">
              <h2 className="text-xl my-4 font-semibold block">Orders</h2>

              <ul className="grid grid-cols-2">
                {response.data.Orders.map((order) => {
                  const customerInfo = {
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                  }
                  order.Customer = customerInfo
                  return (
                  <OrderCard order={order} customer={response.data} />
                )})}
              </ul>
            </div>
            <Modal options={modalOptions} className="relative">

            </Modal>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CustomerReport;
