import { TopBar } from "@/components/TopBar";
import { TransactionForm } from "@/components/TransactionForm";

export default function AddTransactionPage() {
  return (
    <div className="flex flex-col items-center gap-8 pb-24">
      <TopBar leftIcon="back-button" title="Add Transaction" />
      <TransactionForm />
    </div>
  );
}
