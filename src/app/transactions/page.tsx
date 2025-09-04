"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { TransactionsList } from "@/components/TransactionsList";
import { AccountsDropdown } from "@/components/AccountsDropdown";

import * as transactionsData from "@/data/transactions.json";

const TopBar = () => {
  return (
    <div className="grid grid-cols-[20%_60%_20%] items-center pt-8 pb-4 px-[5vw]">
      <Link href="/accounts">
        <img src="back.svg" width={32} className="justify-self-start" />
      </Link>
      <h1 className="text-2xl text-center font-serif leading-none">
        Transactions
      </h1>
      <img src="filter.svg" width={30} className="justify-self-end" />
    </div>
  );
};

export default function TransactionPage() {
  const searchParams = useSearchParams();
  const account = searchParams.get("account");

  return (
    <div>
      <TopBar />
      <div className="flex flex-col items-center justify-center gap-4 pb-24">
        <AccountsDropdown />
        <TransactionsList {...transactionsData} account={account} />
      </div>
    </div>
  );
}
