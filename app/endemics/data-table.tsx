/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Plus, PlusSquare } from "lucide-react"
import { Label } from "@/components/ui/label"
import useCreate from "@/hooks/useCreate"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { BASE_URL } from "@/types/BaseURL"

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
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
      sorting,
    }
  })

  const [province, setProvince] = useState("");
  const [risk, setRisk] = useState("");
  const [score, setScore] = useState(70);

  const onSubmitCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!province || !risk || !score) {
      toast.error('Please fill all fields');
      return;
    }
    
    const cookieValue = document.cookie.split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    try {
      toast.promise(
        fetch(`${BASE_URL}/endemics`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieValue}`,
          },
          body: JSON.stringify({ 
            "province": province,
            "risk_level": risk,
            "risk_score": score,
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
                      Risk Level
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
                  <div className="flex flex-col items-start gap-4">
                    <Label htmlFor="score" className="text-right">
                      Score Level
                    </Label>
                    <Input
                      id="score"
                      className="col-span-3"
                      type="number"
                      value={score}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setScore(parseInt(event.target.value))
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
      <div>

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

        <div className="flex items-center justify-between px-2 mt-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
