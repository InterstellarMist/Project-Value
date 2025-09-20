import { AccountSummary, AccountsList } from "@/components/AccountsList";
import { TopBar } from "@/components/TopBar";

export default function AccountsPage() {
  return (
    <div>
      <TopBar
        leftIcon="transactions-button"
        title="Accounts"
        rightIcon="edit.svg"
        rightLink="/edit"
      />
      <div className="flex flex-col gap-2 items-center pb-24">
        <AccountSummary />
        <AccountsList />
      </div>
    </div>
  );
}
