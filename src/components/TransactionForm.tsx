"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { type Control, useForm, type UseFormWatch } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AccountsPicker } from "./AccountsPicker";
import { DateTimePicker } from "./DateTimePicker";
import { cn } from "@/lib/utils";

export type FormTypes = z.infer<typeof FormSchema>;

export interface ControlType {
  control: Control<FormTypes>;
}

const FormSchema = z.object({
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  attachment: z.file().optional(),
  amount: z.coerce.number(),
  date: z.date(),
  time: z.iso.time(),
  txnType: z.string().optional(),
  debit: z.number(),
  credit: z.number(),
});

const AmountInput = ({
  control,
  watch,
}: ControlType & { watch: UseFormWatch<FormTypes> }) => {
  const txnType = watch("txnType");
  return (
    <FormField
      control={control}
      name="amount"
      render={({ field }) => (
        <FormItem className="glass-shadow flex flex-col items-center rounded-2xl p-2 gap-2">
          <FormLabel className="font-semibold text-lg justify-center">
            Amount
          </FormLabel>
          <FormControl>
            <Input
              type="text"
              className={cn(
                "w-full h-full text-center text-4xl border-0 shadow-none text-blue-500 py-0 ",
                txnType === "income" &&
                  "text-green-500 placeholder:text-green-500",
                txnType === "expense" &&
                  "text-red-500 placeholder:text-red-500",
              )}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const AttachmentInput = ({ control }: ControlType) => {
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

const DescriptionInput = ({ control }: ControlType) => {
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
  const form = useForm<FormTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
      amount: 0,
      time: format(Date.now(), "HH:mm"),
      date: new Date(),
      txnType: "income",
    },
  });
  function onSubmit(data: FormTypes) {
    console.log(JSON.stringify(data, null, 2));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-8/10 space-y-4">
        <AccountsPicker control={form.control} reset={form.resetField} />
        <AmountInput control={form.control} watch={form.watch} />
        <DescriptionInput control={form.control} />
        <DateTimePicker control={form.control} />
        <AttachmentInput control={form.control} />
        <button type="submit" className="absolute top-8 right-6 cursor-pointer">
          <Image src="check.svg" alt="filter" width={32} height={32} />
        </button>
      </form>
    </Form>
  );
};
