import { type Account, AccountsList } from "@/components/AccountsList";
import { TopBar } from "@/components/TopBar";

import * as accountsData from "@/data/accounts.json";

const accounts: { accounts: Account[] } = { ...accountsData };

export default function AccountsPage() {
  return (
    <div>
      <TopBar
        leftIcon="transactions.svg"
        leftLink="/transactions?account=0"
        title="Accounts"
        rightIcon="edit.svg"
        rightLink="/edit"
      />
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
        <AccountsList {...accounts} />
      </div>
    </div>
  );
}
