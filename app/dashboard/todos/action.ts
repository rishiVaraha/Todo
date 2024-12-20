import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { Todo } from "@/types/custom";

export async function deleteTodo(id: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase.from("todos").delete().match({
    user_id: user.id,
    id: id,
  });

  if (error) {
    throw new Error("Error deleting task");
  }

  revalidatePath("/todos");
}

export async function updateTodo(todo: Todo) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase.from("todos").update(todo).match({
    user_id: user.id,
    id: todo.id,
  });

  if (error) {
    throw new Error("Error updating task");
  }

  revalidatePath("/todos");
}
