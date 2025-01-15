"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import { BASE_URL } from "@/types/BaseURL";
import { Eraser } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Symptom } from "@/types/Disease";
import { useParams } from "next/navigation";


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
    {
        id: "actions",
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { id } = useParams()
            const symptom = row.original
            const onClickDelete = async () => {
                try {
                    const cookieValue = document.cookie.split('; ')
                        .find(row => row.startsWith('token='))
                        ?.split('=')[1];
                    toast.promise(
                        fetch(`${BASE_URL}/diseases/append/symptom`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${cookieValue}`,
                            },
                            body: JSON.stringify({
                                "disease_id": parseInt(id.toString()),
                                "symptom_id": symptom.id,
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
                                        {symptom.symptom_name}
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

]