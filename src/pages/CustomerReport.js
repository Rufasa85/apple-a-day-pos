import { useState } from "react";
import { useQuery } from "react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../utils/API";
import Loading from "../components/Loading";
import dayjs from "dayjs";
import OrderCard from "../components/OrderCard";
import { classCondition } from "../utils";

const CustomerReport = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();

  const customerId = window.location.pathname.split("/")[3];

  const { data: response, isLoading } = useQuery({
    queryKey: `customer/${customerId}`,
    queryFn: () => api.getOneCustomer(customerId),
    onSuccess: (response) => {
      const {data} = response
      const {firstName, lastName, dateOfBirth} = data
      setFirstName(firstName);
      setLastName(lastName);
      setDateOfBirth(new Date(dayjs(dateOfBirth, "YYYY-MM-DD").format('MM/DD/YYYY')));
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
    console.log(response)
    if (response.status === 200) {
      window.location.assign("/reports/customer");
    } else {
      console.log(response);
      alert("something went wrong (check console for more info)");
    }
  };
  
  //checking if anything has changed (button disable if no)
  const newInfo = () => {
    const day1 = new Date(dayjs(response.data.dateOfBirth, "YYYY-MM-DD").format('MM/DD/YYYY')) 
    const day2 = new Date(dateOfBirth)
    const disabled = response.data.firstName === firstName && response.data.lastName === lastName && day1.getTime() === day2.getTime() 
    return disabled
  }



  return (
    <div className="container">
      <h3 className="text-3xl">Customer Details</h3>
      {isLoading ? <Loading /> : null}
      {response ? (
        <div>
          <h3 className="my-5 text-xl">Edit Info</h3>
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
            <button
              className={classCondition(newInfo() ? "bg-red-200" : "bg-red-400 hover:bg-red-500", "text-white rounded shadow-md p-2")}
              type="submit"
              disabled={newInfo()}
            >
              Save Customer
            </button>
          </form>
          <div className="justify-start">
            <h2 className="text-xl mb-2">Orders</h2>
            
            <ul className="grid grid-cols-2">
              {response.data.Orders.map((order) => (
                <OrderCard order={order} customer={response.data} />
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CustomerReport;
