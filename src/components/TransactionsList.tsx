"use client";
import { InlineIcon } from "@iconify/react";
import Link from "next/link";
import useSWR from "swr";
import {
  getAccNames,
  getAccTransactions,
  getAllTransactions,
  getTxnPostings,
} from "@/data/SQLData";
import { useFilterStore } from "@/store/useFilterStore";
import { useTxnStore } from "@/store/useTxnStore";
import type { Transaction } from "@/types/transaction";
import { CardContainer } from "./CardContainer";
import { AccountEmoji, AccountEmojiWithText } from "./EmojiLoader";

const datetimeFormatter = (time: string, isHome: boolean) => {
  return new Date(time).toLocaleString(
    [],
    isHome
      ? {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }
      : { timeStyle: "short" },
  );
};

// Render transactions by date
const renderTransactionsByDate = (transactions: Transaction[]) => {
  const grouped = Object.groupBy(transactions, ({ date }) =>
    new Date(date).toLocaleDateString([], {
      month: "long",
      day: "numeric",
    }),
  );

  if (Object.keys(grouped).length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        No Transactions Yet...
      </div>
    );
  }

  return (
    <>
      {Object.entries(grouped).map(([date, transactions]) => (
        <div key={date}>
          <h3 className="text-lg font-semibold text-center mb-2">{date}</h3>
          <div className="flex flex-col gap-4">
            {transactions?.map((transaction) => (
              <CardContainer
                key={transaction.txnId}
                className="flex flex-col w-full h-16 py-0 px-3 justify-center"
              >
                <TransactionEntry {...transaction} />
              </CardContainer>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export const TransactionEntry = ({
  isHome = false,
  ...transaction
}: Transaction & { isHome?: boolean }) => {
  const { txnId, txnType, description, date } = transaction;
  // Fetch data from db
  const { data: accNames } = useSWR("/db/account/names", getAccNames);
  const { data: postings, isLoading } = useSWR(
    ["/db/posting", txnId],
    getTxnPostings,
  );

  // Transaction store
  const setTxnSelected = useTxnStore((s) => s.setTxnSelected);

  if (isLoading) return <p>Loading...</p>;
  if (!postings) return <p>No data</p>;

  const left =
    txnType === "income" || txnType === "transfer"
      ? postings.at(0)
      : postings.at(-1);
  const right = txnType === "expense" ? postings.at(0) : postings.at(-1);

  const amount = right?.amount ?? 0;
  const currency = right?.currency ?? "USD";

  return (
    <Link
      href="/edit-transaction"
      onClick={() => {
        setTxnSelected({
          transaction: transaction,
          postings: postings,
        });
      }}
    >
      <div className="flex items-center w-full" key={txnId}>
        <AccountEmojiWithText
          acctId={left?.acctId ?? 1}
          width="2em"
          height="2em"
          className="flex-none w-10 mr-2"
          textStyle="max-w-full overflow-hidden leading-2"
        />
        <div className="flex flex-col flex-auto">
          <p className="text-lg leading-none">{description}</p>
          <p className="text-[0.5rem] font-light">
            {datetimeFormatter(date, isHome)}
          </p>
        </div>
        <div className="flex flex-col flex-none">
          <p
            className={`text-lg leading-none ${
              amount < 0 ? "text-red-500" : "text-green-500"
            } text-right`}
          >
            {amount > 0 ? "+" : ""}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currency,
            }).format(amount)}
          </p>
          <div className="flex flex-row gap-0.5 justify-end items-center">
            <p className="text-[0.5rem] font-light align-top block">
              {accNames ? accNames[right?.acctId ?? 1] : "All Accounts"}
            </p>
            <AccountEmoji
              acctId={right?.acctId ?? 1}
              inline
              width="1em"
              height="1em"
              className="inline"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export const TransactionsList = () => {
  const filter = useFilterStore((s) => s.filter);
  const account = parseInt(filter, 10);
  const { data: transactions, isLoading } = useSWR(
    ["/db/transactions", account],
    getAccTransactions,
  );

  if (isLoading) return <p>Loading...</p>;
  if (!transactions) return <p>No data</p>;

  return (
    <div className="w-9/10 flex flex-col gap-4">
      {renderTransactionsByDate(transactions)}
    </div>
  );
};

export const RecentTransactions = () => {
  const setFilter = useFilterStore((s) => s.setFilter);
  const { data: transactions, isLoading } = useSWR(
    "/db/transactions",
    getAllTransactions,
  );

  if (isLoading) return <p>Loading...</p>;
  if (!transactions) return <p>No data</p>;

  return (
    <CardContainer className="w-9/10">
      <h2 className="text-2xl leading-none font-serif">
        Recent Transactions
        <Link
          href="/transactions"
          onClick={() => {
            setFilter("0");
          }}
        >
          <InlineIcon
            icon="material-symbols-light:arrow-right-alt-rounded"
            className="inline"
          />
        </Link>
      </h2>
      <div className="flex flex-col gap-1 mt-2">
        {transactions.slice(0, 5).map((transaction) => (
          <TransactionEntry key={transaction.txnId} {...transaction} isHome />
        ))}
      </div>
    </CardContainer>
  );
};
