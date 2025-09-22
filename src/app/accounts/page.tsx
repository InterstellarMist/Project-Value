import { AccountSummary, AccountsList } from "@/components/AccountsList";
import { TopBar } from "@/components/TopBar";

export default function AccountsPage() {
  return (
    <div className="flex flex-col gap-4 items-center pb-24">
      <TopBar
        leftIcon="transactions-button"
        title="Accounts"
        rightIcon="edit-accounts-button"
      />
      <AccountSummary />
      <AccountsList />
    </div>
  );
}
