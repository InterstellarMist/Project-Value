"use client";
import { Icon } from "@iconify/react";
import { AccountsHomepage } from "@/components/AccountsList";
import { CardContainer } from "@/components/CardContainer";
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
        <CardContainer className="w-9/10 flex flex-col gap-4">
          <h2 className="text-2xl leading-none font-serif">Net Worth</h2>
          <h1 className="text-6xl text-center font-light">$5,680.29</h1>
        </CardContainer>
        <AccountsHomepage />
        <RecentTransactions />
      </div>
    </div>
  );
}
