/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import useDelete from "@/hooks/useDelete";
import { BASE_URL } from "@/types/BaseURL";
import { Disease, Prevention, Symptom, Treatment } from "@/types/Disease";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { Copy, Eraser, Pencil } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export const diseaseColumns: ColumnDef<Disease>[] = [
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
    header: "Name",
    accessorKey: "disease_name",
  },
  {
    header: "Description",
    accessorKey: "disease_desc",
  },
  {
    header: "Symptoms",
    accessorKey: "DiseaseSymptom",
    cell: (row: CellContext<Disease, unknown>) => {
      const SymptomCell: React.FC<{ symptoms: Symptom[] }> = ({ symptoms }) => (

        <ScrollArea className="h-[100px]">
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            {symptoms.map((symptom) => (
              <li key={symptom.id}>
                {symptom.symptom_name}
              </li>
            ))}
          </ul>
        </ScrollArea>

      );
      return <SymptomCell symptoms={row.row.original.DiseaseSymptom} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { id } = useParams()
        const disease = row.original
        const onClickDelete = async () => {
            try {
                const cookieValue = document.cookie.split('; ')
                    .find(row => row.startsWith('token='))
                    ?.split('=')[1];
                toast.promise(
                    fetch(`${BASE_URL}/diseases/append`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${cookieValue}`,
                        },
                        body: JSON.stringify({
                            "disease_id": disease.id,
                            "endemic_id": parseInt(id.toString()),
                        })
                    }),
                    {
                        loading: 'Saving...',
                        success: () => {
                            setTimeout(() => {
                                location.reload();
                            }, 200);
                            return 'Deleted successfully';
                        },
                        error: 'Error Saving'
                    }
                )
            } catch (error) {
            }
        }
        return (
            <div className="flex items-center space-x-2">
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Eraser />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                <span>
                                    {`This action cannot be undone. This will permanently delete`}
                                </span>
                                <br />
                                <span className="font-bold rounded-md bg-gray-800 text-white px-2 py-1">
                                    {disease.disease_name}
                                </span>
                                <br />
                                <span>
                                    {`and remove it from our servers.`}
                                </span>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={onClickDelete}>
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
        )
    }

},
];