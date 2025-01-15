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
import React, { FormEvent } from "react"
import { Symptom } from "@/types/Disease"
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
  const [title, setTitle] = React.useState<string>("")
  const [description, setDescription] = React.useState<string>("")

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

  const onSubmitCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cookieValue = document.cookie.split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (!title || !description) {
      toast.error('Please fill in all fields');
      return
    }

    try {
      toast.promise(
        fetch(`${BASE_URL}/preventions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieValue}`,
          },
          body: JSON.stringify({
            "disease_id": parseInt(id),
            "title": title,
            "description": description,
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
            placeholder="Search Prevention Name"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
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
                  <DialogTitle>Add New Prevention</DialogTitle>
                  <DialogDescription>
                    Add a new Prevention to the Disease
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <Label>Title</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the title of the prevention"
                  />
                  <Label>Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter the description of the prevention"
                  />
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
