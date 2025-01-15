"use client"
import SideBarList from '@/components/SideBarList'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BASE_URL } from '@/types/BaseURL';
import { Endemic } from '@/types/Endemic';
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table';
import { diseaseColumns } from './columns';

const EndemicDisease = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<Endemic>(
    {
      country_name: "",
      DiseaseEndemic: [],
      created_at: "",
      updated_at: "",
      id: parseInt(params.id),
      risk_level: "",
      risk_score: 0,
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookieValue = document.cookie.split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];
        const response = await fetch(
          `${BASE_URL}/endemics/${params.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${cookieValue}`,
            },
          }
        )
        const data = await response.json();
        setData(data.data);
      } catch (error) {
        console.error("Error fetching disease data:", error);
      }
    };

    fetchData();
  }, [params.id]);
  return (
    <main className="flex flex-row">
      <div className="w-fit h-full">
        <SideBarList />
      </div>
      <ScrollArea className="w-full px-10 mx-auto py-10 h-screen ">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {data?.country_name ? data.country_name : ""} Endemic Data / Diseases
        </h2>
        <div className="flex flex-col mx-auto gap-8">
          <DataTable id={params.id} columns={diseaseColumns} data={data.DiseaseEndemic} />
        </div>
      </ScrollArea>
    </main>
  )
}

export default EndemicDisease