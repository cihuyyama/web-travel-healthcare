"use client"

import React, { useEffect, useState } from "react";
import { diseaseColumns, exampleData } from "./columns";
import { DataTable } from "./data-table";
import useGetAll from "@/hooks/useGetAll";
import { Disease } from "@/types/Disease";
import SideBarList from "@/components/SideBarList";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <ScrollArea className="w-full px-10 mx-auto py-10 h-screen">
        <DataTable columns={diseaseColumns} data={data} />
      </ScrollArea>
    </main>
  );
}

export default Dashboard;
