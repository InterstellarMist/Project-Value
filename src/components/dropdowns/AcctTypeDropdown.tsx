"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAcctTypeFilterStore } from "@/store/dropdownStores";

export const AcctTypeDropdown = () => {
  const filter = useAcctTypeFilterStore((s) => s.filter);
  const setFilter = useAcctTypeFilterStore((s) => s.setFilter);

  return (
    <Select value={filter} onValueChange={setFilter}>
      <SelectTrigger
        dark
        size="sm"
        className="border-0 bg-zinc-800 rounded-full text-white cursor-pointer"
      >
        <SelectValue placeholder="Assets" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Assets</SelectItem>
        <SelectItem value="2">Liabilities</SelectItem>
        <SelectItem value="3">Income</SelectItem>
        <SelectItem value="4">Expenses</SelectItem>
      </SelectContent>
    </Select>
  );
};
