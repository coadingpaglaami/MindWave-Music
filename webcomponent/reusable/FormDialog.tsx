// "use client";
// import React, { useCallback, useEffect, useState } from "react";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Upload } from "lucide-react";
// import { useDropzone } from "react-dropzone";

// export type MeditationFormValues = {
//   title: string;
//   category: "stress relief" | "healing" | "growth" | "relax";
//   duration: number;
//   description?: string;
//   audioFile?: File;
//   affirmationText?: string;
// };

// interface MeditationDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   title: string;
//   subtitle?: string;
//   initialValues?: Partial<MeditationFormValues> & { audioUrl?: string };
//   onSubmit: (
//     values: MeditationFormValues,
//     status: "draft" | "published"
//   ) => void;
// }

// export const DialogForm: React.FC<MeditationDialogProps> = ({
//   open,
//   onOpenChange,
//   title,
//   subtitle,
//   initialValues,
//   onSubmit,
// }) => {
//   const [audioPreview, setAudioPreview] = useState<string | undefined>(
//     initialValues?.audioUrl
//   );

//   const formSchema = z
//     .object({
//       title: z.string().min(1, "Title is required"),
//       category: z.enum(["stress relief", "healing", "growth", "relax"]),
//       duration: z
//         .number()
//         .positive("Duration must be positive")
//         .int("Duration must be an integer"),
//       description: z.string().optional(),
//       audioFile: z.instanceof(File).optional(),
//       affirmationText: z.string().optional(),
//     })
//     .refine(
//       (data) => {
//         if (!initialValues?.audioUrl && !data.audioFile) {
//           return false;
//         }
//         return true;
//       },
//       { message: "Audio file is required", path: ["audioFile"] }
//     );

//   const form = useForm<MeditationFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: initialValues?.title || "",
//       category: initialValues?.category || "stress relief",
//       duration: initialValues?.duration || 15,
//       description: initialValues?.description || "",
//     },
//   });

//   useEffect(() => {
//     if (open) {
//       form.reset({
//         title: initialValues?.title || "",
//         category: initialValues?.category || "stress relief",
//         duration: initialValues?.duration || 15,
//         description: initialValues?.description || "",
//         audioFile: undefined, // 🔥 important
//       });
//       setAudioPreview(initialValues?.audioUrl);
//     }
//   }, [open, initialValues, form]);

//   const handleSubmit = (status: "draft" | "published") => {
//     form.handleSubmit((data) => {
//       onSubmit(data, status);
//       onOpenChange(false);
//     })();
//   };

//   const file = form.watch("audioFile");

//   useEffect(() => {
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       setAudioPreview(previewUrl);
//       return () => URL.revokeObjectURL(previewUrl);
//     }
//   }, [file]);

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={(v) => !form.formState.isSubmitting && onOpenChange(v)}
//     >
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//           {subtitle && (
//             <p className="text-sm text-muted-foreground">{subtitle}</p>
//           )}
//         </DialogHeader>

//         <Form {...form}>
//           <form className="space-y-4">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Title</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="e.g., Morning Meditation"
//                       style={{ backgroundColor: "#F5E6D3" }}
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="grid grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="category"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Category</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl className="w-full">
//                         <SelectTrigger style={{ backgroundColor: "#F5E6D3" }}>
//                           <SelectValue placeholder="Select Category" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="stress relief">
//                           Stress Relief
//                         </SelectItem>
//                         <SelectItem value="healing">Healing</SelectItem>
//                         <SelectItem value="growth">Growth</SelectItem>
//                         <SelectItem value="relax">Relax</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="duration"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Duration (minutes)</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         style={{ backgroundColor: "#F5E6D3" }}
//                         value={field.value}
//                         onChange={(e) => field.onChange(Number(e.target.value))}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Describe the content..."
//                       style={{ backgroundColor: "#F5E6D3" }}
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="audioFile"
//               render={({ field }) => {
//                 const AudioUploader = () => {
//                   const onDrop = useCallback(
//                     (acceptedFiles: File[]) => {
//                       if (acceptedFiles.length > 0) {
//                         const file = acceptedFiles[0];

