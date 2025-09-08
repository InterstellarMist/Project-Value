import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateTimePicker } from "./DateTimePicker";

const FormSchema = z.object({
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  attachment: z.file().optional(),
  amount: z.coerce.number(),
  date: z.date(),
  time: z.iso.time(),
});

const AmountInput = ({ control }) => {
  return (
    <FormField
      control={control}
      name="amount"
      render={({ field }) => (
        <FormItem className="glass-shadow flex flex-col items-center rounded-2xl p-2">
          <FormLabel className="font-semibold text-lg justify-center">
            Amount
          </FormLabel>
          <FormControl>
            <Input
              type=""
              placeholder="+$200.00"
              className="w-full h-full text-center text-4xl p-2 border-0 shadow-none text-green-500 placeholder:text-green-500"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const AttachmentInput = ({ control }) => {
  return (
    <FormField
      control={control}
      name="attachment"
      render={({ field }) => (
        <FormItem className="w-[85%]">
          <FormLabel className="px-1 text-lg font-semibold">
            Attachment
          </FormLabel>
          <FormControl>
            <Input
              type="file"
              className="h-10 pt-2 text-xs glass-shadow bg-white/50"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const DescriptionInput = ({ control }) => {
  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="px-1 text-lg font-semibold">
            Description
          </FormLabel>
          <FormControl>
            <Input
              placeholder="Add description here"
              className="w-full h-10 p-2 placeholder:text-gray-500 glass-shadow bg-white/50"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TransactionForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-8/10 space-y-8">
        <AmountInput control={form.control} />
        <DateTimePicker control={form.control} />
        <DescriptionInput control={form.control} />
        <AttachmentInput control={form.control} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
