/* eslint-disable react-hooks/rules-of-hooks */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetTrigger } from "@/components/ui/sheet";
import { Disease } from "@/types/Disease";
import { Endemic } from "@/types/Endemic";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy, MoreHorizontal, Pencil } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import useUpdate from "@/hooks/useUpdate";
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
import useDelete from "@/hooks/useDelete";
import { toast } from "sonner";
import Link from "next/link";




export const endemicColumn: ColumnDef<Endemic>[] = [
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
        accessorKey: "country_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Province Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        header: "Weight Level",
        accessorKey: "risk_level",
    },
    {
        header: "Risk Score",
        accessorKey: "risk_score",
        cell: (row: CellContext<Endemic, unknown>) => {
            const RiskCell: React.FC<{ risk: number }> = ({ risk }) => (
                <div className={`flex justify-center pr-3 ${risk > 70 ? 'text-red-400' : ''}`}>
                    <span>{risk}</span>
                </div>
            );
            return <RiskCell risk={row.row.original.risk_score} />;
        },
    },
    {
        header: "Diseases",
        accessorKey: "DiseaseEndemic",
        cell: (row: CellContext<Endemic, unknown>) => {
            const SymptomCell: React.FC<{ diseases: Disease[] }> = ({ diseases }) => (
                <div className="h-full flex flex-wrap gap-1">
                    {diseases.map((disease) => (
                        <div key={disease.id}>
                            <Badge>
                                {disease.disease_name}
                            </Badge>
                        </div>
                    ))}
                </div>
            );
            return <SymptomCell diseases={row.row.original.DiseaseEndemic} />;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const endemic = row.original

            const [province, setProvince] = useState(endemic.country_name);
            const [risk, setRisk] = useState(endemic.risk_level);
            const [score, setScore] = useState(endemic.risk_score);

            const onSubmitEdit = async (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();

                if (province === "" || risk === "" || score === 0) {
                    toast.error("Please fill all the fields")
                    return
                }

                await useUpdate({
                    endpoint: "/endemics",
                    param: endemic.id,
                    province: province,
                    risk: risk,
                    score: score
                })
            }

            const onClickDelete = async () => {
                await useDelete({
                    endpoint: "/endemics",
                    param: endemic.id
                })
            }

            const handleProvinceChange = (e: ChangeEvent<HTMLInputElement>) => {
                setProvince(e.target.value);
            };
            const handleRiskChange = (e: ChangeEvent<HTMLInputElement>) => {
                setRisk(e.target.value);
            };
            const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
                setScore(parseInt(e.target.value));
            };

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
                                        navigator.clipboard.writeText(endemic.country_name)
                                        toast.success(`${endemic.country_name} Copied to clipboard`)
                                    }}
                                >
                                    <Copy />
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <SheetTrigger asChild>
                                        <Button className="w-full flex justify-start px-0" variant="ghost">
                                            Edit Endemics
                                        </Button>
                                    </SheetTrigger>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={`/endemics/${endemic.id}/diseases`}>
                                        <Button className="w-full flex justify-start px-0" variant="ghost">
                                            Edit Disease over Endemics
                                        </Button>
                                    </Link>
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
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="province" className="text-right">
                                            Province Name
                                        </Label>
                                        <Input id="province" value={province} onChange={handleProvinceChange} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="risk" className="text-right">
                                            Risk Level
                                        </Label>
                                        <Input id="risk" value={risk} onChange={handleRiskChange} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="risk" className="text-right">
                                            Risk Score
                                        </Label>
                                        <Input type="number" id="risk" value={score} onChange={handleScoreChange} className="col-span-3" />
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