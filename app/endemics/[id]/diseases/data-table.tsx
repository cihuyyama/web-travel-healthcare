"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import React, { FormEvent, useEffect } from "react"
import { Disease, Symptom } from "@/types/Disease"
import { BASE_URL } from "@/types/BaseURL"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"

interface DataTableProps<TData, TValue> {
  id: string
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  id,
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [diseases, setDiseases] = React.useState<Disease[]>([])
  const [selectedDisease, setSelectedDisease] = React.useState<number>(0)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookieValue = document.cookie.split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];
        const response = await fetch(
          `${BASE_URL}/diseases`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${cookieValue}`,
            },
          }
        )
        const data = await response.json();
        setDiseases(data.data);
      } catch (error) {
        console.error("Error fetching disease data:", error);
      }
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    }
  })

  const onSubmitCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cookieValue = document.cookie.split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    try {
      toast.promise(
        fetch(`${BASE_URL}/diseases/append`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieValue}`,
          },
          body: JSON.stringify({ 
            "disease_id": selectedDisease,
            "endemic_id": parseInt(id),
           })
        }),
        {
          loading: 'Saving...',
          success: () => {
            setTimeout(() => {
              location.reload();
            }, 200);
            return 'Saved successfully';
          },
          error: 'Error Saving'
        }
      )
      
    } catch (e) {
      console.error(e)
    }

  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center py-4">
          <Input
            placeholder="Search Treatment Name"
            value={(table.getColumn("disease_name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("disease_name")?.setFilterValue(event.target.value)
            }
            className="w-[400px]"
          />
        </div>
        <div>
        <Dialog>
            <DialogTrigger asChild>
              <Button variant={"default"}>
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={onSubmitCreate}>
                <DialogHeader>
                  <DialogTitle>Add New Disease</DialogTitle>
                  <DialogDescription>
                    Add a new Disease to the Endemicity
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <Select onValueChange={(event) => {
                    setSelectedDisease(parseInt(event))
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Disease" />
                    </SelectTrigger>
                    <SelectContent>
                      {diseases.map((disease) => (
                        <SelectItem
                          key={disease.id}
                          value={disease.id.toString()}
                        >
                          {disease.disease_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div>
                    <span>
                      Deskripsi :
                    </span>
                    <div className="border-2 rounded-md w-full h-full min-h-[150px] text-sm">
                      {diseases.find((disease) => disease.id === selectedDisease)?.disease_desc ? diseases.find((disease) => disease.id === selectedDisease)?.disease_desc : "No Description"}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div></div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="w-full h-full gap-2 flex flex-wrap justify-center">
                    {Array.from(Array(12).keys()).map((index) => (
                      <Skeleton key={index} className="w-[350px] h-[50px] p-2" />
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
