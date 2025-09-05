"use client";
import { useSearchParams } from "next/navigation";
import { AccountsDropdown } from "@/components/AccountsDropdown";
import { TopBar } from "@/components/TopBar";
import { TransactionsList } from "@/components/TransactionsList";

import * as transactionsData from "@/data/transactions.json";

export default function TransactionPage() {
  const searchParams = useSearchParams();
  const account = searchParams.get("account");

  return (
    <div>
      <TopBar
        leftIcon="back.svg"
        leftLink="/accounts"
        title="Transactions"
        rightIcon="filter.svg"
        rightLink="/filter"
      />
      <div className="flex flex-col items-center justify-center gap-4 pb-24">
        <AccountsDropdown />
        <TransactionsList {...transactionsData} account={account} />
      </div>
    </div>
  );
}
