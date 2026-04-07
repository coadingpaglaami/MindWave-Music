"use client";
import {
  CardComponent,
  CardComponentProps,
  DialogForm,
  Heading,
  MeditationFormValues,
} from "@/webcomponent/reusable";
import { generateMeditations, meditationsDataTable } from "./data";
import { MeditationTable } from "./MeditationTable";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCreateAudioMeditationMutation } from "@/api/content";
import { toast } from "sonner";

export const Meditations = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const tableData = generateMeditations(meditationsDataTable, 120);
  const { mutateAsync: createAudioMeditation, isPending } =
    useCreateAudioMeditationMutation();
  const medicattionsData: CardComponentProps[] = [
    {
      title: "Total Items",
      value: 4,
    },
    {
      title: "Published ",
      value: 3,
    },
    {
      title: "Total Plays",
      value: 2340,
    },
    {
      title: "Avg Plays/Item",
      value: 780,
    },
  ];
  const categoryMap = {
    "stress relief": 0,
    healing: 1,
    growth: 2,
    relax: 3,
  };

  const handleSubmit = async (
    values: MeditationFormValues,
    status: "draft" | "published",
  ) => {
    try {
      await createAudioMeditation({
        title: values.title,
        category: categoryMap[values.category],
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
        <Button onClick={() => setOpenDialog(true)}>
          <Plus /> Add Meditation
        </Button>
      </div>

      <CardComponent data={medicattionsData} />
      <MeditationTable data={tableData} />
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
