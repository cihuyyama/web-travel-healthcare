"use client"

import React, { useEffect, useState } from "react";
import { diseaseColumns, exampleData } from "./columns";
import { DataTable } from "./data-table";
import useGetAll from "@/hooks/useGetAll";
import Sidebar, { SidebarItem } from "@/components/SideBar";
import { BarChartIcon, HomeIcon, UserIcon } from "lucide-react";
import { Disease } from "@/types/Disease";
import SideBarList from "@/components/SideBarList";

const Dashboard = () => {
  const [data, setData] = useState<Disease[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const response = await useGetAll({ endpoint: "/diseases"});
        setData(response.data);
      } catch (error) {
        console.error("Error fetching disease data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-row">
      <div className="w-fit h-full">
        <SideBarList />
      </div>
      <div className="container mx-auto py-10 h-screen overflow-y-scroll">
        <DataTable columns={diseaseColumns} data={data} />
      </div>
    </main>
  );
}

export default Dashboard;
