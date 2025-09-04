import { AccountsList } from "@/components/AccountsList";
import Link from "next/link";

import * as accountsData from "@/data/accounts.json";

const TopBar = () => {
  return (
    <div className="grid grid-cols-[20%_60%_20%] items-center  pt-8 pb-6 px-[5vw]">
      <Link href="/transactions?account=All">
        <img src="transactions.svg" width={32} className="justify-self-start" />
      </Link>
      <h1 className="text-2xl text-center font-serif leading-none">Accounts</h1>
      <img src="edit.svg" width={30} className="justify-self-end" />
    </div>
  );
};

export default function AccountsPage() {
  return (
    <div>
      <TopBar />
      <div className="flex flex-col gap-2 items-center">
        <div className="w-9/10 h-16 flex justify-space-between gap-2">
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-green-400 text-white rounded-2xl">
            <p className="text-xs font-bold leading-none">Assets</p>
            <p className="text-lg leading-none">$5,980.28</p>
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-red-400 text-white rounded-2xl">
            <p className="text-xs font-bold leading-none">Liabilities</p>
            <p className="text-lg leading-none">$299.99</p>
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-zinc-800 text-white rounded-2xl">
            <p className="text-xs font-bold leading-none">Net Worth</p>
            <p className="text-lg leading-none">$5,680.29</p>
          </div>
        </div>
        <AccountsList {...accountsData} />
      </div>
    </div>
  );
}
