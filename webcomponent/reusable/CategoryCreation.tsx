"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useCreateCategoryMutation } from "@/api/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const CategoryCreation = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { mutate: createCategory, isPending } = useCreateCategoryMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    createCategory(name.trim(), {
      onSuccess: () => {
        toast.success(`Category "${name}" created successfully`);
        setName("");
        setOpen(false);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create category");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="default" className="gap-2">
          <Plus className="h-4 w-4" />
          New Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>
              Add a new category to organize your content.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category-name" className="text-right">
                Category Name
              </Label>
              <Input
                id="category-name"
                placeholder="e.g., Yoga, Meditation, Nutrition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isPending}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};