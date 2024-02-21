"use client"

import SideBarList from '@/components/SideBarList';
import React, { useEffect, useState } from 'react'
import useGetALL from '@/hooks/useGetAll';
import { endemicColumn } from './columns';
import { Endemic } from '@/types/Endemic';
import { DataTable } from './data-table';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
        <main className="flex flex-row">
                <div className="w-fit h-full">
                    <SideBarList />
                </div>
                <div className="container mx-auto py-10 overflow-y-scroll no-scrollbar">
                    <DataTable columns={endemicColumn} data={data} />
                </div>
        </main>
    );
}

export default Endemicity