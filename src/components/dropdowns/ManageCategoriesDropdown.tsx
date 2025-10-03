"use client";
import {
  CirclePlus,
  GripVertical,
  Minus,
  Pencil,
  PencilLine,
  Settings2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useSWR, { type ScopedMutator, useSWRConfig } from "swr";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  addAccount,
  deleteAccount,
  editAccount,
  getCategoriesType,
} from "@/data/SQLData";
import { cn } from "@/lib/utils";
import { useAcctTypeFilterStore } from "@/store/dropdownStores";
import type { AddAccount } from "@/types/accounts";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const revalidateAccounts = (mutate: ScopedMutator, acctTypeId: number) => {
  mutate(["/db/accounts", acctTypeId]);
  mutate(["/db/accounts/category", acctTypeId]);
};

export const ManageCategoriesDropdown = () => {
  const acctTypeId = Number(useAcctTypeFilterStore((s) => s.filter));
  const [currentRename, setCurrentRename] = useState(0);
  const [rename, setRename] = useState("");
  const [openPopover, setOpenPopover] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const { mutate } = useSWRConfig();

  const renameInputRef = useRef<HTMLInputElement | null>(null);

  const { data: categories, isLoading } = useSWR(
    ["/db/accounts/category", acctTypeId],
    getCategoriesType,
  );

  useEffect(() => {
    if (currentRename && renameInputRef.current) {
      renameInputRef.current?.focus();
    }
  });

  if (isLoading) return <p>Loading...</p>;
  if (!categories) return <p>No data</p>;

  const categoriesFiltered = categories.filter(
    (acc) => acc.name !== "Uncategorized",
  );

  const onSubmit = async () => {
    if (newCategory.length === 0) return;
    const data: AddAccount = {
      acctTypeId,
      name: newCategory,
      parentId: acctTypeId,
      currency: "USD",
    };
    console.log(data);
    await addAccount(data);
    setNewCategory("");
    revalidateAccounts(mutate, acctTypeId);
  };

  const onEdit = async (acctId: number) => {
    if (currentRename === acctId) {
      // Submit
      setCurrentRename(0);
      if (!rename) return;

      const data: AddAccount = {
        acctTypeId,
        name: rename,
        parentId: acctTypeId,
        currency: "USD",
      };
      console.log(data);

      await editAccount(acctId, data);
      setRename("");
      revalidateAccounts(mutate, acctTypeId);
    } else {
      // Edit
      setCurrentRename(acctId);
    }
  };

  const onDelete = async (acctId: number) => {
    console.log("Delete", acctId);
    await deleteAccount(acctId);
    revalidateAccounts(mutate, acctTypeId);
  };

  return (
    <Popover
      open={openPopover}
      onOpenChange={(open) => {
        setOpenPopover(open);
        !open && setNewCategory("");
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="white" size="sm" className="rounded-full">
          <Settings2 />
          Manage Categories
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 rounded-2xl border-2 p-3" sideOffset={8}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="flex gap-2">
            <Input
              type="text"
              minLength={2}
              maxLength={24}
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add category"
              className="h-10 p-2 flex-1 placeholder:text-gray-500 border-2 rounded-lg mb-2"
            />
            <Button
              type="submit"
              size="icon"
              variant="secondary"
              className="size-10 border-2 bg-transparent rounded-lg hover:bg-border"
            >
              <CirclePlus />
            </Button>
          </div>
        </form>

        <div className="flex flex-col gap-2">
          {categoriesFiltered.map((category) => (
            <form
              key={category.acctId}
              onSubmit={(e) => {
                e.preventDefault();
                onEdit(category.acctId);
              }}
            >
              <div className="flex items-center gap-1 px-1">
                <GripVertical size={12} className="text-gray-500" />
                {currentRename === category.acctId ? (
                  <input
                    type="text"
                    key={category.acctId}
                    ref={(el) => {
                      renameInputRef.current = el;
                    }}
                    value={rename}
                    onChange={(e) => setRename(e.target.value)}
                    className="flex-1 min-w-0"
                    placeholder={category.name}
                  />
                ) : (
                  <p className="flex-1">{category.name}</p>
                )}
                {currentRename === category.acctId ? (
                  <PencilLine
                    onClick={() => onEdit(category.acctId)}
                    size={16}
                    className={cn("min-w-4 text-blue-700 cursor-pointer")}
                  />
                ) : (
                  <Pencil
                    onClick={() => onEdit(category.acctId)}
                    size={16}
                    className={cn("min-w-4 cursor-pointer")}
                  />
                )}
                <Minus
                  onClick={() => onDelete(category.acctId)}
                  size={16}
                  color="white"
                  strokeWidth={3}
                  className="min-w-4 bg-red-500 rounded-full ml-2 cursor-pointer"
                />
              </div>
            </form>
          ))}
          {categoriesFiltered.length === 0 && (
            <p className="text-center p-2">No Categories</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
