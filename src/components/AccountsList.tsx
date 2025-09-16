"use client";
import Link from "next/link";
import useSWR from "swr";
import { getAllAccounts } from "@/data/SQLData";
import { useFilterStore } from "@/store/useFilterStore";
import type { Account } from "@/types/accounts";
import { CardContainer } from "./CardContainer";
import { AccountEmoji } from "./EmojiLoader";

// TODO: Temporary balance
const AccountCard = ({ acctId, name, amount, currency }: Account) => {
  const setFilter = useFilterStore((s) => s.setFilter);
  return (
    <Link
      key={acctId}
      href="/transactions"
      onClick={() => setFilter(acctId.toString())}
    >
      <CardContainer className="w-[33%-4px] flex flex-col items-center pt-0 pb-4">
        <AccountEmoji acctId={acctId} height="5em" width="5em" />
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

export const AccountsHomepage = () => {
  const { data: accounts, isLoading } = useSWR("/db/accounts", getAllAccounts);

  if (isLoading) return <p>Loading...</p>;
  if (!accounts) return <p>No data</p>;

  return (
    <div className="w-9/10 grid grid-cols-3 gap-2">
      {accounts
        .filter((account) => !account.hidden && account.acctType !== "root")
        .slice(0, 3) // TODO: Temporary Preview
        .map((account) => (
          <AccountCard key={account.acctId} {...account} />
        ))}
    </div>
  );
};

export const AccountsList = () => {
  const { data: accounts, isLoading } = useSWR("/db/accounts", getAllAccounts);

  if (isLoading) return <p>Loading...</p>;
  if (!accounts) return <p>No data</p>;

  return (
    <div className="w-9/10 flex flex-col gap-2 items-center">
      <h2 className="text-lg font-bold">Assets</h2>
      <div className="w-full grid grid-cols-3 gap-2">
        {accounts
          .filter((account) => account.acctType === "assets" && !account.hidden)
          .map((account) => (
            <AccountCard key={account.acctId} {...account} />
          ))}
      </div>
      <h2 className="text-lg font-bold">Liabilities</h2>
      <div className="w-full grid grid-cols-3 gap-2">
        {accounts
          .filter(
            (account) => account.acctType === "liabilities" && !account.hidden,
          )
          .map((account) => (
            <AccountCard key={account.acctId} {...account} />
          ))}
      </div>
      <h2 className="w-full text-lg text-center text-gray-500 border-t-1 border-gray-400 pt-1">
        Hidden from total
      </h2>
      <div className="w-full grid grid-cols-3 gap-2">
        {accounts
          .filter((account) => account.hidden)
          .map((account) => (
            <AccountCard key={account.acctId} {...account} />
          ))}
      </div>
    </div>
  );
};
