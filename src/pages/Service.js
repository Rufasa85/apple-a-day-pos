import React, { useState } from "react";
import { useQuery } from "react-query";
import api from "../utils/API"

const Service = () => {
  const [order, setOrder] = useState([]); // array of itemIds
  const [items, setItems] = useState([]); // array of 4 item objects with id, name,
  const [first, setfirst] = useState(second)
  const [shiftId, setShiftId] = useState(0)
  const [customerId, setCustomerId] = useState(0)

  const currentDay = dayjs().format("MM/DD/YYYY");
  const { data, isLoading } = useQuery({
    queryKey: currentDay,
    queryFn: () => api.getTodaysShift(),
    onSuccess: (data) => {
      setItems(data.items)
      setShiftId(data.shiftId)
    },
  });

  const submitOrder = async () => {
    const confirm = confirm(`Are you sure you'd like to submit this order?`)
    if (confirm) {
      api.createOrder({
        ShiftId: shiftId,
        CustomerId: customerId
      })
    }
  };

  const addItem = (itemId) => {
    setOrder((data) => [...data, itemId]);
  };

  const buttons = items.map((item) => {
    return (
      <button className="col-span-1 py-5" onClick={addItem(item.id)}>
        {item.name}
      </button>
    );
  });

  return (
    <div className="container">
      <h3 className="text-2xl">Service</h3>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-6 gap-3">
          {/* buttons for each item */}
          <div className="col-span-4 grid grid-cols-2">{buttons}</div>
          {/* current order */}
          <div className="col-span-2">
            <button onClick={submitOrder}>Submit Order!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
