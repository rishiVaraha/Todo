"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/types/custom";
import { Trash2 } from "lucide-react";
import { deleteTodo, updateTodo } from "../action";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

export function TodoItem({ todo }: { todo: Todo }) {
  return (
    <form>
      <TodoCard todo={todo} />
    </form>
  );
}

export function TodoCard({ todo }: { todo: Todo }) {
  const { pending } = useFormStatus();
  return (
    <Card className={cn("w-full", pending && "opacity-50")}>
      <CardContent className="flex items-start gap-4 p-3">
        <span className="flex items-center justify-center size-10">
          <Checkbox
            disabled={pending}
            checked={Boolean(todo.completed)}
            onCheckedChange={async (val) => {
              if (val === "indeterminate") return;
              await updateTodo(todo.id, { completed: val });
            }}
          />
        </span>
        <p
          className={cn(
            "flex-1 pt-2 min-w-0 break-words",
            todo?.completed && "line-through text-gray-500 italic"
          )}
        >
          {todo?.title}
        </p>
        <Button
          formAction={async () => {
            await deleteTodo(todo.id);
          }}
          disabled={pending}
          variant="destructive"
          size="icon"
        >
          <Trash2 className="h-5 w-5" />
          <span className="sr-only">Delete Todo</span>
        </Button>
      </CardContent>
    </Card>
  );
}
