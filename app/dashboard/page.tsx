"use client"

import React, { useEffect, useState } from "react";
import { diseaseColumns, exampleData } from "./columns";
import { DataTable } from "./data-table";
import useGetAll from "@/hooks/useGetAll";
import Sidebar, { SidebarItem } from "@/components/SideBar";
import { BarChartIcon, HomeIcon, UserIcon } from "lucide-react";
import { Disease } from "@/types/Disease";

const Dashboard = () => {
  const [data, setData] = useState<Disease[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const response = await useGetAll({ endpoint: "/diseases"});
        setData(response.data); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching disease data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-row">
      <div className="w-fit h-full">
        <Sidebar>
          <SidebarItem icon={<HomeIcon />} text="Dashboard" active />
          <SidebarItem icon={<BarChartIcon />} text="Statistics" />
          <SidebarItem icon={<UserIcon />} text="Users" />
        </Sidebar>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={diseaseColumns} data={data} />
      </div>
    </main>
  );
}

export default Dashboard;
