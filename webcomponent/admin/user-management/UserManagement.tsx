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
import { useGetUsersQuery, useGetUserSummaryQuery } from "@/api/auth";
import { UsersListData } from "@/typesorinterface/auth";



export const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | "All">("All");
  const options = ["All", "Active", "Disabled"];
  const { data: usersData, isLoading } = useGetUsersQuery({
    page: 1,
    search: search,
    isActive: statusFilter === "Active" ? true : statusFilter === "Disabled" ? false : undefined,
  });
  const { data: userSummaryData, isLoading: isUserSummaryLoading } = useGetUserSummaryQuery();
  console.log(usersData?.data);
  console.log(statusFilter);
  console.log(search);
  const data: CardComponentProps[] = [
  {
    title: "Total Users",
    value: userSummaryData?.data?.total_users ?? 0,
  },
  {
    title: "Active Users",
    value: userSummaryData?.data?.active_users ?? 0,
  },
  {
    title: "Premium Users",
    value: userSummaryData?.data?.premium_users ?? 0,
  },
  {
    title: "New This Month",
    value: userSummaryData?.data?.new_this_month ?? 0,
  },
];
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
    {usersData?.data===undefined ? <div>
      Loading.. 
      </div> : <UserTable data={usersData?.data as UsersListData} />}
    </div>
  );
};
