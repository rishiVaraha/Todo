"use client";

import { TodoList } from "@/components/todo-list";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/userContext";
// import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function TodosPage() {
  // const supabase = await createClient();
  const { user, userRole, isLoading } = useAuth();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/login");
  // }

  // const { data: todos } = await supabase
  //   .from("todos")
  //   .select()
  //   .order("inserted_at", { ascending: false });
  console.log(user);

  return (
    <section className="p-3 pt-6 max-w-2xl w-full flex flex-col gap-4">
      <Separator className="w-full " />
      {/* <TodoList todos={todos ?? []} /> */}
      <h1>{userRole}</h1>
    </section>
  );
}
