"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData) {
  const supabase = createClient();
  const text = formData.get("todo") as string | null;

  if (!text) throw new Error("Text is required");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id as string)
    .single();

  if (userError) throw new Error("Error fetching user data");

  const userRole = userData?.role;
  const userName = userData?.name;

  if (!user) throw new Error("User is not logged in");

  const { error } = await supabase.from("todos").insert({
    title: text,
    user_id: user.id,
    user_name: userName,
    user_role: userRole,
  });
  if (error) throw new Error("Error adding todo");

  revalidatePath("/dashboard/todos");
}

export async function deleteTodo(id: number) {
  const supabase = createClient();

  const { error } = await supabase.from("todos").delete().match({ id });
  if (error) throw new Error("Error deleting todo");

  revalidatePath("/dashboard/todos");
}

export async function updateTodo(id: number, data: { completed: boolean }) {
  const supabase = createClient();

  const { error } = await supabase.from("todos").update(data).match({ id });
  if (error) throw new Error("Error updating todo");

  revalidatePath("/dashboard/todos");
}
