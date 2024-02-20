import { Badge } from "@/components/ui/badge";
import { Disease } from "@/types/Disease";
import { Endemic } from "@/types/Endemic";
import { CellContext, ColumnDef } from "@tanstack/react-table";


export const endemicColumn: ColumnDef<Endemic>[] = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Provice Name",
      accessorKey: "country_name",
    },
    {
      header: "Weight Level",
      accessorKey: "risk_level",
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
  ];