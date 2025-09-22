"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoryFilterStore } from "@/store/dropdownStores";

// TODO: dynamic accounts
export const CategoriesDropdown = () => {
  const filter = useCategoryFilterStore((s) => s.filter);
  const setFilter = useCategoryFilterStore((s) => s.setFilter);

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
        <SelectItem value="3">Expenses</SelectItem>
        <SelectItem value="4">Income</SelectItem>
      </SelectContent>
    </Select>
  );
};
