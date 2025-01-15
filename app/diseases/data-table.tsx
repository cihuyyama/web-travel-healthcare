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
import { Textarea } from "@/components/ui/textarea"
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
  const [diseaseName, setDiseaseName] = React.useState<string>("")
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

    if (!diseaseName || !description) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const cookieValue = document.cookie.split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      toast.promise(
        fetch(`${BASE_URL}/diseases`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookieValue}`,
          },
          body: JSON.stringify({
            "disease_name": diseaseName,
            "disease_desc": description
          }),
        }),
        {
          loading: "Creating new Disease",
          success: ()=>{
            setTimeout(() => {
              location.reload();
            }, 500);
            return "Disease Created Successfully";
          },
          error: "Failed to create Disease",
        }
      )
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center py-4">
          <Input
            placeholder="Search Disease Name"
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
                    Add a new Disease to the database
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex flex-col items-start gap-4">
                    <Label htmlFor="disease" className="text-right">
                      Disease Name
                    </Label>
                    <Input
                      id="disease"
                      className="col-span-3"
                      value={diseaseName}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setDiseaseName(event.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col items-start gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      className="col-span-3"
                      value={description}
                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setDescription(event.target.value)
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
