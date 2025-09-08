"use client";
import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import * as accountsData from "@/data/accounts.json";
import type { AcctType } from "./AccountsPicker";
import { AccountEmojiWithText } from "./EmojiLoader";

const SelectionGrid = ({ accountIds }: { accountIds: number[] }) => {
  return (
    <div className="w-[8/10] grid grid-cols-3 px-4 pb-4 gap-y-3 gap-x-10">
      {accountIds.map((val) => {
        return (
          <AccountEmojiWithText
            key={val}
            accountId={val}
            width={64}
            height={64}
            className="gap-2 ring-gray-500 rounded-xl p-1"
            // className="gap-2 ring-2 ring-gray-500 rounded-xl p-1 "
            textStyle="text-xs font-bold"
          />
        );
      })}
    </div>
  );
};

const generateGridPages = (acctType: AcctType) => {
  const accountIds = accountsData.accounts
    .filter((acc) =>
      acctType === "accounts"
        ? acc.type === "assets" || acc.type === "liabilities"
        : acc.type === acctType,
    )
    .map((acc) => acc.accountId);

  const chunk = 9;
  return Array.from({ length: Math.ceil(accountIds.length / chunk) }, (_, i) =>
    accountIds.slice(i * chunk, (i + 1) * chunk),
  );
};

export const AccountCarousel = ({ acctType }: { acctType: AcctType }) => {
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
                <SelectionGrid accountIds={page} />
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
