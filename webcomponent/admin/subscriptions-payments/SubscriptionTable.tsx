"use client";
import { Pagination } from "@/webcomponent/reusable";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { CheckCircle, XCircle, Ban, Eye } from "lucide-react";
import { generatedSubscriptions, Subscription } from "./data";

interface SubscriptionTableProps {
  search: string;
  statusFilter: string | "All Subscriptions";
}

export const SubscriptionTable = ({
  search,
  statusFilter,
}: SubscriptionTableProps) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  console.log(generatedSubscriptions)

  useEffect(() => {
    Promise.resolve().then(() => setPage(1));
  }, [search, statusFilter]);

  const filteredData = generatedSubscriptions.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(search.toLowerCase()) ||
      sub.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All Subscriptions" || sub.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getStatusBadge = (status: Subscription["status"]) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-[#D4915D] text-white border-[#D4915D] hover:bg-[#D4915D]/90">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case "Expired":
        return (
          <Badge variant="outline">
            <XCircle className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        );
      case "Cancelled":
        return (
          <Badge className="bg-[#D4183D] text-white border-[#D4183D] hover:bg-[#D4183D]/90">
            <Ban className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table className="overflow-x-auto">
          <TableHeader style={{ backgroundColor: "#E8DED04D" }}>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[#6D4C41] font-medium">Name</TableHead>
              <TableHead className="text-[#6D4C41] font-medium">Plan</TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Start Date
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Renewal Date
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Amount/Year
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((sub) => (
              <TableRow key={sub.id} className="hover:bg-muted/30">
                <TableCell className="font-medium">{sub.name}</TableCell>
                <TableCell>
                  <Badge className="bg-[#F5E6D3] text-[#6D4C41] border-[#F5E6D3] hover:bg-[#F5E6D3]/90">
                    {sub.plan}
                  </Badge>
                </TableCell>
                <TableCell className="text-[#6D4C41]">
                  {sub.startDate}
                </TableCell>
                <TableCell className="text-[#6D4C41]">
                  {sub.renewalDate}
                </TableCell>
                <TableCell className="text-[#6D4C41] font-medium">
                  ₦{sub.amountPerYear.toLocaleString()}
                </TableCell>
                <TableCell>{getStatusBadge(sub.status)}</TableCell>
     
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={totalPages}
      />
    </Card>
  );
};
