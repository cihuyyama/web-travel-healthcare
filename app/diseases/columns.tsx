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
import { Disease, Symptom } from "@/types/Disease";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { Copy, Pencil } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export const exampleData: Disease[] = [
  {
    id: 1,
    disease_name: "DBD new",
    disease_desc: "demam berdarah",
    DiseaseSymptom: [
      {
        id: 2,
        symptom_name: "Demam",
        symptom_char: "terus menerus",
      },
      {
        id: 3,
        symptom_name: "mual",
        symptom_char: "sakit perut",
      },
    ],
    Treatment: [
      {
        id: 2,
        disease_id: 1,
        title: "judul new",
        description: "deskripsinya",
        created_at: "2024-01-22T01:13:10.362+07:00",
        updated_at: "2024-01-22T01:13:10.362+07:00",
      },
      {
        id: 3,
        disease_id: 1,
        title: "judul new",
        description: "deskripsinya",
        created_at: "2024-01-22T01:13:30.557+07:00",
        updated_at: "2024-01-22T01:13:30.557+07:00",
      },
      {
        id: 4,
        disease_id: 1,
        title: "judul",
        description: "deskripsinya",
        created_at: "2024-01-22T01:30:48.375+07:00",
        updated_at: "2024-01-22T01:30:48.375+07:00",
      },
    ],
    Prevention: [
      {
        id: 2,
        disease_id: 1,
        title: "judul",
        description: "deskripsinya",
        created_at: "2024-01-22T01:30:36.031+07:00",
        updated_at: "2024-01-22T01:30:36.031+07:00",
      },
    ],
    created_at: "2024-01-07T14:20:53.326+07:00",
    updated_at: "2024-01-26T16:00:04.867+07:00",
  },
  {
    id: 2,
    disease_name: "Malaria",
    disease_desc: "malaria",
    DiseaseSymptom: [],
    Treatment: [],
    Prevention: [],
    created_at: "2024-01-18T00:53:21.474+07:00",
    updated_at: "2024-01-18T00:53:21.474+07:00",
  },
];

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
      const disease = row.original

      const [name, setName] = useState(disease.disease_name);
      const [desc, setDesc] = useState(disease.disease_desc);

      const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
      };
      const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.target.value);
      };

      const onSubmitEdit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cookieValue = document.cookie.split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];
        toast.promise(
          fetch(`${BASE_URL}/diseases/${disease.id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${cookieValue}`,
            },
            body: JSON.stringify({ "disease_name": name, "disease_desc": desc })
          }),
          {
            loading: 'Saving...',
            success: () => {
              return 'Updated successfully';
            },
            error: 'Error updating'
          }
        )
        location.reload();
      }

      const onClickDelete = () => {
        if(disease.DiseaseSymptom.length < 1){
          useDelete({
            endpoint: "/diseases",
            param: disease.id
          })
          location.reload();
        }  else {
          toast.info(`Disease has symptoms, cannot be deleted`)
        }
      }

      return (
        <Sheet>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <Pencil className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <span className="text-lg">Action</span>
                </DropdownMenuLabel>
                <DropdownMenuItem className="w-fit cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(disease.disease_desc)
                    toast.success(`Description Copied to clipboard`)
                  }}
                >
                  <Copy />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <SheetTrigger asChild>
                    <Button className="w-full flex justify-start px-0" variant="ghost">
                      Edit Disease
                    </Button>
                  </SheetTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button className="w-full flex justify-start px-0" variant="ghost">
                    Edit Disease over Disease
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>

                  <AlertDialogTrigger className="w-full">
                    <Button className="w-full flex justify-start px-0" variant="ghost">
                      Delete
                    </Button>
                  </AlertDialogTrigger>


                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <SheetContent>
              <form onSubmit={onSubmitEdit}>
                <SheetHeader>
                  <SheetTitle>Edit Endemicity</SheetTitle>
                  <SheetDescription>
                    Make changes to your endemic here. Click save when youre done.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col w-full gap-4 py-4">
                  <div className="flex flex-col items-start gap-4">
                    <Label htmlFor="name" className="text-right">
                      Disease Name
                    </Label>
                    <Input value={name} onChange={handleNameChange} id="name" className="col-span-3" />
                  </div>
                  <div className="flex flex-col items-start gap-4">
                    <Label htmlFor="risk" className="text-right">
                      Disease Description
                    </Label>
                    <Textarea value={desc} onChange={handleDescChange} id="risk" className="col-span-3 h-[200px]" />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </form>
            </SheetContent>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the endemic
                  and remove data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={onClickDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </Sheet>

      )
    },
  },
];
