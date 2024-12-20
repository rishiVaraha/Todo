import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Todo } from "@/types/custom";

export function TodoItems({ userID }: { userID: any }) {
  const supabase = createClient();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", userID);

      if (error) {
        console.error("Error fetching todos:", error);
      } else {
        setTodos(data);
      }
    };

    fetchTodos();
  }, [supabase, userID]);

  return (
    <div className="grid gap-4">
      {todos?.map((todo) => (
        <Card key={todo.id}>
          <CardContent className="flex p-0 items-center justify-between">
            <div className="flex p-4 items-center justify-center gap-4">
              <Checkbox checked={todo.completed ?? false} />
              <span className="font-semibold">{todo.title}</span>
            </div>
            <Button size="sm" variant="destructive" className="mr-4">
              <Trash2 className="size-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
