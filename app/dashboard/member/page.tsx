import { DataTable } from "@/app/dashboard/member/components/data-table";
import { columns } from "@/app/dashboard/member/components/columns";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { createClient } from "@/utils/supabase/server";

const MemberPage = async () => {
  const supabase = createClient();
  const { data } = await supabase.from("todos").select();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 lg:py-4">
      <h1 className="text-4xl font-bold">Members</h1>
      <Separator className="my-4" />
      <div className="">
        <DataTable columns={columns} data={data || []} />
      </div>
    </div>
  );
};

export default MemberPage;
