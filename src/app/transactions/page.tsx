import { AccountsDropdown } from "@/components/dropdowns/AccountsDropdown";
import { TopBar } from "@/components/TopBar";
import { TransactionsList } from "@/components/TransactionsList";

export default function TransactionPage() {
  return (
    <div className="flex flex-col gap-4 items-center h-screen">
      <TopBar
        leftIcon="back-button"
        title="Transactions"
        rightIcon="filter-button"
      />
      <AccountsDropdown />
      <TransactionsList />
    </div>
  );
}
