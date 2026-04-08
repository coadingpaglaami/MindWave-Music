"use client";
import { Button } from "@/components/ui/button";
import {
  CardComponent,
  CardComponentProps,
  CategoryCreation,
  DialogForm,
  Heading,
  MeditationFormValues,
} from "@/webcomponent/reusable";
import { Plus } from "lucide-react";
import { useState } from "react";
import { MusicTable } from "./MusicTable";
import { musictableData } from "./data";
import { useGetMusicSummaryQuery, useMusicMutation } from "@/api/content";
import { toast } from "sonner";

export const Music = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { data: musicSummary, refetch, isLoading } = useGetMusicSummaryQuery();
  const { mutateAsync: createMusic, isPending } = useMusicMutation();
  const musicData: CardComponentProps[] = [
    {
      title: "Total Items",
      value: musicSummary?.data?.total_items || 0,
    },
    {
      title: "Published ",
      value: musicSummary?.data?.published_items || 0,
    },
    {
      title: "Total Plays",
      value: musicSummary?.data?.total_plays || 0,
    },
    {
      title: "Avg Plays/Item",
      value: musicSummary?.data?.avg_plays_per_item || 0,
    },
  ];

  const handleSubmit = async (
    values: MeditationFormValues,
    status: "draft" | "published",
  ) => {
    try {
      await createMusic({
        title: values.title,
        category: Number(values.category.id),
        duration_minutes: values.duration,
        subtitle: values.description,
        media_file: values.audioFile,
        status: status === "draft" ? "DRAFT" : "PUBLISHED",
      });
      refetch();
      toast.success("Music created successfully!");
    } catch (error) {
      console.error("Failed to create music:", error);
      toast.error("Failed to create music. Please try again.");
    }
  };

  return (
    <div className="py-16 flex flex-col gap-6">
      <div className="flex md:justify-between md:items-center flex-col md:flex-row gap-2.5">
        <Heading title="Music" subtitle="Manage your focus music library" />
        <div className="flex gap-2 flex-col md:flex-row">
          <Button onClick={() => setOpenDialog(true)}>
            <Plus /> Add Music
          </Button>
          <CategoryCreation />
        </div>
      </div>
      <CardComponent data={musicData} />
      <MusicTable />
      {openDialog && (
        <DialogForm
          open={openDialog}
          onOpenChange={setOpenDialog}
          title="Add New Music"
          subtitle="Add new music to your library."
          onSubmit={async (values, status) => {
            await handleSubmit(values, status);
          }}
        />
      )}
    </div>
  );
};
