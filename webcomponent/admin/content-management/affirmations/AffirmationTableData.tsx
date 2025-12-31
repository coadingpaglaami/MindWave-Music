import { useState } from "react";
import { MeditationDataProps as AffirmationTableProps } from "../meditations";
import {
  DialogForm,
  MeditationFormValues as AffirmationFormValues,
  Pagination,
  AudioPlayButton,
} from "@/webcomponent/reusable";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AffirmationTableDataProps {
  data: Omit<AffirmationTableProps, "duration">[];
}

export const AffirmationTableComponent = ({
  data,
}: AffirmationTableDataProps) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Omit<
    AffirmationTableProps,
    "duration"
  > | null>(null);
  const paginatedData = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleEdit = (item: Omit<AffirmationTableProps, "duration">) => {
    setEditingItem(item);
    setEditDialogOpen(true);
  };

  const handleSubmit = (
    values: AffirmationFormValues,
    status: "draft" | "published"
  ) => {
    // Handle your update logic here
    console.log("Updated values:", values, status);
    // Update your data source here
  };

  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[#6D4C41] font-medium w-[40%]">
                Title
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Category
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium">
                Status
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium text-right">
                Favorites
              </TableHead>
              <TableHead className="text-[#6D4C41] font-medium text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={index} className="hover:bg-muted/30">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <AudioPlayButton
                      id={item.audio}
                      src={item.audio}
                      size={30}
                      activeId={activeAudioId}
                      onPlayRequest={setActiveAudioId}
                    />
                    {item.title}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-muted">
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "Published" ? "default" : "outline"
                    }
                    className={
                      item.status === "Published"
                        ? "bg-[#D4915D] text-white border-[#D4915D]"
                        : ""
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {item.plays.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {editDialogOpen && editingItem && (
        <DialogForm
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          title="Edit Music"
          subtitle="Update your music details"
          type="affirmation"
          initialValues={{
            title: editingItem.title,
            category: editingItem.category as
              | "stress relief"
              | "healing"
              | "growth"
              | "relax",
            // Convert string to number
            audioUrl: editingItem.audio,
            description: "", // Add if you have it in your data
          }}
          onSubmit={handleSubmit}
        />
      )}
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={totalPages}
      />
    </Card>
  );
};
