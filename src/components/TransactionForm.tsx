"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, startOfToday } from "date-fns";
import { Archive, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { type Control, useForm } from "react-hook-form";
import { type ScopedMutator, useSWRConfig } from "swr";
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
import { dateTimeMerge, dateTimeSplit } from "@/lib/utils";
import { useAccountFilterStore } from "@/store/dropdownStores";
import { useSetting } from "@/store/userSettingsStore";
import { useTxnStore } from "@/store/useTxnStore";
import type { AddPosting, AddTransaction } from "@/types/transaction";
import { AccountsPicker } from "./AccountsPicker";
import { DateTimePicker } from "./DateTimePicker";
import { AddTxnAmountField } from "./input/AmountInput";
import { Button } from "./ui/button";

export type AddTransactionFormTypes = z.infer<typeof FormSchema>;

type FormDefaults = Omit<AddTransactionFormTypes, "debit" | "credit"> & {
  debit: number | undefined;
  credit: number | undefined;
};

export interface AddTransactionControlTypes {
  control: Control<AddTransactionFormTypes>;
}

const FormSchema = z.object({
  description: z.string().min(1, "What's the transaction?"),
  tags: z.string().optional().nullable(),
  attachment: z.file().optional().nullable(),
  amount: z
    .transform(Number)
    .pipe(z.number("Enter Amount").gt(0, "Enter Amount")),
  date: z.date("Pick a date"),
  time: z.iso.time(),
  txnType: z.literal(["income", "expense", "transfer", "equity"]),
  debit: z.number("Oops, choose one."),
  credit: z.number("Oops, choose one."),
  currency: z.string("Choose a currency"),
});

// TODO: abstraction
const AttachmentInput = ({ control }: AddTransactionControlTypes) => {
  return (
    <FormField
      control={control}
      name="attachment"
      render={({ field: { ref, name, onBlur, onChange } }) => (
        <FormItem className="max-w-65">
          <FormLabel className="px-1 text-lg font-bold">Attachment</FormLabel>
          <FormControl>
            <Input
              type="file"
              className="h-10 pt-2 text-xs glass-shadow text-right"
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

const DescriptionInput = ({ control }: AddTransactionControlTypes) => {
  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="px-1 text-lg font-bold">Description</FormLabel>
          <FormControl>
            <Input
              placeholder="Add description here"
              className="w-full h-10 p-2 placeholder:text-gray-500 glass-shadow"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// TODO: port swr to zustand
const revalidateTransactions = (mutate: ScopedMutator, account: number) => {
  mutate(["/db/transactions", account]);
  mutate((key) => Array.isArray(key) && key[0] === "/db/posting");
  mutate("/db/balances");
  mutate("/db/balance/summary");
};

// get selected transaction from store
const editTxValues = () => {
  const txnSelected = useTxnStore((s) => s.txnSelected);
  let credit: number = 0,
    debit: number = 0;

  const { txnId, date, ...values } = txnSelected.transaction;
  const amount = Math.abs(txnSelected.postings[0].amount);
  const postingIds = txnSelected.postings.map((post) => post.postingId);
  const currency = txnSelected.postings[0].currency;

  if (txnSelected.postings?.[0].amount < 0) {
    [credit, debit] = txnSelected.postings.map((post) => post.acctId);
  } else if (txnSelected.postings?.[0].amount > 0) {
    [debit, credit] = txnSelected.postings.map((post) => post.acctId);
  }

  const txValues = {
    ...values,
    ...dateTimeSplit(date),
    amount,
    credit,
    debit,
    currency,
  };
  return { txnId, postingIds, txValues };
};

export const TransactionForm = ({ isEdit }: { isEdit?: boolean }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const filter = useAccountFilterStore((s) => s.filter);
  const account = parseInt(filter, 10);
  const defaultCurrency = useSetting.currency();

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
        currency: defaultCurrency,
      };

  const form = useForm<AddTransactionFormTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });
  const onSubmit = async (data: AddTransactionFormTypes) => {
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
        currency: data.currency,
      },
    ];
    if (isEdit) {
      await editTransaction(txnId, postingIds, ...formattedData);
    } else {
      await addTransaction(...formattedData);
    }
    revalidateTransactions(mutate, account);
  };

  const onDelete = async () => {
    console.log("Delete", txnId);
    await deleteTransaction(txnId);
    revalidateTransactions(mutate, account);
    router.back();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-8/10 space-y-4">
        <AccountsPicker control={form.control} reset={form.resetField} />
        <AddTxnAmountField<AddTransactionFormTypes>
          name="amount"
          label="Amount"
          control={form.control}
          watch={form.watch}
        />
        <DescriptionInput control={form.control} />
        <DateTimePicker control={form.control} />
        <AttachmentInput control={form.control} />
        <button
          type="submit"
          className="absolute top-[calc(1.5rem+env(safe-area-inset-bottom)/2)] right-6 cursor-pointer hover:bg-white/50 rounded-full p-2"
        >
          <Check size={30} strokeWidth={1.25} />
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
