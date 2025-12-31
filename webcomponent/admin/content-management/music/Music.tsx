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
import { MusicTable } from "./MusicTable";
import { musictableData } from "./data";

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
    title: "Total Plays",
    value: 2340,
  },
  {
    title: "Avg Plays/Item",
    value: 780,
  },
];

export const Music = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="py-16 flex flex-col gap-6">
      <div className="flex md:justify-between md:items-center flex-col md:flex-row gap-2.5">
        <Heading title="Music" subtitle="Manage your focus music library" />
        <Button onClick={() => setOpenDialog(true)}>
          <Plus /> Add Music
        </Button>
      </div>
      <CardComponent data={musicData} />
      <MusicTable data={musictableData} />
      {openDialog && (
        <DialogForm
          open={openDialog}
          onOpenChange={setOpenDialog}
          title="Add New Music"
          subtitle="Add new music to your library."
          onSubmit={() => {
            console.log("submitted");
          }}
        />
      )}
    </div>
  );
};
