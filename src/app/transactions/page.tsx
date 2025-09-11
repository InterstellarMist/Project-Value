"use client";
import Image from "next/image";
// import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import AccountsDropdown from "@/components/AccountsDropdown";
import { TransactionsList } from "@/components/TransactionsList";
import transactionsDataJson from "@/data/transactions.json";
import type { Transaction } from "@/types/transaction";

// const AccountsDropdown = dynamic(
//   () => import("@/components/AccountsDropdown"),
//   { ssr: false },
// );

const transactionsData = transactionsDataJson as {
  transactions: Transaction[];
};

const TopBar = () => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-[20%_60%_20%] items-center pt-8 pb-4 px-[5vw]">
      <button
        type="button"
        className="justify-self-start cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <Image src="back.svg" alt="back" width={32} height={32} />
      </button>
      <h1 className="text-2xl text-center font-serif leading-none select-none">
        Transactions
      </h1>
      <button type="button" className="justify-self-end cursor-pointer">
        <Image src="filter.svg" alt="filter" width={32} height={32} />
      </button>
    </div>
  );
};

export default function TransactionPage() {
  return (
    <div>
      <TopBar />
      <div className="flex flex-col items-center justify-center gap-4 pb-24">
        <AccountsDropdown />
        <TransactionsList {...transactionsData} />
      </div>
    </div>
  );
}
