"use client";
import { Icon } from "@iconify/react";
import { AccountsHomepage, NetWorthHomepage } from "@/components/AccountsList";
import { RecentTransactions } from "@/components/TransactionsList";

const TopBar = () => {
  return (
    <div className="flex self-start items-center gap-2 p-6 px-[5vw]">
      <Icon icon="stash:user-avatar-light" width={64} />
      <div className="flex flex-col">
        <span className="font-serif text-gray-500">Welcome back,</span>
        <span className="font-serif text-3xl leading-none">Nicholas Chai</span>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <div className="flex flex-col gap-4 items-center">
        <NetWorthHomepage />
        <AccountsHomepage />
        <RecentTransactions />
      </div>
    </div>
  );
}
