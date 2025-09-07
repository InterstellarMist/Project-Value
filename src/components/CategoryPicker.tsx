import Image from "next/image";
import type { ComponentProps } from "react";
import { AccountEmoji, AccountEmojiWithText } from "@/components/EmojiLoader";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { accountNames } from "@/data/accounts";
import * as accountsData from "@/data/accounts.json";

interface SelectorProps {
  accountId: number;
  txnType?: "Income" | "Expenses" | "Accounts";
}

const CategorySelector = ({
  accountId,
  className,
  ...props
}: ComponentProps<"button"> & SelectorProps) => {
  return (
    <button
      className="size-16 flex flex-col items-center justify-center gap-1 bg-white/50 glass-shadow border-white/80 rounded-2xl border"
      {...props}
    >
      <AccountEmoji accountId={accountId} width={40} height={40} />
      <p className="text-[0.5rem] font-light text-center">
        {accountNames[accountId]}
      </p>
    </button>
  );
};

const SelectionGrid = ({ txnType }: { txnType: SelectorProps["txnType"] }) => {
  return (
    <div className="w-[8/10] grid grid-cols-3 grid-rows-3 px-4 pb-2 gap-y-3 gap-x-10">
      {[13, 12, 14, 15, 16, 17, 18, 19, 20].map((val) => {
        console.log(val);
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

const CategoryDrawer = ({ txnType, ...props }: SelectorProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button asChild>
          <CategorySelector {...props} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="pt-2">
          <DrawerTitle className="font-serif text-2xl font-normal">
            {txnType}
          </DrawerTitle>
          {/* <DrawerDescription>Select one from below.</DrawerDescription> */}
        </DrawerHeader>
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <SelectionGrid txnType={txnType} />
            </CarouselItem>
            <CarouselItem>
              <SelectionGrid txnType={txnType} />
            </CarouselItem>
            <CarouselItem>
              <SelectionGrid txnType={txnType} />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const CategoryPicker = () => {
  return (
    <Tabs defaultValue="income" className="w-full items-center mt-8">
      <TabsList className="bg-transparent gap-6">
        <TabsTrigger value="income">Income</TabsTrigger>
        <TabsTrigger value="expense">Expense</TabsTrigger>
        <TabsTrigger value="transfer">Transfer</TabsTrigger>
      </TabsList>
      <TabsContent value="income" className="w-full">
        <div className="w-full grid grid-cols-3 grid-rows-[auto_auto] justify-items-center items-center px-16 mt-8">
          <CategoryDrawer txnType="Income" accountId={10} />
          <Image src="long-arrow.svg" alt="arrow" width={60} height={60} />
          <CategoryDrawer txnType="Accounts" accountId={6} />
          <h2 className="text-lg not-last:text-center pt-4">Income</h2>
          <h2 className="text-lg text-center col-start-3 pt-4">Account</h2>
        </div>
      </TabsContent>
      <TabsContent value="expense" className="w-full">
        <div className="w-full grid grid-cols-3 grid-rows-[auto_auto] justify-items-center items-center px-16 mt-8">
          <CategoryDrawer txnType="Accounts" accountId={6} />
          <Image src="long-arrow.svg" alt="arrow" width={60} height={60} />
          <CategoryDrawer txnType="Expenses" accountId={13} />
          <h2 className="text-lg not-last:text-center pt-4">Account</h2>
          <h2 className="text-lg text-center col-start-3 pt-4">Expense</h2>
        </div>
      </TabsContent>
      <TabsContent value="transfer" className="w-full">
        <div className="w-full grid grid-cols-3 grid-rows-[auto_auto] justify-items-center items-center px-16 mt-8">
          <CategoryDrawer txnType="Accounts" accountId={7} />
          <Image src="long-arrow.svg" alt="arrow" width={60} height={60} />
          <CategoryDrawer txnType="Accounts" accountId={6} />
          <h2 className="text-lg not-last:text-center pt-4">Account</h2>
          <h2 className="text-lg text-center col-start-3 pt-4">Account</h2>
        </div>
      </TabsContent>
    </Tabs>
  );
};
