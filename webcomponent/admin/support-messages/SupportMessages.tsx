"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  CardComponent,
  CardComponentProps,
  Heading,
  SearchBar,
} from "@/webcomponent/reusable";
import { useState } from "react";
import { MessageTableComponent } from "./MessageTable";

const messageHistory: CardComponentProps[] = [
  {
    title: "Total Messages",
    value: "7",
  },
  {
    title: "New Messages",
    value: "5",
  },
  {
    title: "Read Messages",
    value: "2",
  },
  {
    title: "Avg Response Time",
    value: "3 hrs",
  },
];

export const SupportMessages = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="py-16 flex flex-col gap-6">
      <Heading
        title="Support Messages"
        subtitle="Manage user inquiries and support requests"
      />
      <CardComponent data={messageHistory} />
      <Card className="p-0">
        <CardContent className="px-1.5 py-2">
          <SearchBar
            value={search}
            placeholder="Search support messages by user or subject..."
            onChange={setSearch}
          />
        </CardContent>
      </Card>
      <MessageTableComponent search={search} />
    </div>
  );
};
