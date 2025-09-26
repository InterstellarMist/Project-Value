"use client";
import useSWR from "swr";
import { getCategoriesSimple } from "@/data/SQLData";
import type { AcctTypeSimple } from "@/types/accounts";
import { Button } from "./ui/button";
import { useFilterBarStore } from "@/store/uiStateStores";
import { useEffect } from "react";

export const CategoriesFilterBar = ({
  acctType,
}: {
  acctType: AcctTypeSimple;
}) => {
  const category = useFilterBarStore((s) => s.category);
  const setCategory = useFilterBarStore((s) => s.setCategory);

  const { data: categories, isLoading } = useSWR(
    ["/db/accounts/category/simple", acctType],
    getCategoriesSimple,
  );

  useEffect(() => {
    if (categories) {
      setCategory(categories[0].acctId);
    }
  }, [categories, setCategory]);

  if (isLoading) return <p>Loading...</p>;
  if (!categories) return <p>No data</p>;

  return (
    <div className="flex gap-2 px-4 overflow-x-auto">
      {categories.length > 1 &&
        categories.map((cat) => (
          <Button
            key={cat.acctId}
            onClick={() => setCategory(cat.acctId)}
            variant={category === cat.acctId ? "selected" : "secondary"}
            size="sm"
            className="rounded-full mb-4"
          >
            {cat.name}
          </Button>
        ))}
    </div>
  );
};
