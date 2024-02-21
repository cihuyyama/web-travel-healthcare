"use client"

import SideBarList from '@/components/SideBarList';
import React, { useEffect, useState } from 'react'
import useGetALL from '@/hooks/useGetAll';
import { endemicColumn } from './columns';
import { Endemic } from '@/types/Endemic';
import { DataTable } from './data-table';
import { ScrollArea } from '@/components/ui/scroll-area';

function Endemicity() {
    const [data, setData] = useState<Endemic[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const response = await useGetALL({ endpoint: "/endemics" });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching disease data:", error);
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
                    <DataTable columns={endemicColumn} data={data} />
                </ScrollArea>
        </main>
    );
}

export default Endemicity