"use client";
import {
  CardComponent,
  CardComponentProps,
  CategoryCreation,
  DialogForm,
  Heading,
  MeditationFormValues,
} from "@/webcomponent/reusable";
import { generateMeditations, meditationsDataTable } from "./data";
import { MeditationTable } from "./MeditationTable";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  useCreateAudioMeditationMutation,
  useGetMeditationSummaryQuery,
} from "@/api/content";
import { toast } from "sonner";
import { getMeditationSummary } from "@/api/content/api";

export const Meditations = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { mutateAsync: createAudioMeditation, isPending } =
    useCreateAudioMeditationMutation();
  const { data: meditationSummary, isLoading } = useGetMeditationSummaryQuery();

  const medicattionsData: CardComponentProps[] = [
    {
      title: "Total Items",
      value: meditationSummary?.data?.total_items || 0,
    },
    {
      title: "Published ",
      value: meditationSummary?.data?.published_items || 0,
    },
    {
      title: "Total Plays",
      value: meditationSummary?.data?.total_plays || 0,
    },
    {
      title: "Avg Plays/Item",
      value: meditationSummary?.data?.avg_plays_per_item || 0,
    },
  ];

  const handleSubmit = async (
    values: MeditationFormValues,
    status: "draft" | "published",
  ) => {
    try {
      await createAudioMeditation({
        title: values.title,
        category: Number(values.category.id),
        duration_minutes: values.duration,
        description: values.description,
        media_file: values.audioFile,
        status: status === "draft" ? "DRAFT" : "PUBLISHED",
      });
      toast.success("Meditation created successfully!");
    } catch (e) {
      console.error("Error creating meditation:", e);
      toast.error("Failed to create meditation.");
    }
  };

  generateMeditations(meditationsDataTable, 120);

  return (
    <div className="flex flex-col py-16 gap-6">
      <div className="flex md:justify-between flex-col md:flex-row gap-2.5 md:items-center">
        <Heading
          title="Meditations"
          subtitle="Manage your meditations library"
        />
        <div className="flex gap-2 flex-col md:flex-row">
          <Button onClick={() => setOpenDialog(true)}>
            <Plus /> Add Meditation
          </Button>
          <CategoryCreation />
        </div>
      </div>

      <CardComponent data={medicattionsData} />
      <MeditationTable />
      {openDialog && (
        <DialogForm
          open={openDialog}
          onOpenChange={setOpenDialog}
          title="Add New Meditation"
          subtitle="Add a new meditations to your library."
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
