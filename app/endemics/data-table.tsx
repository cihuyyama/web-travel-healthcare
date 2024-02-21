/* eslint-disable react-hooks/rules-of-hooks */
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import React, { FormEvent, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, PlusSquare } from "lucide-react"
import { Label } from "@/components/ui/label"
import useCreate from "@/hooks/useCreate"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {


  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

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

  const [province, setProvince] = useState("");
  const [risk, setRisk] = useState("");

  const onSubmitCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useCreate({
      endpoint: "/endemics",
    }, {
      country_name: province,
      risk_level: risk,
    })
    location.reload();
  }


  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Endemicity Data
      </h2>
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center py-4">
          <Input
            placeholder="Search Province Name"
            value={(table.getColumn("country_name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("country_name")?.setFilterValue(event.target.value)
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
                  <DialogTitle>Add New Endemic</DialogTitle>
                  <DialogDescription>
                    Add a new endemic to the database
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex flex-col items-start gap-4">
                    <Label htmlFor="province" className="text-right">
                      Province Name
                    </Label>
                    <Input
                      id="province"
                      className="col-span-3"
                      value={province}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setProvince(event.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col items-start gap-4">
                    <Label htmlFor="risk" className="text-right">
                      Weight Level
                    </Label>
                    <Input
                      id="risk"
                      className="col-span-3"
                      value={risk}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setRisk(event.target.value)
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
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
