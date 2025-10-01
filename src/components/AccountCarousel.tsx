"use client";
import { useEffect, useState, type Ref } from "react";
import useSWR from "swr";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getAccountsSimple } from "@/data/SQLData";
import type { AcctTypeSimple } from "@/types/accounts";
import { AccountEmojiWithText } from "./EmojiLoader";
import { CategoriesFilterBar } from "@/components/CategoriesFilterBar";
import { AnimatePresence, motion, spring } from "motion/react";
import useMeasure from "react-use-measure";

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
    <div className="w-full grid grid-cols-3 auto-rows-min px-4 pb-4 gap-y-1 gap-x-10 justify-items-center">
      {accountIds.map((val) => {
        return (
          <button
            key={val}
            type="button"
            className="w-24 gap-2 p-2 rounded-xl hover:bg-black/10 cursor-pointer"
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

const CarouselResizeWrapper = ({ children }: { children: React.ReactNode }) => {
  const [ref, bounds] = useMeasure();
  // console.log(bounds.height);
  return (
    <motion.div
      animate={{ height: bounds.height }}
      transition={{ type: spring, duration: 0.4, bounce: 0.25 }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
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
  const [category, setCategory] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [scrollList, setScrollList] = useState<number[]>([]);

  const { data: acctSimple, isLoading: isLoading0 } = useSWR(
    ["/db/accounts/simple/test", acctType],
    getAccountsSimple,
  );

  useEffect(() => {
    if (acctSimple) {
      setCategory(acctSimple[0].acctId);
    }

    if (!api) return;

    api.on("reInit", () => {
      setScrollList(api.scrollSnapList());
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, acctSimple]);

  if (isLoading0) return <p>Loading...</p>;
  if (!acctSimple) return <p>No data</p>;

  const acctIds = acctSimple.filter((cat) => cat.acctId === category);

  return (
    <div>
      <CategoriesFilterBar
        category={category}
        setCategory={setCategory}
        categories={acctSimple.map((cat) => ({
          acctId: cat.acctId,
          name: cat.name,
        }))}
      />
      <CarouselResizeWrapper>
        <Carousel setApi={setApi}>
          <CarouselContent>
            {acctIds.length > 0 &&
              generateGridPages(acctIds[0].children).map((page) => {
                return (
                  <CarouselItem key={page[0]} className="flex justify-center">
                    <motion.div
                      key={page[0]}
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.15, ease: "easeIn" }}
                      className="w-full"
                    >
                      <SelectionGrid {...props} accountIds={page} />
                    </motion.div>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
        </Carousel>
      </CarouselResizeWrapper>

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
