import { AccountCard } from "@/components/AccountCard";
import { CardContainer } from "@/components/CardContainer";
import { RecentTransactions } from "@/components/RecentTransactions";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Home() {
  return (
    <>
      <div className="min-h-screen">
        <div className="blurry-bg"></div>
        <div className="flex flex-col gap-4 items-center h-screen">
          <div className="flex self-start items-center m-4 gap-2">
            <Icon icon="stash:user-avatar-light" width={64} />
            <div className="flex flex-col">
              <span className="font-serif text-gray-500">Welcome back,</span>
              <span className="font-serif text-3xl/7">Nicholas Chai</span>
            </div>
          </div>
          <CardContainer className="w-9/10 flex flex-col gap-4">
            <h2 className="text-2xl/6 font-serif">Net Worth</h2>
            <h1 className="text-6xl text-center font-light">$5,680.29</h1>
          </CardContainer>
          <div className="flex w-9/10 justify-between">
            <AccountCard icon="fluent-emoji-flat:dollar-banknote" title="Cash" amount="$1,347.05" />
            <AccountCard icon="fluent-emoji-flat:credit-card" title="Debit Card" amount="$4,633.23" />
            <AccountCard icon="noto:credit-card" title="Credit Card" amount="$299.99" />
          </div>
          <RecentTransactions />
        </div>
      </div>
    </>
  );
}