"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteTodo(id: number) {
  const supabase = createClient();
  console.log("Deleting todo with id:", id);

  // Get the currently authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Failed to fetch authenticated user:", authError);
    throw new Error("Unable to authenticate the user. Please log in again.");
  }

  // Fetch the user's role and ID
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id, role")
    .eq("id", user.id)
    .single();

  if (userError || !userData) {
    console.error("Failed to fetch user data:", userError);
    throw new Error("Unable to retrieve user information. Please try again.");
  }

  const { id: userId, role: userRole } = userData;

  // Fetch the todo to verify ownership
  const { data: todo, error: fetchError } = await supabase
    .from("todos")
    .select("user_id")
    .eq("id", id)
    .single();

  if (fetchError || !todo) {
    console.error("Failed to fetch todo:", fetchError);
    throw new Error("Todo not found or unable to verify ownership.");
  }

  // Authorization check
  if (userRole !== "admin" && todo.user_id !== userId) {
    throw new Error("You do not have permission to delete this todo.");
  }

  // Delete the todo
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete todo:", error);
    throw new Error("Error deleting the todo. Please try again.");
  }

  revalidatePath("/dashboard/member");
}

export async function updateTodo(
  id: number,
  title: string,
  completed: boolean
) {
  const supabase = createClient();
  console.log("Updating todo with id:", id);

  const { error } = await supabase
    .from("todos")
    .update({ title, completed })
    .eq("id", id);

  if (error) throw new Error(`Error updating todo: ${error.message}`);

  revalidatePath("/dashboard/member");
}
