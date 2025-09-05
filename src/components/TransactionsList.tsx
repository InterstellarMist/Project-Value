import { InlineIcon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import type React from "react";
import { CardContainer } from "./CardContainer";
import { AccountEmoji, CategoryEmoji } from "./EmojiLoader";

interface Transaction {
  id: string;
  category: string;
  account: string;
  amount: number;
  currency: string;
  description: string;
  time: string;
}

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
  const grouped = transactions.reduce(
    (acc, transaction) => {
      const date = new Date(transaction.time).toLocaleDateString([], {
        month: "long",
        day: "numeric",
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    },
    {} as Record<string, Transaction[]>,
  );

  // if (Object.keys(grouped).length === 0) {
  //   return (
  //     <div className="text-center text-gray-500 mt-4">No Transactions</div>
  //   );
  // }

  return (
    <>
      {Object.entries(grouped).map(([date, transactions]) => (
        <div key={date}>
          <h3 className="text-lg font-semibold text-center mb-2">{date}</h3>
          <div className="flex flex-col gap-4">
            {transactions.map((transaction) => (
              <CardContainer key={transaction.id} className="py-2 px-3">
                <TransactionEntry {...transaction} />
              </CardContainer>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export const TransactionEntry: React.FC<{
  category: string;
  account: string;
  amount: number;
  currency: string;
  description: string;
  time: string;
  isHome?: boolean;
}> = ({
  category,
  description,
  time,
  amount,
  account,
  currency,
  isHome = false,
}) => {
  return (
    <div className="grid grid-rows-1 grid-cols-[12%_60%_28%] items-center">
      <div className="flex flex-col items-center justify-self-start">
        <CategoryEmoji category={category} width="2rem" />
        <p className="text-[0.5rem] font-light text-center">{category}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-lg leading-none">{description}</p>
        <p className="text-[0.5rem] font-light">
          {datetimeFormatter(time, isHome)}
        </p>
      </div>
      <div className="flex flex-col">
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
          <p className="text-[0.5rem] font-light align-top block">{account}</p>
          <AccountEmoji
            account={account}
            inline
            width="1rem"
            className="inline"
          />
        </div>
      </div>
    </div>
  );
};

export const TransactionsList: React.FC<{
  transactions: Transaction[];
  account?: string | null;
}> = ({ transactions, account = "All" }) => {
  return (
    <div className="w-9/10 flex flex-col gap-4">
      {renderTransactionsByDate(
        transactions
          .filter(
            (transaction) =>
              account === "All" || transaction.account === account,
          )
          .toSorted(
            (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
          ),
      )}
    </div>
  );
};

export const RecentTransactions: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  return (
    <CardContainer className="w-9/10">
      <h2 className="text-2xl leading-none font-serif">
        Recent Transactions
        <Link href="/transactions?account=All">
          <InlineIcon
            icon="material-symbols-light:arrow-right-alt-rounded"
            className="inline"
          />
        </Link>
      </h2>
      <div className="flex flex-col gap-1 mt-2">
        {transactions
          .slice(0, 5)
          .toSorted(
            (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
          )
          .map((transaction) => (
            <TransactionEntry key={transaction.id} {...transaction} isHome />
          ))}
      </div>
    </CardContainer>
  );
};
