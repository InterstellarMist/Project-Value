"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccountFilterStore } from "@/store/dropdownStores";
import { AccountEmoji } from "../EmojiLoader";

// TODO: dynamic accounts
export const AccountsDropdown = () => {
  const filter = useAccountFilterStore((s) => s.filter);
  const setFilter = useAccountFilterStore((s) => s.setFilter);

  return (
    <Select value={filter} onValueChange={setFilter}>
      <SelectTrigger
        dark
        size="sm"
        className="border-0 bg-zinc-800 rounded-full text-white cursor-pointer"
      >
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
