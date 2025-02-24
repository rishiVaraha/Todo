"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { EditDialog } from "@/components/editDialog";
import { DeleteDialog } from "@/components/deleteAlret";

export type UserTodo = {
  completed: boolean | null;
  created_at: string | null;
  id: number;
  title: string;
  updated_at: string | null;
  user_id: string;
  user_name: string | null;
  user_role: string | null;
};

export const columns: ColumnDef<UserTodo>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user_role",
    header: () => <div className="text-left">Role</div>,
    cell: ({ row }) => {
      const UserRole = row.getValue("user_role") as string;
      return (
        <div>
          <p className="font-medium">{UserRole}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "user_name",
    header: () => <div className="text-left">Name</div>,
    cell: ({ row }) => {
      const UserName = row.getValue("user_name") as string;
      return (
        <div>
          <p className="font-medium">{UserName ? `${UserName}` : "NULL"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TODO
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return (
        <div className="font-medium text-left pl-4">
          <p>{title}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div className="text-left">Created at</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at") as string);

      return (
        <div className="text-left">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </div>
      );
    },
  },
  {
    accessorKey: "completed",
    header: () => <div className="text-left">Completed</div>,
    cell: ({ row }) => {
      const completed = row.getValue("completed") as boolean;

      return <div className="text-left">{completed ? "True" : "False"}</div>;
    },
  },

  {
    id: "actions",
    header: () => <div className="text-right mr-5">actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center  justify-end">
          <EditDialog
            id={row.original.id}
            title={row.original.title}
            completed={row.original.completed ?? false}
          />
          <DeleteDialog id={row.original.id} />
        </div>
      );
    },
  },
];
