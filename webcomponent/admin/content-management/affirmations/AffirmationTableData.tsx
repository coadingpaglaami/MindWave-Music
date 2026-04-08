import { useState } from "react";
import {
  DialogForm,
  MeditationFormValues as AffirmationFormValues,
  Pagination,
  AudioPlayButton,
} from "@/webcomponent/reusable";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  useDeleteAffirmationMutation,
  useEditAffirmationMutation,
  useGetAffirmationQuery,
} from "@/api/content";
import { MeditationItem } from "@/typesorinterface/content";
import { toast } from "sonner";
import { DeleteDialog } from "@/webcomponent/reusable";

export const AffirmationTableComponent = () => {
  const [page, setPage] = useState(1);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Omit<
    MeditationItem,
    "duration"
  > | null>(null);
  const {
    data: affirmationData,
    isLoading,
    refetch,
  } = useGetAffirmationQuery({
    page: page,
  });
  const { mutateAsync: editAffirmation, isPending } =
    useEditAffirmationMutation();
  const { mutateAsync: deleteAffirmation, isPending: isDeleting } =
    useDeleteAffirmationMutation();
  const totalPages = Math.ceil(affirmationData?.data?.count || 0 / 10);

  const handleEdit = (item: Omit<MeditationItem, "duration">) => {
    setEditingItem(item);
    setEditDialogOpen(true);
  };

  const handleSubmit = (
    values: AffirmationFormValues,
    status: "draft" | "published",
  ) => {
    try {
      if (!editingItem) return;
      editAffirmation({
        id: editingItem?.id,
        payload: {
          title: values.title,
          category: values.category.id,
          affirmation_text: values.affirmationText,
          subtitle: values.text,
          media_file: values.audioFile,
          status: status === "draft" ? "DRAFT" : "PUBLISHED",
        },
      });
      refetch();
      toast.success("Affirmation updated successfully!");
    } catch (error) {
      console.error("Failed to update affirmation:", error);
      toast.error("Failed to update affirmation. Please try again.");
    }
  };

  const handleDeleteAffirmation = async (
    affirmationId: number,
    affirmationText: string,
  ) => {
    // If you have a delete mutation
    await deleteAffirmation(affirmationId, {
      onSuccess: () => {
        toast.success(`Affirmation "${affirmationText}" deleted successfully!`);
        refetch();
      },
    });

    // Or if you're using edit to soft-delete
    // await editAffirmation({ id: affirmationId, isDeleted: true });
  };

  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[#6D4C41] font-medium w-[40%]">
                Title
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Category
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Status
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium text-right">
                Favorites
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {affirmationData?.data?.results?.map((item, index) => (
              <TableRow key={index} className="hover:bg-muted/30">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <AudioPlayButton
                      id={item.audio_file || ""}
                      src={item.audio_file || ""}
                      size={30}
                      activeId={activeAudioId}
                      onPlayRequest={setActiveAudioId}
                    />
                    {item.title}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-muted">
                    {item.category.name}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "Published" ? "default" : "outline"
                    }
                    className={
                      item.status === "Published"
                        ? "bg-[#D4915D] text-white border-[#D4915D]"
                        : ""
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {item.favourites_count?.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DeleteDialog
                      title="Delete Affirmation"
                      description="This affirmation will be permanently removed."
                      itemName={item?.title || "this affirmation"}
                      onDelete={() =>
                        handleDeleteAffirmation(item.id, item.title)
                      }
                      isDeleting={isDeleting}
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {editDialogOpen && editingItem && (
        <DialogForm
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          title="Edit Music"
          subtitle="Update your music details"
          type="affirmation"
          initialValues={{
            title: editingItem.title,
            category: editingItem.category,
            // Convert string to number
            audioUrl: editingItem.audio_file,
            affirmationText: editingItem.text,
            description: editingItem.subtitle,
            text: editingItem.author_or_source,
            // Add if you have it in your data
          }}
          onSubmit={handleSubmit}
        />
      )}
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={totalPages}
      />
    </Card>
  );
};
