"use client";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AddAccountControlTypes } from "../AddAccountDrawer";
import { getCategoriesType } from "@/data/SQLData";
import useSWR from "swr";
import { useAcctTypeFilterStore } from "@/store/dropdownStores";

export const CategoriesDropdown = ({ control }: AddAccountControlTypes) => {
  const acctTypeId = Number(useAcctTypeFilterStore((s) => s.filter));

  const { data: categories, isLoading } = useSWR(
    ["/db/accounts/category", acctTypeId],
    getCategoriesType,
  );

  if (isLoading) return <p>Loading...</p>;
  if (!categories) return <p>No data</p>;

  return (
    <FormField
      control={control}
      name="parentId"
      render={({ field }) => (
        <FormItem>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              dark
              size="sm"
              className="border-0 bg-zinc-800 rounded-full text-white cursor-pointer"
            >
              <SelectValue placeholder="Choose Category" />
            </SelectTrigger>
            <FormMessage />
            <SelectContent>
              <SelectItem value="0">Select Category</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.acctId} value={`${category.acctId}`}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
