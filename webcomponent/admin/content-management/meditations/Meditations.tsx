"use client";
import {
  CardComponent,
  CardComponentProps,
  DialogForm,
  Heading,
} from "@/webcomponent/reusable";
import { generateMeditations, meditationsDataTable } from "./data";
import { MeditationTable } from "./MeditationTable";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Meditations = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const tableData = generateMeditations(meditationsDataTable, 120);
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
          onSubmit={() => {
            console.log("submitted");
          }}
        />
      )}
    </div>
  );
};
