'use client';
import { Pagination } from "@/webcomponent/reusable";
import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle, Eye } from "lucide-react";
import { generateNotificationsData, Notification } from "./data";

export const NotificationsHistory = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  const totalPages = Math.ceil(generateNotificationsData.length / rowsPerPage);

  const paginatedData = generateNotificationsData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getStatusBadge = (status: Notification["status"]) => {
    switch (status) {
      case "Sent":
        return (
          <Badge className="bg-[#D4915D] text-white border-[#D4915D] hover:bg-[#D4915D]/90">
            <CheckCircle className="h-3 w-3 mr-1" />
            Sent
          </Badge>
        );
      case "Scheduled":
        return (
          <Badge className="bg-[#F5E6D3] text-[#6D4C41] border-[#F5E6D3] hover:bg-[#F5E6D3]/90">
            <Clock className="h-3 w-3 mr-1" />
            Scheduled
          </Badge>
        );
      case "Failed":
        return (
          <Badge className="bg-[#D4183D] text-white border-[#D4183D] hover:bg-[#D4183D]/90">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
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
              <TableHead className="text-[#6D4C41] font-medium">
                Title
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Message
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Segment
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Date & Time
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Status
              </TableHead>
   
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((notification) => (
              <TableRow key={notification.id} className="hover:bg-muted/30">
                <TableCell className="font-medium">
                  {notification.head}
                </TableCell>
                <TableCell className="text-[#6D4C41] max-w-md">
                  {notification.message}
                </TableCell>
                <TableCell>
                  <Badge className="bg-[#F5E6D3] text-[#6D4C41] border-[#F5E6D3] hover:bg-[#F5E6D3]/90">
                    {notification.segment}
                  </Badge>
                </TableCell>
                <TableCell className="text-[#6D4C41]">
                  <div className="flex flex-col">
                    <span className="font-medium">{notification.date}</span>
                    <span className="text-xs text-[#6D4C41]/70">
                      {notification.time}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(notification.status)}</TableCell>
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