//                         if (file.size > 50 * 1024 * 1024) {
//                           form.setError("audioFile", {
//                             type: "manual",
//                             message: "File size must be less than 50MB",
//                           });
//                           return;
//                         }

//                         field.onChange(file);
//                         form.clearErrors("audioFile");
//                       }
//                     },
//                     [field.onChange, form]
//                   );

//                   const { getRootProps, getInputProps, isDragActive } =
//                     useDropzone({
//                       onDrop,
//                       accept: {
//                         "audio/mp3": [".mp3"],
//                         "audio/wav": [".wav"],
//                         "audio/m4a": [".m4a"],
//                       },
//                       multiple: false,
//                     });

//                   const currentFile = field.value as File | undefined;

//                   return (
//                     <div
//                       {...getRootProps()}
//                       className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:border-primary/50 transition-colors bg-[#F5E6D3]/30"
//                     >
//                       <input {...getInputProps()} />
//                       <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
//                       <p className="mt-2 text-sm font-medium">
//                         {isDragActive
//                           ? "Drop the audio file here..."
//                           : "Click to upload or drag and drop"}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         MP3, WAV, or M4A (max 50MB)
//                       </p>

//                       {currentFile && (
//                         <p className="mt-4 text-sm font-semibold text-foreground">
//                           Selected: {currentFile.name} (
//                           {(currentFile.size / 1024 / 1024).toFixed(2)} MB)
//                         </p>
//                       )}
//                     </div>
//                   );
//                 };

//                 return (
//                   <FormItem>
//                     <FormLabel>Upload Audio File</FormLabel>
//                     <FormControl>
//                       <AudioUploader />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 );
//               }}
//             />

//             {audioPreview && (
//               <div className="mt-4">
//                 <audio controls src={audioPreview} className="w-full" />
//               </div>
//             )}

//             <div className="flex justify-end gap-3 mt-6">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => handleSubmit("draft")}
//               >
//                 Save as Draft
//               </Button>
//               <Button
//                 type="button"
//                 className="bg-[#D4915D]"
//                 onClick={() => handleSubmit("published")}
//               >
//                 Publish
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };


"use client";
import React, { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

export type MeditationFormValues = {
  title: string;
  category: "stress relief" | "healing" | "growth" | "relax";
  duration?: number;
  description?: string;
  audioFile?: File;
  affirmationText?: string;
};

interface MeditationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  initialValues?: Partial<MeditationFormValues> & { audioUrl?: string };
  onSubmit: (
    values: MeditationFormValues,
    status: "draft" | "published"
  ) => void;
  type?: "meditation" | "affirmation";
}

