"use client";

import { Badge } from "@/components/ui/badge";
import { Disease, Symptom } from "@/types/Disease";
import { CellContext, ColumnDef } from "@tanstack/react-table";

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
    header: "Disease Name",
    accessorKey: "disease_name",
  },
  {
    header: "Disease Description",
    accessorKey: "disease_desc",
  },
  {
    header: "Symptoms",
    accessorKey: "DiseaseSymptom",
    cell: (row: CellContext<Disease, unknown>) => {
      const SymptomCell: React.FC<{ symptoms: Symptom[] }> = ({ symptoms }) => (
        <div>
          {symptoms.map((symptom) => (
            <div key={symptom.id}>
              <Badge>
                <span>{symptom.symptom_name}</span>
              </Badge>
            </div>
          ))}
        </div>
      );
      return <SymptomCell symptoms={row.row.original.DiseaseSymptom} />;
    },
  },
];
