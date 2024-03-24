"use client"
import SideBarList from '@/components/SideBarList'
import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table'
import { symptomColumn } from './column'
import { Symptom } from '@/types/Disease'
import { BASE_URL } from '@/types/BaseURL'
import axios from 'axios'

function Symptom() {
    const [data, setData] = useState<Symptom[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cookieValue = document.cookie.split(';')
                    .find(row => row.startsWith('token='))
                    ?.split('=')[1];

                const response = await axios.get(`${BASE_URL}/symptoms`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookieValue}`
                    }
                })
                console.log(response.data.data)
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching logs data:", error);
            }
        };

        fetchData();
    }, []);

  return (
    <main className="flex flex-row h-screen">
            <div className="w-fit h-full">
                <SideBarList />
            </div>
            <ScrollArea className="w-full px-10 mx-auto py-10 h-screen">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
                    Symptom Data
                </h2>
                <DataTable columns={symptomColumn} data={data} />
            </ScrollArea>
        </main>
  )
}

export default Symptom