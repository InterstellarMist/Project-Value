"use client";
import Link from "next/link";
import { useFilterStore } from "@/store/useFilterStore";
import type { Account } from "@/types/accounts";
import { CardContainer } from "./CardContainer";
import { AccountEmoji } from "./EmojiLoader";

// TODO: Temporary balance
export const AccountCard = ({ accountId, name, amount, currency }: Account) => {
  const setFilter = useFilterStore((s) => s.setFilter);
  return (
    <Link href="/transactions" onClick={() => setFilter(accountId.toString())}>
      <CardContainer className="w-[33%-4px] flex flex-col items-center pt-0 pb-4">
        <AccountEmoji accountId={accountId} height="5em" width="5em" />
        <p className="font-semibold text-xs">{name}</p>
        <p className="font-light text-lg mt-2 leading-none">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
          }).format(amount ?? 0)}
        </p>
      </CardContainer>
    </Link>
  );
};

export const AccountsHomepage = ({ accounts }: { accounts: Account[] }) => {
  return (
    <div className="w-9/10 grid grid-cols-3 gap-2">
      {accounts
        .filter((account) => !account.hidden && account.type !== "root")
        .slice(0, 3) // TODO: Temporary Preview
        .map((account) => (
          <AccountCard key={account.accountId} {...account} />
        ))}
    </div>
  );
};

export const AccountsList = ({ accounts }: { accounts: Account[] }) => {
  return (
    <div className="w-9/10 flex flex-col gap-2 items-center">
      <h2 className="text-lg font-bold">Assets</h2>
      <div className="w-full grid grid-cols-3 gap-2">
        {accounts
          .filter((account) => account.type === "assets" && !account.hidden)
          .map((account) => (
            <AccountCard key={account.accountId} {...account} />
          ))}
      </div>
      <h2 className="text-lg font-bold">Liabilities</h2>
      <div className="w-full grid grid-cols-3 gap-2">
        {accounts
          .filter(
            (account) => account.type === "liabilities" && !account.hidden,
          )
          .map((account) => (
            <AccountCard key={account.accountId} {...account} />
          ))}
      </div>
      <h2 className="w-full text-lg text-center text-gray-500 border-t-1 border-gray-400 pt-1">
        Hidden from total
      </h2>
      <div className="w-full grid grid-cols-3 gap-2">
        {accounts
          .filter((account) => account.hidden)
          .map((account) => (
            <AccountCard key={account.accountId} {...account} />
          ))}
      </div>
    </div>
  );
};
