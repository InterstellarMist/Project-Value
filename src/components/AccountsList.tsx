"use client";
import Link from "next/link";
import useSWR from "swr";
import {
  getAccountType,
  getAllAccounts,
  getBalanceSheet,
  getBalanceSummary,
} from "@/data/SQLData";
import {
  useAccountFilterStore,
  useAcctTypeFilterStore,
} from "@/store/dropdownStores";
import { useDrawerState } from "@/store/uiStateStores";
import { useAcctStore } from "@/store/useAcctStore";
import type { Account } from "@/types/accounts";
import { CardContainer } from "./CardContainer";
import { AccountEmoji, AccountEmojiWithText } from "./EmojiLoader";

export const NetWorthHomepage = () => {
  const { data: balances, isLoading } = useSWR(
    "/db/balance/summary",
    getBalanceSummary,
  );

  if (isLoading) return <p>Loading...</p>;
  if (!balances) return <p>No data</p>;
  const assets = balances.assets ?? 0;
  const liabilities = balances.liabilities ?? 0;

  return (
    <CardContainer className="w-9/10 flex flex-col gap-4">
      <h2 className="text-2xl leading-none font-serif">Net Worth</h2>
      <h1 className="text-6xl text-center font-light">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(assets + liabilities)}
      </h1>
    </CardContainer>
  );
};

export const AccountSummary = () => {
  const { data: balances, isLoading } = useSWR(
    "/db/balance/summary",
    getBalanceSummary,
  );

  if (isLoading) return <p>Loading...</p>;
  if (!balances) return <p>No data</p>;
  const assets = balances.assets ?? 0;
  const liabilities = balances.liabilities ? -balances.liabilities : 0;

  return (
    <div className="w-9/10 h-16 flex justify-space-between gap-2">
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-green-400 text-white rounded-2xl">
        <p className="text-xs font-bold leading-none">Assets</p>
        <p className="text-lg leading-none">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(assets)}
        </p>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-red-400 text-white rounded-2xl">
        <p className="text-xs font-bold leading-none">Liabilities</p>
        <p className="text-lg leading-none">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(liabilities)}
        </p>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-zinc-800 text-white rounded-2xl">
        <p className="text-xs font-bold leading-none">Net Worth</p>
        <p className="text-lg leading-none">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(assets + liabilities)}
        </p>
      </div>
    </div>
  );
};

const AccountCard = ({ acctId, acctTypeId, name, currency }: Account) => {
  const setFilter = useAccountFilterStore((s) => s.setFilter);
  const { data: balances, isLoading } = useSWR("/db/balances", getBalanceSheet);

  if (isLoading) return <p>Loading...</p>;
  if (!balances) return <p>No data</p>;

  // Prettify output: negate liabilities, zero empty accounts
  const balance =
    (acctTypeId === 2 && balances[acctId] !== undefined ? -1 : 1) *
    (balances[acctId] ?? 0);

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
          }).format(balance)}
        </p>
      </CardContainer>
    </Link>
  );
};

export const AccountsHomepage = () => {
  const { data: accounts, isLoading } = useSWR(
    "/db/accounts/all",
    getAllAccounts,
  );

  if (isLoading) return <p>Loading...</p>;
  if (!accounts) return <p>No data</p>;

  return (
    <div className="w-9/10 grid grid-cols-3 gap-2">
      {accounts
        .filter((account) => !account.hidden && account.icon)
        .slice(0, 3) // TODO: Temporary Preview
        .map((account) => (
          <AccountCard key={account.acctId} {...account} />
        ))}
    </div>
  );
};

// TODO: Update accounts fetching
export const AccountsList = () => {
  const { data: accounts, isLoading } = useSWR(
    "/db/accounts/all",
    getAllAccounts,
  );

  if (isLoading) return <p>Loading...</p>;
  if (!accounts) return <p>No data</p>;

  return (
    <div className="w-9/10 flex flex-col gap-4 items-center">
      <h2 className="text-lg font-bold">Assets</h2>
      <div className="w-full grid grid-cols-3 gap-2">
        {accounts
          .filter(
            (account) =>
              account.acctTypeId === 1 && !account.hidden && account.icon,
          )
          .map((account) => (
            <AccountCard key={account.acctId} {...account} />
          ))}
      </div>
      <h2 className="text-lg font-bold">Liabilities</h2>
      <div className="w-full grid grid-cols-3 gap-2">
        {accounts
          .filter(
            (account) =>
              account.acctTypeId === 2 && !account.hidden && account.icon,
          )
          .map((account) => (
            <AccountCard key={account.acctId} {...account} />
          ))}
      </div>
      <h2 className="w-full text-lg text-center text-gray-500 border-t-1 border-gray-400 pt-1 mt-4">
        Hidden from total
      </h2>
      <div className="w-full grid grid-cols-3 gap-2">
        {accounts
          .filter((account) => account.hidden && account.icon)
          .map((account) => (
            <AccountCard key={account.acctId} {...account} />
          ))}
      </div>
    </div>
  );
};

export const ManageAccountsList = () => {
  const acctTypeId = Number(useAcctTypeFilterStore((s) => s.filter));
  const setAcctSelected = useAcctStore((s) => s.setAcctSelected);
  const setOpenDrawer = useDrawerState((s) => s.setOpenDrawer);

  const { data: accounts, isLoading } = useSWR(
    ["/db/accounts", acctTypeId],
    getAccountType,
  );

  if (isLoading) return <p>Loading...</p>;
  if (!accounts) return <p>No data</p>;

  const uncategorized = accounts[0].children.filter(
    (acc) => acc.children.length === 0 && acc.icon,
  );

  return (
    <div className="w-[calc(90%+2rem)] flex flex-col gap-4 flex-1 overflow-y-auto pb-24 px-4">
      {accounts[0].children
        .filter((categoryNode) => !categoryNode.icon)
        .map((categoryNode) => (
          <div key={categoryNode.acctId} className="flex flex-col items-center">
            <h2 className="text-lg font-bold text-center mb-2">
              {categoryNode.name}
            </h2>
            <CardContainer className="w-full min-h-30 grid grid-cols-4 gap-y-2 px-0 py-2 place-items-center">
              {categoryNode.children.map((acc) => (
                <button
                  key={acc.acctId}
                  type="button"
                  onClick={() => {
                    setAcctSelected(acc);
                    setOpenDrawer(true, true);
                  }}
                  className="h-full cursor-pointer hover:bg-black/10 active:bg-white/70 rounded-2xl p-1"
                >
                  <AccountEmojiWithText
                    acctId={acc.acctId}
                    width={64}
                    height={64}
                    className="gap-1 w-18"
                    textStyle="text-xs font-bold"
                  />
                </button>
              ))}
            </CardContainer>
          </div>
        ))}
      {uncategorized.length > 0 && (
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold text-center mb-2">Uncategorized</h2>
          <CardContainer className="w-full min-h-30 grid grid-cols-4 gap-y-2 px-0 py-2 place-items-center">
            {uncategorized.map((acc) => (
              <button
                key={acc.acctId}
                type="button"
                onClick={() => {
                  setAcctSelected(acc);
                  setOpenDrawer(true, true);
                }}
                className="h-full cursor-pointer hover:bg-black/10 active:bg-white/70 rounded-2xl p-1"
              >
                <AccountEmojiWithText
                  acctId={acc.acctId}
                  width={64}
                  height={64}
                  className="gap-1 w-18"
                  textStyle="text-xs font-bold"
                />
              </button>
            ))}
          </CardContainer>
        </div>
      )}
    </div>
  );
};
