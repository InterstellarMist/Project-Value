import { CardContainer } from "./CardContainer";
import { Icon, InlineIcon } from "@iconify/react/dist/iconify.js";

const accounts: Record<string, string> = {
  "Cash": "fluent-emoji-flat:dollar-banknote",
  "Debit Card": "fluent-emoji-flat:credit-card",
  "Credit Card": "noto:credit-card",
};

const categories: Record<string, string> = {
  "Food": "fluent-emoji-flat:curry-rice",
  "Drink": "fluent-emoji-flat:bubble-tea",
  "Work": "fluent-emoji-flat:briefcase",
  "Rent": "fluent-emoji-flat:house",
};

export const TransactionEntry: React.FC<{ category: string, description: string, time: string, amount: string, account: string }> = ({ category, description, time, amount, account }) => {
  return (
    <div className="grid grid-rows-1 grid-cols-[36px_198px_85px] gap-[0.325rem] items-center">
      <div className="flex flex-col items-center">
        <Icon icon={categories[category]} width="2rem" />
        <p className="text-[0.5rem] font-light text-center">{category}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-lg leading-none">{description}</p>
        <p className="text-[0.5rem] font-light">{time}</p>
      </div>
      <div className="flex flex-col">
        <p className={`text-lg leading-none ${amount.startsWith('+') ? 'text-green-500' : 'text-red-500'} text-right`}>{amount}</p>
        <div className="flex flex-row gap-0.5 justify-end items-center">
          <p className="text-[0.5rem] font-light align-top block">{account}</p>
          <InlineIcon icon={accounts[account]} width="1rem" className="inline" />
        </div>
      </div>
    </div>
  );
}

export const RecentTransactions = () => {
  return (
    <CardContainer className="w-9/10">
      <h2 className="text-2xl leading-none font-serif">Recent Transactions<InlineIcon icon="material-symbols-light:arrow-right-alt-rounded" className="inline" /></h2>
      <div className="flex flex-col gap-1 mt-2">
        <TransactionEntry
          category="Food"
          description="Domino's Pizza Lunch"
          time="12:30 PM"
          amount="-$20.00"
          account="Cash"
        />
        <TransactionEntry
          category="Drink"
          description="Boba Tea"
          time="10:30 AM"
          amount="-$7.00"
          account="Debit Card"
        />
        <TransactionEntry
          category="Work"
          description="Work Income"
          time="Yesterday, 5:00 PM"
          amount="+$1500.00"
          account="Debit Card"
        />
        <TransactionEntry
          category="Rent"
          description="Rent Expense"
          time="August 30, 3:32 PM"
          amount="-$300.00"
          account="Debit Card"
        />
      </div>
    </CardContainer>
  );
};