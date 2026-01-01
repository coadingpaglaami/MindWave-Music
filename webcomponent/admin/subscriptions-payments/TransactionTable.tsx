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
import { CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import { generatedTransactions, Transaction } from "./data";

interface TransactionTableProps {
  search: string;
}
export const TransactionTable = ({ search }: TransactionTableProps) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    Promise.resolve().then(() => setPage(1));
  }, [search]);

  const filteredData = generatedTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      transaction.name.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "Successful":
        return (
          <Badge className="bg-[#D4915D] text-white border-[#D4915D] hover:bg-[#D4915D]/90">
            <CheckCircle className="h-3 w-3 mr-1" />
            Successful
          </Badge>
        );
      case "Failed":
        return (
          <Badge className="bg-[#D4183D] text-white border-[#D4183D] hover:bg-[#D4183D]/90">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-[#F5E6D3] text-[#6D4C41] border-[#F5E6D3] hover:bg-[#F5E6D3]/90">
            <Clock className="h-3 w-3 mr-1" />
            Pending
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
                Transaction ID
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">User</TableHead>
              <TableHead className="text-[#6D4C41] font-medium">Plan</TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Amount
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">Date</TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-muted/30">
                <TableCell className="font-medium">
                  {transaction.transactionId}
                </TableCell>
                <TableCell>{transaction.name}</TableCell>
                <TableCell>
                  <Badge className="bg-[#F5E6D3] text-[#6D4C41] border-[#F5E6D3] hover:bg-[#F5E6D3]/90">
                    {transaction.plan}
                  </Badge>
                </TableCell>
                <TableCell className="text-[#6D4C41] font-medium">
                  ₦{transaction.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-[#6D4C41]">
                  {transaction.date}
                </TableCell>
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
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
