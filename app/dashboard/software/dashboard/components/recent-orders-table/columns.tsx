import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export const recentOrdersColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="w-10">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
          }
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(!!value)
          }
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-10">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) =>
            row.toggleSelected(!!value)
          }
        />
      </div>
    ),
  },

  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original._id.slice(-8)}
      </div>
    ),
  },

  {
    accessorKey: "name",
    header: "Client",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">
          {row.original.name}
        </span>

        <span className="text-xs text-muted-foreground">
          {row.original.email}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "softwareName",
    header: "Software",
  },

  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.plan}
      </Badge>
    ),
  },

  {
    accessorKey: "tenure",
    header: "Tenure",
    cell: ({ row }) => (
      <Badge>
        {row.original.tenure}
      </Badge>
    ),
  },

  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    accessorKey: "source",
    header: "Source",
  },

  {
    accessorKey: "contractEndDate",
    header: "Expiry Date",
    cell: ({ row }) =>
      row.original.contractEndDate
        ? format(
            new Date(
              row.original.contractEndDate
            ),
            "dd MMM yyyy"
          )
        : "-",
  },

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) =>
      row.original.createdAt
        ? format(
            new Date(
              row.original.createdAt
            ),
            "dd MMM yyyy"
          )
        : "-",
  },
];