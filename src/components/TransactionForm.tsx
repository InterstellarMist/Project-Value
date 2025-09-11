"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type Control, type UseFormWatch, useForm } from "react-hook-form";
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
import { cn } from "@/lib/utils";
import { AccountsPicker } from "./AccountsPicker";
import { DateTimePicker } from "./DateTimePicker";

export type FormTypes = z.infer<typeof FormSchema>;

export interface ControlType {
  control: Control<FormTypes>;
}

const FormSchema = z.object({
  description: z.string().min(1, "What's the transaction?"),
  attachment: z.file().optional(),
  amount: z.transform(Number).pipe(z.number("Enter a number")),
  date: z.date("Pick a date"),
  time: z.iso.time(),
  txnType: z.string().optional(),
  debit: z.number("Oops, choose one."),
  credit: z.number("Oops, choose one."),
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
      render={({ field: { ref, name, onBlur, onChange } }) => (
        <FormItem className="w-[85%]">
          <FormLabel className="px-1 text-lg font-semibold">
            Attachment
          </FormLabel>
          <FormControl>
            <Input
              type="file"
              className="h-10 pt-2 text-xs glass-shadow bg-white/50"
              ref={ref}
              name={name}
              onBlur={onBlur}
              onChange={(e) => {
                onChange(e.target.files?.[0]);
              }}
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
  const router = useRouter();

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
  const onSubmit = (data: FormTypes) => {
    console.log(JSON.stringify(data, null, 2));
    router.back();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          form.handleSubmit(onSubmit)(e);
        }}
        className="w-8/10 space-y-4"
      >
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
