"use client";
import { AccountsPicker } from "@/components/AccountsPicker";
import { DateTimePicker } from "@/components/DateTimePicker";
import { ProfileForm, TransactionForm } from "@/components/TransactionForm";
import { TopBar } from "@/components/TopBar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AttachmentInput = () => {
  return (
    <div className="w-[80%] flex flex-col gap-3 justify-items-center rounded-2xl">
      <Label htmlFor="attachment" className="px-1 text-lg font-semibold">
        Attachment
      </Label>
      <Input
        id="attachment"
        type="file"
        className="h-10 w-[85%] glass-shadow bg-white/50 flex-row justify-center pt-2 text-xs"
      />
    </div>
  );
};

const DescriptionInput = () => {
  return (
    <div className="w-[80%] flex flex-col gap-3 rounded-2xl">
      <Label htmlFor="description" className="px-1 text-lg font-semibold">
        Description
      </Label>
      <Input
        id="description"
        type="text"
        placeholder="Add description here"
        className="w-full h-10 p-2 placeholder:text-gray-500 glass-shadow bg-white/50"
      />
    </div>
  );
};

const AmountInput = () => {
  return (
    <div className="w-[80%] glass-shadow flex flex-col items-center rounded-2xl p-2">
      <Label htmlFor="amount" className="font-semibold text-lg justify-center">
        Amount
      </Label>
      <Input
        id="amount"
        type="text"
        placeholder="+$200.00"
        className="w-full h-full text-center text-4xl p-2 border-0 shadow-none text-green-500 placeholder:text-green-500"
      />
    </div>
  );
};

export default function AddTransactionPage() {
  return (
    <div>
      <TopBar
        leftIcon="close.svg"
        leftLink="/transactions?account=0"
        title="Add Transaction"
        rightIcon="check.svg"
        rightLink="/transactions?account=0"
      />
      <div className="flex flex-col items-center justify-center gap-8 pb-24">
        <AccountsPicker />
        {/* <AmountInput />
        <DescriptionInput />
        <DateTimePicker />
        <AttachmentInput /> */}
        <TransactionForm />
      </div>
    </div>
  );
}
