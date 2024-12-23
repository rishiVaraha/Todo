import { DataTable } from "@/app/dashboard/member/components/data-table";
import { columns } from "@/app/dashboard/member/components/columns";
import { Separator } from "@/components/ui/separator";
import React from "react";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const MemberPage = () => {
  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
    {
      id: "ndsjdj3p",
      amount: 821,
      status: "failed",
      email: "rishi@hotmail.com",
    },
    {
      id: "smndmbd3",
      amount: 221,
      status: "failed",
      email: "harsh@hotmail.com",
    },
    {
      id: "jmadbjb3",
      amount: 721,
      status: "failed",
      email: "Gaurav@hotmail.com",
    },
    {
      id: "skndn3p",
      amount: 721,
      status: "failed",
      email: "sahil@hotmail.com",
    },
    {
      id: "amsnksn3",
      amount: 321,
      status: "failed",
      email: "priyanshu@hotmail.com",
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 lg:py-4">
      <h1 className="text-4xl font-bold">Members</h1>
      <Separator className="my-4" />
      <div className="">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default MemberPage;
