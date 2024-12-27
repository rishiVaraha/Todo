import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquarePen } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { updateTodo } from "@/app/dashboard/member/actions";
import { toast } from "@/hooks/use-toast";

export function EditDialog({
  id,
  title,
  completed,
}: {
  id: number;
  title: string;
  completed: boolean;
}) {
  const [updatedTodo, setUpdatedTodo] = useState(title);
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTodo(e.target.value);
  };

  const handleCompletedChange = () => {
    setIsCompleted((prev) => !prev);
  };

  const handleSaveChanges = async () => {
    try {
      await updateTodo(Number(id), updatedTodo, isCompleted);
      toast({ title: "Success", description: "Todo updated successfully!" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        toast({ title: "Error", description: error.message });
      } else {
        console.error("An unknown error occurred.");
        toast({ title: "Error", description: "An unknown error occurred." });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" aria-label="Edit profile">
          <SquarePen className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your Todo here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-baseline gap-2">
            <Label htmlFor="name" className="font-bold">
              Name
            </Label>
            :
            <Input id="name" value={updatedTodo} onChange={handleTitleChange} />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="completed" className="font-bold">
              Done
            </Label>
            :
            <Checkbox
              id="completed"
              checked={isCompleted}
              onCheckedChange={handleCompletedChange}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" onClick={handleSaveChanges}>
              Save changes
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
