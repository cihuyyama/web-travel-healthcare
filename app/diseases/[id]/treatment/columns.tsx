/* eslint-disable react-hooks/rules-of-hooks */
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner";
import { BASE_URL } from "@/types/BaseURL";
import { Edit, Eraser } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Treatment } from "@/types/Disease";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { Textarea } from "@/components/ui/textarea";


export const treatmentColumn: ColumnDef<Treatment>[] = [
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
        accessorKey: "title",
        header: "Treatment Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { id } = useParams()
            const treatment = row.original
            const [title, setTitle] = useState<string>(treatment.title)
            const [description, setDescription] = useState<string>(treatment.description)
            const onClickDelete = async () => {
                try {
                    const cookieValue = document.cookie.split('; ')
                        .find(row => row.startsWith('token='))
                        ?.split('=')[1];
                    toast.promise(
                        fetch(`${BASE_URL}/treatments/${treatment.id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${cookieValue}`,
                            },
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
            const onSubmitEdit = async (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();

                const cookieValue = document.cookie.split('; ')
                    .find(row => row.startsWith('token='))
                    ?.split('=')[1];

                try {
                    toast.promise(
                        fetch(`${BASE_URL}/treatments/${treatment.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${cookieValue}`,
                            },
                            body: JSON.stringify({
                                "disease_id": parseInt(id.toString()),
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
                <div className="flex items-center space-x-2">
                    <Dialog>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <DialogTrigger asChild className="cursor-pointer">
                                        <Edit />
                                    </DialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit Treatment</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={onSubmitEdit}>
                                <DialogHeader>
                                    <DialogTitle>Edit Treatment</DialogTitle>
                                    <DialogDescription>
                                        Update Treatment to the Disease
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col gap-4 py-4">
                                    <Label>Title</Label>
                                    <Input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter the title of the treatment"
                                    />
                                    <Label>Description</Label>
                                    <Textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter the description of the treatment"
                                    />
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <AlertDialog>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <AlertDialogTrigger>
                                        <Eraser />
                                    </AlertDialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Delete Treatment</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <span>
                                        {`This action cannot be undone. This will permanently delete`}
                                    </span>
                                    <br />
                                    <span className="font-bold rounded-md bg-gray-800 text-white px-2 py-1">
                                        {treatment.title}
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