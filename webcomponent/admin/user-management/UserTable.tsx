import { Heading, Pagination } from "@/webcomponent/reusable";
import { generatedUserData as userData } from "./data";
import {
  Ban,
  Calendar,
  CheckCircle,
  Crown,
  Eye,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
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
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UsersListData } from "@/typesorinterface/auth";
import { format } from "date-fns";
import { useToggleUserStatusMutation } from "@/api/auth";
import { toast } from "sonner";

export const UserTable = ({ data }: { data: UsersListData }) => {
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const rowsPerPage = 12;
  const { mutateAsync: toggleUserStatusMutation,isPending } =
    useToggleUserStatusMutation();

  const totalPages = Math.ceil(data.count / rowsPerPage);

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const maxVal = 200;
  const getWidth = (val: number) => `${(val / maxVal) * 100}%`;

  return (
    <Card>
      <CardContent className="p-0 ">
        <Table className="overflow-x-auto">
          <TableHeader style={{ backgroundColor: "#E8DED04D" }}>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[#6D4C41] font-medium ">
                User
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Email
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Account Type
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Streak
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Sessions
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Join Date
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium ">
                Status
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium text-left">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.results.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/30">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: "#D4915D1A",
                        color: "#6D4C41",
                      }}
                    >
                      {getInitials(user.name)}
                    </div>
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[#6D4C41]">{user.email}</TableCell>
                <TableCell>
                  {user.account_type === "Premium" ? (
                    <Badge className="bg-[#D4915D] text-white border-[#D4915D] hover:bg-[#D4915D]/90">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  ) : (
                    <Badge variant="outline">Free</Badge>
                  )}
                </TableCell>
                <TableCell className="text-[#D4915D] font-medium">
                  {user.streak} days
                </TableCell>
                <TableCell className="text-[#6D4C41]">
                  {user.sessions}
                </TableCell>
                <TableCell className="text-[#6D4C41]">
                  {format(new Date(user.created_at), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.is_active === true ? "default" : "outline"}
                    className={
                      user.is_active === true
                        ? "bg-[#D4915D] text-white border-[#D4915D]"
                        : ""
                    }
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        // onClick={() => handleViewDetails(user)}
                        aria-label={`View details for ${user.name}`}
                        className="float-left"
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <Heading
                          title="User Details"
                          subtitle="View and manage user details and actions."
                        />
                      </DialogHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#D69664] flex items-center justify-center text-white text-xl font-medium">
                          {getInitials(user.name)}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold leading-tight">
                            {user.name}
                          </h3>
                          <p className="text-sm text-[#8C746A]">{user.email}</p>
                          <div className="flex gap-2 pt-1">
                            <span className="px-3 py-0.5 rounded-full bg-[#D69664] text-white text-xs flex items-center gap-1">
                              <span className="text-[10px]">
                                <Crown className="w-4 h-4" />
                              </span>{" "}
                              {user.account_type}
                            </span>
                            <span
                              className={`px-3 py-0.5 rounded-full text-white text-xs ${
                                user.is_active === true
                                  ? "bg-[#D69664]"
                                  : "bg-gray-400"
                              }`}
                            >
                              {user.is_active ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white p-4 rounded-xl border border-[#F0E6DD] space-y-4">
                          <div className="flex items-center gap-2 text-[#D69664] text-xs font-medium">
                            <TrendingUp size={14} /> Current Streak
                          </div>
                          <p className="text-base font-medium">
                            {user.streak} days
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#F0E6DD] space-y-4">
                          <div className="flex items-center gap-2 text-[#D69664] text-xs font-medium">
                            <CheckCircle size={14} /> Total Sessions
                          </div>
                          <p className="text-base font-medium">
                            {user.sessions}
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#F0E6DD] space-y-4">
                          <div className="flex items-center gap-2 text-[#D69664] text-xs font-medium">
                            <Calendar size={14} /> Member Since
                          </div>
                          <p className="text-base font-medium">
                            {format(new Date(user.created_at), "MMM dd, yyyy")}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold">
                          Subscription Status
                        </h4>
                        <div className="bg-white p-5 rounded-xl border border-[#F0E6DD] grid grid-cols-2 gap-y-4">
                          <div>
                            <p className="text-[10px] text-[#8C746A] uppercase tracking-wider mb-1">
                              Plan
                            </p>
                            <p className="text-sm font-medium">
                              {user.account_type}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-[#8C746A] uppercase tracking-wider mb-1">
                              Status
                            </p>
                            <p className="text-sm font-medium text-[#D69664]">
                              {user.is_active ? "Active" : "Inactive"}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] text-[#8C746A] uppercase tracking-wider mb-1">
                              Next Billing
                            </p>
                            <p className="text-sm font-medium">
                              {user.account_type || "N/A"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-[#8C746A] uppercase tracking-wider mb-1">
                              Amount
                            </p>
                            <p className="text-sm font-medium">
                              ₦{user.sessions.toLocaleString()}/year
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold">
                          Content Engagement
                        </h4>
                        {/* <div className="bg-white p-5 rounded-xl border border-[#F0E6DD] space-y-5">
                          {[
                            {
                              label: "Meditation",
                              value: user.contentengament.meditationCompleted,
                            },
                            {
                              label: "Sleep Sounds",
                              value: user.contentengament.sleepSounds,
                            },
                            {
                              label: "Focus Music",
                              value: user.contentengament.focusMusic,
                            },
                            {
                              label: "Breathing",
                              value: user.contentengament.breathing,
                            },
                          ].map((item) => (
                            <div key={item.label}>
                              <div className="flex justify-between text-xs mb-2">
                                <span className="text-[#8C746A]">
                                  {item.label}
                                </span>
                                <span className="font-medium">
                                  {item.value}
                                </span>
                              </div>
                              <div className="h-2 w-full bg-[#F0E6DD] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#D69664] rounded-full"
                                  style={{ width: getWidth(item.value) }}
                                />
                              </div>
                            </div>
                          ))}
                        </div> */}
                      </div>

                      <DialogFooter>
                        <button
                          className="w-fit flex items-center gap-2 px-4 py-2 bg-[#D11A3D] text-white text-sm font-medium rounded-lg hover:bg-[#b01633] transition-colors"
                          onClick={async () => {
                            await toggleUserStatusMutation(user.id);
                            toast.success(`User has been ${
                              user.is_active ? "disabled" : "enabled"
                            } successfully!`);
                            setOpenDialog(false);
                          }}
                          disabled={isPending}
                        >
                          <Ban size={16} />
                           {user.is_active ? "Disable" : "Enable"} {isPending && "(Updating...)"} User
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
  );
};
