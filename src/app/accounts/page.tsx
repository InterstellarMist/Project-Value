import { AccountCard } from "@/components/AccountCard";

const TopBar = () => {
  return (
    <div className="grid grid-cols-[20%_60%_20%] items-center  pt-8 pb-6 px-[5vw]">
      <img src="transactions.svg" width={32} className="justify-self-start" />
      <h1 className="text-2xl text-center font-serif leading-none">Accounts</h1>
      <img src="edit.svg" width={30} className="justify-self-end" />
    </div>
  );
};

export default function Accounts() {
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
        <p className="text-lg font-bold">Assets</p>
        <div className="w-9/10 grid grid-cols-3 gap-2">
          <AccountCard icon="fluent-emoji-flat:dollar-banknote" title="Cash" amount="$1,347.05" />
          <AccountCard icon="fluent-emoji-flat:credit-card" title="Debit Card" amount="$4,633.23" />
        </div>
        <p className="text-lg font-bold">Liabilities</p>
        <div className="w-9/10 grid grid-cols-3 gap-2">
          <AccountCard icon="noto:credit-card" title="Credit Card" amount="$299.99" />
        </div>
        <p className="w-9/10 text-lg text-center text-gray-500 border-t-2 pt-1">Hidden from total</p>
        <div className="w-9/10 grid grid-cols-3 gap-2">
          <AccountCard icon="fluent-emoji-flat:money-bag" title="Loans" amount="$21,552.23" />
        </div>
      </div>
    </div >
  );
}
