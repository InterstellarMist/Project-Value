"use client";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AccountEmoji } from "./EmojiLoader";

interface FilterProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export const AccountsDropdown = ({ filter, setFilter }: FilterProps) => {
  const router = useRouter();

  const handleAccountChange = (newAccount: string) => {
    router.replace(`/transactions?account=${newAccount}`);
    setFilter(newAccount);
  };

  return (
    <Select value={filter} onValueChange={handleAccountChange}>
      <SelectTrigger className="border-0 bg-zinc-800 rounded-full text-white gap-3 point cursor-pointer">
        <AccountEmoji
          accountId={parseInt(filter, 10)}
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
