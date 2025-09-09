import Image from "next/image";
import { type ComponentProps, useState } from "react";
import type { UseFormResetField } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { accountNames } from "@/data/accounts";
import { capitalize } from "@/lib/utils";
import type { AcctTypeSimple } from "@/types/accounts";
import type { PostingType } from "@/types/transaction";
import { AccountCarousel } from "./AccountCarousel";
import { AccountEmoji } from "./EmojiLoader";
import type { ControlType, FormTypes } from "./TransactionForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const AccountSelectorField = ({
  accountId,
  className,
  ...props
}: ComponentProps<"button"> & { accountId?: number }) => {
  return (
    <button
      className="size-16 flex flex-col items-center justify-center gap-1 glass-shadow rounded-2xl"
      {...props}
    >
      {accountId && (
        <AccountEmoji accountId={accountId} width={40} height={40} />
      )}
      <p className="text-[0.5rem] font-light text-center">
        {accountId && accountNames[accountId]}
      </p>
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
        <FormItem className="justify-items-center">
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button asChild>
                <FormControl>
                  <AccountSelectorField accountId={field.value} />
                </FormControl>
              </Button>
            </DrawerTrigger>
            <FormLabel className="text-lg text-center font-normal">
              {capitalize(acctType)}
            </FormLabel>
            <DrawerContent>
              <DrawerHeader className="pt-2">
                <DrawerTitle className="font-serif text-2xl font-normal">
                  {capitalize(acctType)}
                </DrawerTitle>
              </DrawerHeader>
              <AccountCarousel
                setOpen={setOpen}
                onSelect={field.onChange}
                acctType={acctType}
              />
            </DrawerContent>
          </Drawer>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const handleTabChange = (
  tab: string,
  setTab: (v: string) => void,
  reset: UseFormResetField<FormTypes>,
) => {
  setTab(tab);
  reset("debit");
  reset("credit");
};

export const AccountsPicker = ({
  control,
  reset,
}: ControlType & { reset: UseFormResetField<FormTypes> }) => {
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
          className="w-full items-center mt-8"
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
                src="long-arrow.svg"
                alt="arrow"
                width={60}
                height={60}
                className="pt-6"
              />
              <AccountsDrawer
                control={control}
                postingType="debit"
                acctType="account"
              />
            </div>
          </TabsContent>
          <TabsContent value="expense" className="w-full">
            <div className="w-full grid grid-cols-3 grid-rows-[auto_auto] justify-items-center px-8 mt-6">
              <AccountsDrawer
                control={control}
                postingType="credit"
                acctType="account"
              />
              <Image
                src="long-arrow.svg"
                alt="arrow"
                width={60}
                height={60}
                className="pt-6"
              />
              <AccountsDrawer
                control={control}
                postingType="debit"
                acctType="expense"
              />
            </div>
          </TabsContent>
          <TabsContent value="transfer" className="w-full">
            <div className="w-full grid grid-cols-3 grid-rows-[auto_auto] justify-items-center px-8 mt-6">
              <AccountsDrawer
                control={control}
                postingType="credit"
                acctType="account"
              />
              <Image
                src="long-arrow.svg"
                alt="arrow"
                width={60}
                height={60}
                className="pt-6"
              />
              <AccountsDrawer
                control={control}
                postingType="debit"
                acctType="account"
              />
            </div>
          </TabsContent>
        </Tabs>
      )}
    />
  );
};
