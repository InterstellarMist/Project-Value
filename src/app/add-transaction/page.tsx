import { TopBar } from "@/components/TopBar";
import { TransactionForm } from "@/components/TransactionForm";

export default function AddTransactionPage() {
  return (
    <div>
      <TopBar leftIcon="back-button" title="Add Transaction" />
      <div className="flex flex-col items-center justify-center gap-8 pb-24">
        <TransactionForm />
      </div>
    </div>
  );
}
