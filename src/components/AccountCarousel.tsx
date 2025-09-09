"use client";
import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { accountNames } from "@/data/accounts";
import * as accountsData from "@/data/accounts.json";
import type { AcctTypeSimple } from "@/types/accounts";
import { AccountEmoji } from "./EmojiLoader";

const SelectionGrid = ({
  accountIds,
  onSelect,
  setOpen,
}: {
  accountIds: number[];
  onSelect: (value: number) => void;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <div className="w-[8/10] grid grid-cols-3 px-4 pb-4 gap-y-3 gap-x-10">
      {accountIds.map((val) => {
        return (
          <button
            key={val}
            type="button"
            className="flex flex-col items-center justify-items-center gap-2 p-1 rounded-xl"
            onClick={() => {
              onSelect(val);
              setOpen(false);
            }}
          >
            <AccountEmoji accountId={val} width={64} height={64} />
            <p className="text-xs font-bold text-center">{accountNames[val]}</p>
          </button>
        );
      })}
    </div>
  );
};

const generateGridPages = (acctType: AcctTypeSimple) => {
  const accountIds = accountsData.accounts
    .filter((acc) => {
      switch (acctType) {
        case "account":
          return acc.type === "assets" || acc.type === "liabilities";

        case "expense":
          return acc.type === "expenses";
        default:
          return acc.type === acctType;
      }
    })
    .map((acc) => acc.accountId);

  const chunk = 9;
  return Array.from({ length: Math.ceil(accountIds.length / chunk) }, (_, i) =>
    accountIds.slice(i * chunk, (i + 1) * chunk),
  );
};

export const AccountCarousel = ({
  acctType,
  ...props
}: {
  acctType: AcctTypeSimple;
  onSelect: (value: number) => void;
  setOpen: (value: boolean) => void;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [scrollList, setScrollList] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;

    setScrollList(api.scrollSnapList());
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {generateGridPages(acctType).map((page) => {
            return (
              <CarouselItem key={page[0]}>
                <SelectionGrid {...props} accountIds={page} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center pb-4">
        {scrollList.length > 1
          ? scrollList.map((item, index) => (
              <span
                key={item}
                className={`inline-block w-2 h-2 mx-1 rounded-full ${current === index + 1 ? "bg-gray-700" : "bg-gray-300"}`}
              />
            ))
          : ""}
      </div>
    </div>
  );
};
