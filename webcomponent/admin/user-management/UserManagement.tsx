"use client";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CardComponent,
  CardComponentProps,
  Heading,
  SearchBar,
} from "@/webcomponent/reusable";
import { useState } from "react";
import { UserTable } from "./UserTable";

const data: CardComponentProps[] = [
  {
    title: "Total Users",
    value: "16,250",
  },
  {
    title: "Active Users",
    value: "15,100",
  },
  {
    title: "Premium Users",
    value: "3800",
  },
  {
    title: "New This Month",
    value: "1,200",
  },
];

export const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | "All">("All");
  const options = ["All", "Active", "Disabled"];
  console.log(statusFilter)
  console.log(search)
  return (
    <div className="py-16 flex flex-col gap-6">
      <Heading
        title="User Management"
        subtitle="Manage all Zenzi Wellness users"
      />
      <CardComponent data={data} />
      <Card className="flex flex-col md:flex-row gap-3.5 px-2.5 py-2">
        <SearchBar
          className="flex-1"
          value={search}
          placeholder={"Search users by name or email..."}
          onChange={setSearch}
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="max-w-56 w-full bg-[#F5E6D3]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>

          <SelectContent
            className="
          "
          >
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>
      <UserTable search={search} statusFilter={statusFilter} />
    </div>
  );
};
