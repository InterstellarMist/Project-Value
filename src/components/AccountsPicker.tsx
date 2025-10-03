import Image from "next/image";
import { type ComponentProps, useState } from "react";
import type { UseFormResetField } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AcctTypeSimple } from "@/types/accounts";
import type { PostingType } from "@/types/transaction";
import { AccountCarousel } from "./AccountCarousel";
import { AccountEmojiWithText } from "./EmojiLoader";
import type { addTransactionFormTypes, ControlType } from "./TransactionForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const labels = {
  income: "Income",
  expenses: "Expense",
  accounts: "Account",
};

const AccountSelectorField = ({
  accountId,
  className,
  ...props
}: ComponentProps<"button"> & { accountId?: number | null }) => {
  return (
    <button
      className="size-16 flex flex-col items-center justify-center glass-shadow rounded-2xl"
      {...props}
    >
      {accountId && (
        <AccountEmojiWithText
          acctId={accountId}
          width={40}
          height={40}
          className="gap-0"
        />
      )}
    </button>
  );
};

const AccountsDrawer = ({
  acctType,
  postingType,
  control,
}: {
  acctType: AcctTypeSimple;
  postingType: PostingType;
} & ControlType) => {
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={control}
      name={postingType}
      render={({ field }) => (
        <FormItem className="justify-items-center content-start">
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button asChild>
                <FormControl>
                  <AccountSelectorField accountId={field.value} />
                </FormControl>
              </Button>
            </DrawerTrigger>
            <FormLabel className="text-lg text-center font-normal">
              {labels[acctType]}
            </FormLabel>
            <DrawerContent className=" pb-[calc(env(safe-area-inset-bottom)/2)] min-w-[24rem]">
              <DrawerHeader className="pt-2">
                <DrawerTitle className="font-serif text-2xl font-normal">
                  {labels[acctType]}
                </DrawerTitle>
                <DrawerDescription>Select one</DrawerDescription>
              </DrawerHeader>
              <AccountCarousel
                setOpen={setOpen}
                onSelect={field.onChange}
                acctType={acctType}
              />
            </DrawerContent>
          </Drawer>
          <FormMessage className="text-center" />
        </FormItem>
      )}
    />
  );
};

const handleTabChange = (
  tab: string,
  setTab: (v: string) => void,
  reset: UseFormResetField<addTransactionFormTypes>,
) => {
  setTab(tab);
  reset("debit");
  reset("credit");
};

export const AccountsPicker = ({
  control,
  reset,
}: ControlType & { reset: UseFormResetField<addTransactionFormTypes> }) => {
  return (
    <FormField
      control={control}
      name="txnType"
      render={({ field }) => (
        <Tabs
          value={field.value}
          onValueChange={(val) => {
            handleTabChange(val, field.onChange, reset);
          }}
          defaultValue="income"
          className="w-full items-center"
        >
          <TabsList className="bg-transparent gap-6">
            <TabsTrigger
              className="data-[state=inactive]:glass-shadow data-[state=inactive]:bg-white-50"
              value="income"
            >
              Income
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=inactive]:glass-shadow data-[state=inactive]:bg-white-50"
              value="expense"
            >
              Expense
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=inactive]:glass-shadow data-[state=inactive]:bg-white-50"
              value="transfer"
            >
              Transfer
            </TabsTrigger>
          </TabsList>
          <TabsContent value="income" className="w-full">
            <div className="w-full grid grid-cols-3 grid-rows-[auto_auto] justify-items-center px-8 mt-6">
              <AccountsDrawer
                control={control}
                postingType="credit"
                acctType="income"
              />
              <Image
                src="/long-arrow.svg"
                alt="arrow"
                width={60}
                height={0}
                className="pt-6 h-auto"
              />
              <AccountsDrawer
                control={control}
                postingType="debit"
                acctType="accounts"
              />
            </div>
          </TabsContent>
          <TabsContent value="expense" className="w-full">
            <div className="w-full grid grid-cols-3 grid-rows-[auto_auto] justify-items-center px-8 mt-6">
              <AccountsDrawer
                control={control}
                postingType="credit"
                acctType="accounts"
              />
              <Image
                src="/long-arrow.svg"
                alt="arrow"
                width={60}
                height={0}
                className="pt-6 h-auto"
              />
              <AccountsDrawer
                control={control}
                postingType="debit"
                acctType="expenses"
              />
            </div>
          </TabsContent>
          <TabsContent value="transfer" className="w-full">
            <div className="w-full grid grid-cols-3 grid-rows-[auto_auto] justify-items-center px-8 mt-6">
              <AccountsDrawer
                control={control}
                postingType="credit"
                acctType="accounts"
              />
              <Image
                src="/long-arrow.svg"
                alt="arrow"
                width={60}
                height={0}
                className="pt-6 h-auto"
              />
              <AccountsDrawer
                control={control}
                postingType="debit"
                acctType="accounts"
              />
            </div>
          </TabsContent>
        </Tabs>
      )}
    />
  );
};
