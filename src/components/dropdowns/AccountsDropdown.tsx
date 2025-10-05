"use client";
import useSWR from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllAccounts } from "@/data/SQLData";
import { useAccountFilterStore } from "@/store/dropdownStores";
import { AccountEmoji } from "../EmojiLoader";

export const AccountsDropdown = () => {
  const filter = useAccountFilterStore((s) => s.filter);
  const setFilter = useAccountFilterStore((s) => s.setFilter);

  const { data: accounts, isLoading } = useSWR(
    "/db/accounts/all",
    getAllAccounts,
  );

  if (isLoading) return <p>Loading...</p>;
  if (!accounts) return <p>No data</p>;

  const accountsFiltered = accounts
    .filter((acc) => (acc.acctTypeId === 1 || acc.acctTypeId === 2) && acc.icon)
    .map((acc) => ({ acctId: acc.acctId, name: acc.name }));

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
        {accountsFiltered.map((acc) => (
          <SelectItem key={acc.acctId} value={`${acc.acctId}`}>
            {acc.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
