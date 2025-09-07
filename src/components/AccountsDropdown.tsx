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
  const [value, setValue] = useState(account ?? "0");
  const router = useRouter();

  const handleAccountChange = (newAccount: string) => {
    router.push(`/transactions?account=${newAccount}`);
    setValue(newAccount);
  };

  return (
    <Select value={value} onValueChange={handleAccountChange}>
      <SelectTrigger className="border-0 bg-zinc-800 rounded-full text-white gap-3 point cursor-pointer">
        <AccountEmoji
          accountId={parseInt(value, 10)}
          height="1.5rem"
          width="1.5rem"
        />
        <SelectValue placeholder="Account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">All Accounts</SelectItem>
        <SelectItem value="6">Cash</SelectItem>
        <SelectItem value="7">Debit Card</SelectItem>
        <SelectItem value="8">Credit Card</SelectItem>
        <SelectItem value="9">Loans</SelectItem>
      </SelectContent>
    </Select>
  );
};
