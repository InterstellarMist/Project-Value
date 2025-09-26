"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getAccountIdSimple } from "@/data/SQLData";
import type { AcctTypeSimple } from "@/types/accounts";
import { AccountEmojiWithText } from "./EmojiLoader";
import { useFilterBarStore } from "@/store/uiStateStores";

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
    <div className="w-[8/10] grid grid-cols-3 px-4 pb-4 gap-y-1 gap-x-10 justify-items-center">
      {accountIds.map((val) => {
        return (
          <button
            key={val}
            type="button"
            className="w-24 not-first-of-type:gap-2 p-2 rounded-xl hover:bg-black/10 cursor-pointer"
            onClick={() => {
              onSelect(val);
              setOpen(false);
            }}
          >
            <AccountEmojiWithText
              acctId={val}
              width={64}
              height={64}
              textStyle="text-xs font-bold text-center"
              className="gap-2"
            />
          </button>
        );
      })}
    </div>
  );
};

const generateGridPages = (accountIds: number[], chunk = 9) => {
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
  const { data: acctIds, isLoading } = useSWR(
    ["/db/accounts/simple", acctType],
    getAccountIdSimple,
  );

  const category = useFilterBarStore((s) => s.category);
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

  if (isLoading) return <p>Loading...</p>;
  if (!acctIds) return <p>No data</p>;

  console.log(acctIds);

  return (
    <div>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {acctIds[category] &&
            generateGridPages(acctIds[category]).map((page) => {
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
