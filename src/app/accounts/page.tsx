"use client";
import Image from "next/image";
import Link from "next/link";
import { AccountsList, AccountSummary } from "@/components/AccountsList";
import { useFilterStore } from "@/store/useFilterStore";

const TopBar = () => {
  const setFilter = useFilterStore((s) => s.setFilter);
  return (
    <div className="grid grid-cols-[20%_60%_20%] items-center pt-8 pb-4 px-[5vw]">
      <Link
        href="/transactions"
        onClick={() => setFilter("0")}
        className="justify-self-start"
      >
        <Image
          src="transactions.svg"
          alt="transactions"
          width={32}
          height={32}
        />
      </Link>
      <h1 className="text-2xl text-center font-serif leading-none select-none">
        Accounts
      </h1>
      <Link href="/edit" className="justify-self-end">
        <Image src="edit.svg" alt="edit" width={32} height={32} />
      </Link>
    </div>
  );
};

export default function AccountsPage() {
  return (
    <div>
      <TopBar />
      <div className="flex flex-col gap-2 items-center">
        <AccountSummary />
        <AccountsList />
      </div>
    </div>
  );
}
