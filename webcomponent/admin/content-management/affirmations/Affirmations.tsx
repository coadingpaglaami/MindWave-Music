"use client";
import { Button } from "@/components/ui/button";
import {
  CardComponent,
  CardComponentProps,
  DialogForm,
  Heading,
} from "@/webcomponent/reusable";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AffirmationTableComponent } from "./AffirmationTableData";
import { moreTableData } from "./data";

const musicData: CardComponentProps[] = [
  {
    title: "Total Items",
    value: 4,
  },
  {
    title: "Published ",
    value: 3,
  },
  {
    title: "Total Favorites",
    value: 2340,
  },
  {
    title: "Most Favorite Affirm",
    value: "Self-Love & Confidence",
  },
];

export const Affirmations = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="py-16 flex flex-col gap-6">
      <div className="flex md:justify-between md:items-center flex-col md:flex-row gap-2.5">
        <Heading
          title="Affirmations"
          subtitle="Manage your affirmations library"
        />
        <Button onClick={() => setOpenDialog(true)}>
          <Plus /> Add Affirmation
        </Button>
      </div>
      <CardComponent data={musicData} />
      <AffirmationTableComponent data={moreTableData} />
      {openDialog && (
        <DialogForm
          open={openDialog}
          onOpenChange={setOpenDialog}
          title="Add New Affirmation"
          subtitle="Add new affirmation to your library."
          type="affirmation"
          onSubmit={() => {
            console.log("submitted");
          }}
        />
      )}
    </div>
  );
};
