import { InlineIcon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { accountNames } from "@/data/accounts";
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
  const grouped = Object.groupBy(transactions, ({ time }) =>
    new Date(time).toLocaleDateString([], {
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
              <CardContainer key={transaction.txnId} className="py-2 px-3">
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
  type,
  postings,
  description,
  time,
  isHome = false,
}: Transaction & { isHome?: boolean }) => {
  const sortedPostings = postings.toSorted((a, b) => a.amount - b.amount);

  const left =
    type === "income" || type === "transfer"
      ? sortedPostings.at(0)
      : sortedPostings.at(-1);
  const right =
    type === "expense" ? sortedPostings.at(0) : sortedPostings.at(-1);

  const amount = right?.amount ?? 0;
  const currency = right?.currency ?? "USD";

  return (
    <div className="grid grid-rows-1 grid-cols-[12%_60%_28%] items-center">
      <AccountEmojiWithText
        accountId={left?.accountId ?? 1}
        width="2rem"
        height="2rem"
        className="justify-self-start"
      />
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
          <p className="text-[0.5rem] font-light align-top block">
            {accountNames[right?.accountId ?? 1]}
          </p>
          <AccountEmoji
            accountId={right?.accountId ?? 1}
            inline
            width="1rem"
            height="1rem"
            className="inline"
          />
        </div>
      </div>
    </div>
  );
};

const filterTransaction = (transaction: Transaction, account: number) => {
  if (account === 0) return true;
  return transaction.postings.reduce((acc, posting) => {
    return acc || posting.accountId === account;
  }, false);
};

export const TransactionsList = ({
  transactions,
  filter,
}: {
  transactions: Transaction[];
  filter: string;
}) => {
  const account = parseInt(filter, 10);
  console.log(filter);
  return (
    <div className="w-9/10 flex flex-col gap-4">
      {renderTransactionsByDate(
        transactions
          .filter((transaction) => filterTransaction(transaction, account))
          .toSorted(
            (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
          ),
      )}
    </div>
  );
};

export const RecentTransactions = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <CardContainer className="w-9/10">
      <h2 className="text-2xl leading-none font-serif">
        Recent Transactions
        <Link href="/transactions?account=0">
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
            <TransactionEntry key={transaction.txnId} {...transaction} isHome />
          ))}
      </div>
    </CardContainer>
  );
};
