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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MailOpen, Mail, Send, CheckCircle, Trash2 } from "lucide-react";
import { generatedMessages, MessageTable } from "./data";

interface MessageTableProps {
  search: string;
}

export const MessageTableComponent = ({ search }: MessageTableProps) => {
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageTable | null>(
    null
  );
  const [replyMessage, setReplyMessage] = useState("");
  const rowsPerPage = 7;

  useEffect(() => {
    Promise.resolve().then(() => setPage(1));
  }, [search]);

  const filteredData = generatedMessages.filter((msg) => {
    const matchesSearch =
      msg.userName.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.subject.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleViewMessage = (msg: MessageTable) => {
    setSelectedMessage(msg);
    setOpenDialog(true);
    setReplyMessage("");
  };

  const handleSendReply = () => {
    console.log("Sending reply:", replyMessage);
    // Handle send reply logic
    setOpenDialog(false);
  };

  const handleMarkAsRead = () => {
    console.log("Marking as read");
    // Handle mark as read logic
  };

  const handleDelete = () => {
    console.log("Deleting message");
    // Handle delete logic
    setOpenDialog(false);
  };

  const getStatusBadge = (status: MessageTable["status"]) => {
    switch (status) {
      case "New":
        return (
          <Badge className="bg-[#D4915D] text-white border-[#D4915D] hover:bg-[#D4915D]/90">
            New
          </Badge>
        );
      case "Viewed":
        return (
          <Badge className="bg-[#F5E6D3] text-[#6D4C41] border-[#F5E6D3] hover:bg-[#F5E6D3]/90">
            Viewed
          </Badge>
        );
    }
  };

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <Table className="overflow-x-auto">
            <TableHeader style={{ backgroundColor: "#E8DED04D" }}>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-[#6D4C41] font-medium">
                  Name
                </TableHead>
                <TableHead className="text-[#6D4C41] font-medium">
                  Email
                </TableHead>
                <TableHead className="text-[#6D4C41] font-medium">
                  Subject
                </TableHead>
                <TableHead className="text-[#6D4C41] font-medium">
                  Date
                </TableHead>
                <TableHead className="text-[#6D4C41] font-medium">
                  Status
                </TableHead>
                <TableHead className="text-[#6D4C41] font-medium text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.map((msg) => (
                <TableRow
                  key={msg.id}
                  className="hover:bg-muted/30"
                  style={{
                    backgroundColor:
                      msg.status === "New" ? "#D4915D0D" : "transparent",
                  }}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {msg.status === "New" ? (
                        <Mail className="h-4 w-4 text-[#D4915D]" />
                      ) : (
                        <MailOpen className="h-4 w-4 text-[#6D4C41]" />
                      )}
                      <span>{msg.userName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#6D4C41]">{msg.email}</TableCell>
                  <TableCell>{msg.subject}</TableCell>
                  <TableCell className="text-[#6D4C41]">{msg.date}</TableCell>
                  <TableCell>{getStatusBadge(msg.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewMessage(msg)}
                    >
                      View
                    </Button>
                  </TableCell>
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

      {selectedMessage && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent
            className="max-w-2xl"
            style={{ backgroundColor: "#FAF8F5" }}
          >
            <DialogHeader>
              <DialogTitle>Message Details</DialogTitle>
              <DialogDescription>
                View and respond to user messages
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Subject and From */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">
                    {selectedMessage.subject}
                  </h3>
                  <p className="text-sm text-[#6D4C41]">
                    From: {selectedMessage.userName} ({selectedMessage.email})
                  </p>
                  <span className="text-sm text-[#6D4C41]">
                    Received On {selectedMessage.date}
                  </span>
                </div>
              </div>

              {/* Message Box */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  Message
                </Label>
                <div
                  className="p-4 rounded-lg border shadow-sm"
                  style={{ backgroundColor: "#E8DED033" }}
                >
                  <p className="text-sm text-gray-700">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Reply Section */}
              <div className="space-y-2">
                <Label htmlFor="reply" className="text-sm font-medium">
                  Reply
                </Label>
                <Textarea
                  id="reply"
                  placeholder="Write Reply Message..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="min-h-25 border shadow-sm"
                  style={{ backgroundColor: "white" }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleSendReply}
                  className="flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Reply
                </Button>
                <Button
                  variant="outline"
                  onClick={handleMarkAsRead}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Mark As Read
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="flex items-center gap-2 text-[#D4183D] border-[#D4183D] hover:bg-[#D4183D] hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
