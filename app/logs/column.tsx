import { Log } from "@/types/Logs"
import { ColumnDef } from "@tanstack/react-table"



export const logColumns: ColumnDef<Log>[] = [
    {
        header: "No.",
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <span>{row.index + 1}</span>
                </div>
            );
        },
    },
    {
      accessorKey: "province",
      header: "Province",
    },
    {
      accessorKey: "disease_name",
      header: "Disease Name",
    },
    {
      accessorKey: "created_date",
      header: "Date",
    },
    {
      accessorKey: "created_time",
      header: "Time",
    },
    {
      accessorKey: "updated_type",
      header: "Type of Update",
    },
  ]