export const DialogForm: React.FC<MeditationDialogProps> = ({
  open,
  onOpenChange,
  title,
  subtitle,
  initialValues,
  onSubmit,
  type = "meditation",
}) => {
  const [audioPreview, setAudioPreview] = useState<string | undefined>(
    initialValues?.audioUrl
  );

  const isMeditation = type === "meditation";

  // Create the schema dynamically based on type
  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    category: z.enum(["stress relief", "healing", "growth", "relax"]),
    duration: isMeditation
      ? z.number().positive("Duration must be positive").int("Duration must be an integer")
      : z.number().optional(),
    description: z.string().optional(),
    audioFile: z.instanceof(File).optional(),
    affirmationText: !isMeditation
      ? z.string().min(1, "Affirmation text is required")
      : z.string().optional(),
  }).refine(
    (data) => {
      if (!initialValues?.audioUrl && !data.audioFile) {
        return false;
      }
      return true;
    },
    { message: "Audio file is required", path: ["audioFile"] }
  );

  const form = useForm<MeditationFormValues>({
    resolver: zodResolver(formSchema) as unknown as Resolver<MeditationFormValues>,
    defaultValues: {
      title: initialValues?.title || "",
      category: initialValues?.category || "stress relief",
      duration: isMeditation ? initialValues?.duration || 15 : undefined,
      description: isMeditation ? initialValues?.description || "" : undefined,
      affirmationText: !isMeditation ? initialValues?.affirmationText || "" : undefined,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: initialValues?.title || "",
        category: initialValues?.category || "stress relief",
        duration: isMeditation ? initialValues?.duration || 15 : undefined,
        description: isMeditation ? initialValues?.description || "" : undefined,
        affirmationText: !isMeditation ? initialValues?.affirmationText || "" : undefined,
        audioFile: undefined,
      });
      setAudioPreview(initialValues?.audioUrl);
    }
  }, [open, initialValues, form, isMeditation]);

  const handleSubmit = (status: "draft" | "published") => {
    form.handleSubmit((data) => {
      onSubmit(data, status);
      onOpenChange(false);
    })();
  };

  const file = form.watch("audioFile");

  useEffect(() => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAudioPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [file]);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => !form.formState.isSubmitting && onOpenChange(v)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Morning Meditation"
                      style={{ backgroundColor: "#F5E6D3" }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className={isMeditation ? "grid grid-cols-2 gap-4" : ""}>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger style={{ backgroundColor: "#F5E6D3" }}>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="stress relief">
                          Stress Relief
                        </SelectItem>
                        <SelectItem value="healing">Healing</SelectItem>
                        <SelectItem value="growth">Growth</SelectItem>
                        <SelectItem value="relax">Relax</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isMeditation && (
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          style={{ backgroundColor: "#F5E6D3" }}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(e.target.value ? Number(e.target.value) : undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {!isMeditation && (
              <FormField
                control={form.control}
                name="affirmationText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affirmation Text</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your affirmation text..."
                        style={{ backgroundColor: "#F5E6D3" }}
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {isMeditation && (
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the content..."
                        style={{ backgroundColor: "#F5E6D3" }}
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="audioFile"
              render={({ field }) => {
                const AudioUploader = () => {
                  const onDrop = useCallback(
                    (acceptedFiles: File[]) => {
                      if (acceptedFiles.length > 0) {
                        const file = acceptedFiles[0];

                        if (file.size > 50 * 1024 * 1024) {
                          form.setError("audioFile", {
                            type: "manual",
                            message: "File size must be less than 50MB",
                          });
                          return;
                        }

                        field.onChange(file);
                        form.clearErrors("audioFile");
                      }
                    },
                    [field]
                  );

                  const { getRootProps, getInputProps, isDragActive } =
                    useDropzone({
                      onDrop,
                      accept: {
                        "audio/mp3": [".mp3"],
                        "audio/wav": [".wav"],
                        "audio/m4a": [".m4a"],
                      },
                      multiple: false,
                    });

                  const currentFile = field.value as File | undefined;

                  return (
                    <div
                      {...getRootProps()}
                      className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:border-primary/50 transition-colors bg-[#F5E6D3]/30"
                    >
                      <input {...getInputProps()} />
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm font-medium">
                        {isDragActive
                          ? "Drop the audio file here..."
                          : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        MP3, WAV, or M4A (max 50MB)
                      </p>

                      {currentFile && (
                        <p className="mt-4 text-sm font-semibold text-foreground">
                          Selected: {currentFile.name} (
                          {(currentFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>
                  );
                };

                return (
                  <FormItem>
                    <FormLabel>Upload Audio File</FormLabel>
                    <FormControl>
                      <AudioUploader />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {audioPreview && (
              <div className="mt-4">
                <audio controls src={audioPreview} className="w-full" />
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSubmit("draft")}
              >
                Save as Draft
              </Button>
              <Button
                type="button"
                className="bg-[#D4915D]"
                onClick={() => handleSubmit("published")}
              >
                Publish
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};