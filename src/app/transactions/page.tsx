import { Suspense } from "react";
import { AccountsDropdown } from "@/components/AccountsDropdown";
import { TopBar } from "@/components/TopBar";
import { TransactionsList } from "@/components/TransactionsList";
import * as transactionsData from "@/data/transactions.json";

export default function TransactionPage() {
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
        <Suspense>
          <AccountsDropdown />
          <TransactionsList {...transactionsData} />
        </Suspense>
      </div>
    </div>
  );
}
