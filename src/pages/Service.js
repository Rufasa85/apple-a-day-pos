import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../components/Loading";
import dayjs from "dayjs";
import api from "../utils/API"

const Service = () => {
  const currentDay = dayjs().format("MM/DD/YYYY");
  const { data, isLoading } = useQuery({
    queryKey: currentDay,
    queryFn: 
  });

  return (
    <div className="container">
      <h3 className="text-2xl">Service</h3>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-6 gap-3">
          {/* buttons for each item */}
          <div className="col-span-4 grid grid-cols-2"></div>
          {/* current order */}
          <div className="col-span-2"></div>
        </div>
      )}
    </div>
  );
};

export default Service;
