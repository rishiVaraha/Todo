import { Todo } from "@/types/custom";
import { TodoForm } from "./todo-form";
import { TodoItem } from "./todo-items";

export async function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <>
      <TodoForm />
      <div className="w-full flex flex-col gap-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
}
