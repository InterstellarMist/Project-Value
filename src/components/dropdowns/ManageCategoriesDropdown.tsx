"use client";
import {
  CirclePlus,
  GripVertical,
  Minus,
  Pencil,
  Settings2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAcctTypeFilterStore } from "@/store/dropdownStores";
import useSWR from "swr";
import { addAccount, getCategoriesType } from "@/data/SQLData";
import { useState } from "react";
import type { AddAccount } from "@/types/accounts";
import { type ScopedMutator, useSWRConfig } from "swr";

const revalidateAccounts = (mutate: ScopedMutator, acctTypeId: number) => {
  mutate(["/db/accounts", acctTypeId]);
  mutate(["/db/accounts/category", acctTypeId]);
};

export const ManageCategoriesDropdown = () => {
  const acctTypeId = Number(useAcctTypeFilterStore((s) => s.filter));
  const [newCategory, setNewCategory] = useState("");
  const { mutate } = useSWRConfig();

  const { data: categories, isLoading } = useSWR(
    ["/db/accounts/category", acctTypeId],
    getCategoriesType,
  );

  if (isLoading) return <p>Loading...</p>;
  if (!categories) return <p>No data</p>;

  const categoriesFiltered = categories.filter(
    (acc) => acc.name !== "Uncategorized",
  );

  const onSubmit = () => {
    const data: AddAccount = {
      acctTypeId,
      name: newCategory,
      parentId: acctTypeId,
      currency: "USD",
    };
    console.log(data);

    addAccount(data);
    revalidateAccounts(mutate, acctTypeId);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="sm" className="rounded-full">
          <Settings2 />
          Manage Categories
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 rounded-2xl border-2 p-3" sideOffset={8}>
        <div className="flex gap-2">
          <Input
            type="text"
            maxLength={24}
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add category"
            className="h-10 p-2 flex-1 placeholder:text-gray-500 border-2 rounded-lg mb-2"
          />
          <Button
            type="button"
            onClick={onSubmit}
            size="icon"
            variant="secondary"
            className="size-10 border-2 bg-transparent rounded-lg hover:bg-border"
          >
            <CirclePlus />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {categoriesFiltered.map((category) => (
            <div key={category.acctId} className="flex items-center gap-1 px-1">
              <GripVertical size={12} className="text-gray-500" />
              <p className="flex-1">{category.name}</p>
              <Pencil size={16} />
              <Minus
                size={16}
                color="white"
                strokeWidth={3}
                className="bg-red-500 rounded-full ml-2"
              />
            </div>
          ))}
          {categoriesFiltered.length === 0 && (
            <p className="text-center p-2">No Categories</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
