import { Symptom } from "@/types/Disease";
import { ColumnDef } from "@tanstack/react-table"



export const symptomColumn: ColumnDef<Symptom>[] = [
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
      accessorKey: "symptom_name",
      header: "Symptom Name",
    },
    {
      accessorKey: "symptom_char",
      header: "Description",
    },
  ]