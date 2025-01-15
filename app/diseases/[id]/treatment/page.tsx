"use client"

import SideBarList from '@/components/SideBarList'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BASE_URL } from '@/types/BaseURL';
import { Disease } from '@/types/Disease';
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table';
import { treatmentColumn } from './columns';

const DiseaseTreatment = ({ params }: { params: { id: string } }) => {
    const [data, setData] = useState<Disease>({
        disease_name: "",
        disease_desc: "",
        DiseaseSymptom: [],
        created_at: "",
        updated_at: "",
        id: 0,
        Treatment: [],
        Prevention: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cookieValue = document.cookie.split('; ')
                    .find(row => row.startsWith('token='))
                    ?.split('=')[1];
                const response = await fetch(
                    `${BASE_URL}/diseases/${params.id}`,
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
                    {data.disease_name ? data.disease_name : ""} Disease Data / Treatment
                </h2>
                <div className="flex flex-col mx-auto gap-8">
                    <DataTable id={params.id} columns={treatmentColumn} data={data.Treatment} />
                </div>
            </ScrollArea>
        </main>
    )
}

export default DiseaseTreatment