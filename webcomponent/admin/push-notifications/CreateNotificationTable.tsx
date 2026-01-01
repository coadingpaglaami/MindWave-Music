"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MAX_MESSAGE_LENGTH = 200;

const formSchema = z.object({
  title: z.string().min(1, { message: "Notification title is required" }),
  message: z
    .string()
    .min(1, { message: "Message is required" })
    .max(MAX_MESSAGE_LENGTH, {
      message: `Message must not exceed ${MAX_MESSAGE_LENGTH} characters`,
    }),
  audience: z.string().min(1, { message: "Target audience is required" }),
  scheduleDate: z.date().optional(),
  scheduleTime: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;
export const CreateNotificationTable = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      message: "",
      audience: "",
      scheduleDate: undefined,
      scheduleTime: "",
    },
  });

  const messageLength = form.watch("message")?.length ?? 0;

  const onSubmit = (values: FormValues) => {
    console.log("Submitted:", values);
    // Handle submission (e.g., API call)
  };

  const onReset = () => {
    form.reset();
  };

  const isFormValid = form.formState.isValid;

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Create New Notification</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notification Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. New Feature Available"
                      className="bg-[#F5E6D3]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="Enter your notification message..."
                        className="bg-[#F5E6D3] min-h-30 resize-none pr-16"
                        {...field}
                      />
                      <div className="absolute bottom-2 right-2 text-sm text-muted-foreground">
                        {messageLength}/{MAX_MESSAGE_LENGTH} characters
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="audience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audience</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger className="bg-[#F5E6D3]">
                        <SelectValue placeholder="Select user segment" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="free">Free Users</SelectItem>

                      <SelectItem value="premium">Premium Users</SelectItem>
                      {/* Add more segments as needed */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="scheduleDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Schedule Date (Optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-[#F5E6D3]",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scheduleTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Schedule Time (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        placeholder="--:--"
                        className="bg-[#F5E6D3]"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-start gap-4">
              <Button
                type="submit"
                disabled={!isFormValid}
                className={cn(!isFormValid && "hidden")}
              >
                <Send className="mr-2 h-4 w-4" />
                Send Now
              </Button>
              <Button type="button" variant="outline" onClick={onReset}>
                Clear
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
