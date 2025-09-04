import { CardContainer } from "./CardContainer";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { AccountEmoji } from "./EmojiLoader";

interface Account {
  id: string;
  name: string;
  type: string;
  amount: number;
  currency: string;
  hidden: boolean;
}

interface AccountsListProps {
  accounts: Account[];
}

export const AccountCard: React.FC<{
  id: string;
  name: string;
  amount: number;
  currency: string;
}> = ({ id, name, amount, currency }) => {
  return (
    <Link href={`/transactions?account=${name}`}>
      {" "}
      {/* TODO: Use ID */}
      <CardContainer className="w-[33%-4px] flex flex-col items-center pt-0 pb-4">
        <AccountEmoji account={name} height="5rem" />
        <p className="font-semibold text-xs">{name}</p>
        <p className="font-light text-lg mt-2 leading-none">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
          }).format(amount)}
        </p>
      </CardContainer>
    </Link>
  );
};

export const AccountsHomepage: React.FC<AccountsListProps> = ({ accounts }) => {
  return (
    <div className="w-9/10 grid grid-cols-3 gap-2">
      {accounts
        .filter((account) => !account.hidden)
        .slice(0, 3) // TODO: Temporary Preview
        .map((account) => (
          <AccountCard key={account.id} {...account} />
        ))}
    </div>
  );
};

export const AccountsList: React.FC<AccountsListProps> = ({ accounts }) => {
  return (
    <div className="w-9/10 flex flex-col gap-2 items-center">
      <h2 className="text-lg font-bold">Assets</h2>
      <div className="w-full grid grid-cols-3 gap-2">
        {accounts
          .filter((account) => account.type === "asset" && !account.hidden)
          .map((account) => (
            <AccountCard key={account.id} {...account} />
          ))}
      </div>
      <h2 className="text-lg font-bold">Liabilities</h2>
      <div className="w-full grid grid-cols-3 gap-2">
        {accounts
          .filter((account) => account.type === "liability" && !account.hidden)
          .map((account) => (
            <AccountCard key={account.id} {...account} />
          ))}
      </div>
      <h2 className="w-full text-lg text-center text-gray-500 border-t-1 border-gray-400 pt-1">
        Hidden from total
      </h2>
      <div className="w-full grid grid-cols-3 gap-2">
        {accounts
          .filter((account) => account.hidden)
          .map((account) => (
            <AccountCard key={account.id} {...account} />
          ))}
      </div>
    </div>
  );
};
