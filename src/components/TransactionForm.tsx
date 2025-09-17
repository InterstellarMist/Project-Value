"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, startOfToday } from "date-fns";
import { Archive } from "lucide-react";
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
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
} from "@/data/SQLData";
import { cn, dateTimeMerge, dateTimeSplit } from "@/lib/utils";
import { useTxnStore } from "@/store/useTxnStore";
import type { AddPosting, AddTransaction } from "@/types/transaction";
import { AccountsPicker } from "./AccountsPicker";
import { DateTimePicker } from "./DateTimePicker";
import { Button } from "./ui/button";

export type FormTypes = z.infer<typeof FormSchema>;

type FormDefaults = Omit<FormTypes, "debit" | "credit"> & {
  debit: number | undefined;
  credit: number | undefined;
};

export interface ControlType {
  control: Control<FormTypes>;
}

const FormSchema = z.object({
  description: z.string().min(1, "What's the transaction?"),
  tags: z.string().optional().nullable(),
  attachment: z.file().optional().nullable(),
  amount: z.transform(Number).pipe(z.number("Enter a number")),
  date: z.date("Pick a date"),
  time: z.iso.time(),
  txnType: z.literal(["income", "expense", "transfer"]),
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

// get selected transaction from store
const editTxValues = () => {
  const txnSelected = useTxnStore((s) => s.txnSelected);
  let credit: number = 0,
    debit: number = 0;

  const { txnId, date, ...values } = txnSelected.transaction;
  const amount = Math.abs(txnSelected.postings[0].amount);
  const postingIds = txnSelected.postings.map((post) => post.postingId);

  if (txnSelected.postings?.[0].amount < 0) {
    [credit, debit] = txnSelected.postings.map((post) => post.acctId);
  } else if (txnSelected.postings?.[0].amount > 0) {
    [debit, credit] = txnSelected.postings.map((post) => post.acctId);
  }

  const txValues = {
    ...values,
    ...dateTimeSplit(date),
    amount: amount,
    credit: credit,
    debit: debit,
  };
  return { txnId, postingIds, txValues };
};

export const TransactionForm = ({ isEdit }: { isEdit?: boolean }) => {
  const router = useRouter();
  const { txnId, postingIds, txValues } = editTxValues();
  const defaultValues: FormDefaults = isEdit
    ? txValues
    : {
        description: "",
        amount: 0,
        time: format(Date.now(), "HH:mm"),
        date: startOfToday(),
        txnType: "expense",
        credit: undefined,
        debit: undefined,
      };

  const form = useForm<FormTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });
  const onSubmit = async (data: FormTypes) => {
    console.log(JSON.stringify(data, null, 2));
    router.back();

    const formattedData: [AddTransaction, AddPosting] = [
      {
        txnType: data.txnType,
        description: data.description,
        date: dateTimeMerge(data.date, data.time),
        tags: data.tags,
        attachment: data.attachment,
      },
      {
        debit: data.debit,
        credit: data.credit,
        amount: data.amount,
        currency: "USD",
        // TODO: fix currency selection
      },
    ];
    if (isEdit) {
      await editTransaction(txnId, postingIds, ...formattedData);
    } else {
      await addTransaction(...formattedData);
    }
  };

  const onDelete = () => {
    console.log("Delete", txnId);
    deleteTransaction(txnId);
    router.back();
    return;
  };

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
      {isEdit && (
        <Button
          variant="destructive"
          className="font-normal h-8"
          onClick={onDelete}
        >
          <Archive />
          Archive
        </Button>
      )}
    </Form>
  );
};
