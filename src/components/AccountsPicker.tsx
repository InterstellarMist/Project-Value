import Image from "next/image";
import type { ComponentProps } from "react";
import { AccountEmoji } from "@/components/EmojiLoader";
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
import { AccountCarousel } from "./AccountCarousel";

export type AcctType = "income" | "expenses" | "accounts";

const AccountSelectorField = ({
  accountId,
  className,
  ...props
}: ComponentProps<"button"> & { accountId: number }) => {
  return (
    <button
      className="size-16 flex flex-col items-center justify-center gap-1 glass-shadow rounded-2xl"
      {...props}
    >
      <AccountEmoji accountId={accountId} width={40} height={40} />
      <p className="text-[0.5rem] font-light text-center">
        {accountNames[accountId]}
      </p>
    </button>
  );
};

const AccountsDrawer = ({
  acctType,
  ...props
}: {
  accountId: number;
  acctType: AcctType;
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button asChild>
          <AccountSelectorField {...props} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="pt-2">
          <DrawerTitle className="font-serif text-2xl font-normal">
            {capitalize(acctType)}
          </DrawerTitle>
        </DrawerHeader>
        <AccountCarousel acctType={acctType} />
      </DrawerContent>
    </Drawer>
  );
};

export const AccountsPicker = () => {
  return (
    <Tabs defaultValue="income" className="w-full items-center mt-8">
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
        <div className="w-full grid grid-cols-3 grid-rows-[auto_auto] justify-items-center items-center px-16 mt-8">
          <AccountsDrawer acctType="income" accountId={10} />
          <Image src="long-arrow.svg" alt="arrow" width={60} height={60} />
          <AccountsDrawer acctType="accounts" accountId={6} />
          <h2 className="text-lg not-last:text-center pt-4 select-none">
            Income
          </h2>
          <h2 className="text-lg text-center col-start-3 pt-4 select-none">
            Account
          </h2>
        </div>
      </TabsContent>
      <TabsContent value="expense" className="w-full">
        <div className="w-full grid grid-cols-3 grid-rows-[auto_auto] justify-items-center items-center px-16 mt-8">
          <AccountsDrawer acctType="accounts" accountId={6} />
          <Image src="long-arrow.svg" alt="arrow" width={60} height={60} />
          <AccountsDrawer acctType="expenses" accountId={13} />
          <h2 className="text-lg not-last:text-center pt-4 select-none">
            Account
          </h2>
          <h2 className="text-lg text-center col-start-3 pt-4 select-none">
            Expense
          </h2>
        </div>
      </TabsContent>
      <TabsContent value="transfer" className="w-full">
        <div className="w-full grid grid-cols-3 grid-rows-[auto_auto] justify-items-center items-center px-16 mt-8">
          <AccountsDrawer acctType="accounts" accountId={7} />
          <Image src="long-arrow.svg" alt="arrow" width={60} height={60} />
          <AccountsDrawer acctType="accounts" accountId={6} />
          <h2 className="text-lg not-last:text-center pt-4 select-none">
            Account
          </h2>
          <h2 className="text-lg text-center col-start-3 pt-4 select-none">
            Account
          </h2>
        </div>
      </TabsContent>
    </Tabs>
  );
};
