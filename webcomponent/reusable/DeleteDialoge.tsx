"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
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
import { toast } from "sonner";

interface DeleteDialogProps {
  title: string;
  description: string;
  itemName: string;
  onDelete: () => Promise<void> | void;
  isDeleting?: boolean;
  trigger?: React.ReactNode;
}

export const DeleteDialog = ({
  title,
  description,
  itemName,
  onDelete,
  isDeleting = false,
  trigger,
}: DeleteDialogProps) => {
  const [open, setOpen] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const isLoading = isDeleting || localLoading;

  const handleDelete = async () => {
    try {
      setLocalLoading(true);
      await onDelete();
      toast.success(`${itemName} deleted successfully`);
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `Failed to delete ${itemName}`);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">&rdquo;{itemName}&#34;</span>?
            This action cannot be undone.
          </p>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};