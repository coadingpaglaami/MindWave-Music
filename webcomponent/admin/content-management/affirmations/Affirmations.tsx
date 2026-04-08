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
import { AffirmationTableComponent } from "./AffirmationTableData";
import { useCreateAffirmationMutation, useGetAffirmationSummaryQuery } from "@/api/content";
import { toast } from "sonner";


export const Affirmations = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { data: affirmationSummary } = useGetAffirmationSummaryQuery();
  const {mutateAsync:createAffirmation, isPending}=useCreateAffirmationMutation();
 

  const musicData: CardComponentProps[] = [
  {
    title: "Total Items",
    value: affirmationSummary?.data?.total_items ?? 0,
  },
  {
    title: "Published ",
    value: affirmationSummary?.data?.published_items ?? 0,
  },
  {
    title: "Total Favorites",
    value: affirmationSummary?.data?.total_favorites ?? 0,
  },
  {
    title: "Most Favorite Affirm",
    value: affirmationSummary?.data?.most_favorite_affirmation ?? "Self-Love & Confidence",
  },
];

const handleSubmit = async (
  values: MeditationFormValues,
  status: "draft" | "published"
)=> {
  try {
    await createAffirmation({
      title: values.title,
      category: Number(values.category.id),
      affirmation_text:values.affirmationText,
      subtitle: values.text,
      media_file: values.audioFile,
      status: status === "draft" ? "DRAFT" : "PUBLISHED",
    });
    toast.success("Affirmation created successfully!");
  }catch (error) {
    console.error("Failed to create affirmation:", error);
    toast.error("Failed to create affirmation. Please try again.");
  }

}


  return (
    <div className="py-16 flex flex-col gap-6">
      <div className="flex md:justify-between md:items-center flex-col md:flex-row gap-2.5">
        <Heading
          title="Affirmations"
          subtitle="Manage your affirmations library"
        />
        <div className="flex gap-2 flex-col md:flex-row">
          <Button onClick={() => setOpenDialog(true)}>
            <Plus /> Add Affirmation
          </Button>
          <CategoryCreation />
        </div>
      </div>
      <CardComponent data={musicData} />
      <AffirmationTableComponent  />
      {openDialog && (
        <DialogForm
          open={openDialog}
          onOpenChange={setOpenDialog}
          title="Add New Affirmation"
          subtitle="Add new affirmation to your library."
          type="affirmation"
           onSubmit={async (values, status) => {
            await handleSubmit(values, status);
          }}
        />
      )}
    </div>
  );
};
