import { createClient } from "@/utils/supabase/server";
import { TodoList } from "./components/todo-list";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

const TodoPage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: todos } = await supabase
    .from("todos")
    .select()
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  return (
    <section className="p-3 pt-6 max-w-6xl mx-auto flex flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Todo&apos;s
      </h1>
      <Separator className="w-full" />
      <TodoList todos={todos ?? []} />
    </section>
  );
};

export default TodoPage;
