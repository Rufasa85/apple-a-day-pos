import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import Aside from "../components/Aside";
import classCondition from "../utils/classCondition";

const Reports = () => {
  const [view, setView] = useState(window.location.pathname.split("/")[2]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!view) {
      navigate("/reports/shifts");
    }
  }, []);

  return (
    <main className="bg-slate-50 grid grid-cols-6 flex pt-[84px] h-screen">
      <aside className="bg-white shadow-md col-span-1 flex-1">
        <Aside setView={setView} view={view} />
      </aside>
      <section className="col-span-5 flex-1 overflow-auto">
        <Outlet />
      </section>
    </main>
  );
};

export default Reports;
