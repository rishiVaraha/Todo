"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteTodo(id: number) {
  const supabase = createClient();
  console.log("Deleting todo with id:", id);

  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) throw new Error(`Error deleting todo: ${error.message}`);

  revalidatePath("/dashboard/member");
}
