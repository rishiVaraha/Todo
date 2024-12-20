"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/userContext";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { TodoItems } from "./components/todo-items";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
});

type FormData = z.infer<typeof schema>;

const TodoPage = () => {
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleTodo: SubmitHandler<FormData> = async (data) => {
    setError(null);

    const { error } = await supabase.from("todos").insert([
      {
        title: data.title,
        completed: false,
        user_id: user?.id,
        user_name: user?.user_metadata?.name,
      },
    ]);

    if (error) {
      setError(error.message);
      toast({ title: error.message, variant: "destructive" });
    } else {
      toast({ title: "Todo added successfully" });
      reset();
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-9">
      <h1 className="font-bold text-6xl">Todo&apos;s</h1>
      <Separator className="my-5" />
      <div>
        <Card>
          <CardContent className="p-3">
            <form onSubmit={handleSubmit(handleTodo)} className="flex gap-4">
              <Input placeholder="Enter your todo" {...register("title")} />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
              <Button type="submit">Add</Button>
            </form>
            {error && <p className="text-red-500">Failed to add todo</p>}
          </CardContent>
        </Card>
        <Separator className="my-5" />

        <TodoItems userID={user?.id} />
      </div>
    </div>
  );
};

export default TodoPage;
