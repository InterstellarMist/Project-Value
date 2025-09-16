"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterStore } from "@/store/useFilterStore";
import { AccountEmoji } from "./EmojiLoader";

const AccountsDropdown = () => {
  const filter = useFilterStore((s) => s.filter);
  const setFilter = useFilterStore((s) => s.setFilter);

  return (
    <Select value={filter} onValueChange={setFilter}>
      <SelectTrigger className="border-0 bg-zinc-800 rounded-full text-white gap-3 point cursor-pointer">
        <AccountEmoji
          acctId={parseInt(filter, 10)}
          height="1.5em"
          width="1.5em"
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

export default AccountsDropdown;
