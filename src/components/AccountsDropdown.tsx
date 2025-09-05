"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AccountEmoji } from "./EmojiLoader";

export const AccountsDropdown = () => {
  const searchParams = useSearchParams();
  const account = searchParams.get("account");
  const [value, setValue] = useState(account || "");
  const router = useRouter();

  const handleAccountChange = (newAccount: string) => {
    router.push(`/transactions?account=${newAccount}`);
    setValue(newAccount);
  };

  return (
    <Select value={value} onValueChange={handleAccountChange}>
      <SelectTrigger className="border-0 bg-zinc-800 rounded-full text-white gap-3 point cursor-pointer">
        <AccountEmoji account={value} height={"1.5rem"} />
        <SelectValue placeholder="Account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All Accounts</SelectItem>
        <SelectItem value="Cash">Cash</SelectItem>
        <SelectItem value="Debit Card">Debit Card</SelectItem>
        <SelectItem value="Credit Card">Credit Card</SelectItem>
        <SelectItem value="Loans">Loans</SelectItem>
      </SelectContent>
    </Select>
  );
};
