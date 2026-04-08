import {
  AudioPlayButton,
  DialogForm,
  MeditationFormValues as MusicFormValues,
  Pagination,
} from "@/webcomponent/reusable";
import { MeditationDataProps as MusicProps } from "../meditations";
import { useState } from "react";
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
import { useEditMusicMutation, useGetMusicQuery } from "@/api/content";
import { MeditationItem } from "@/typesorinterface/content";

export const MusicTable = () => {
  const [page, setPage] = useState(1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MeditationItem | null>(null);
  const { data: musicData,isLoading,refetch } = useGetMusicQuery({page: page});
  const { mutateAsync: editMusic,isPending } = useEditMusicMutation();
  const totalPages = Math.ceil(musicData?.data?.count || 0 / 10);
  console.log(musicData?.data?.count)
  console.log(totalPages)

    const handleEdit = (item: MeditationItem) => {
    setEditingItem(item);
    setEditDialogOpen(true);
  };

  const handleSubmit = async(
    values: MusicFormValues,
    status: "draft" | "published"
  ) => {
    // Handle your update logic here
    if (!editingItem) return;
    editMusic({
      id: editingItem.id,
      payload: {
        title: values.title,
        category: values.category.id,
        duration_minutes: values.duration,
        description: values.description,
        media_file: values.audioFile,
        status: status === "draft" ? "DRAFT" : "PUBLISHED",
      },
    });
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
                Duration
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Status
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium text-right">
                Plays
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {musicData?.data?.results.map((item, index) => (
              <TableRow key={index} className="hover:bg-muted/30">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <AudioPlayButton
                      id={item.media_file}
                      src={item.media_file}
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
                <TableCell className="text-muted-foreground">
                  {item.duration_minutes} min
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
                  {item.plays_count.toLocaleString()}
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
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
          initialValues={{
            title: editingItem.title,
            category: editingItem.category,
            duration: editingItem.duration_minutes, // Convert string to number
            audioUrl: editingItem.media_file,
            description: editingItem.subtitle, // Add if you have it in your data
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
