"use client";
import { CategoryPicker } from "@/components/CategoryPicker";
import { TopBar } from "@/components/TopBar";

export default function AddTransactionPage() {
  return (
    <div>
      <TopBar
        leftIcon="close.svg"
        leftLink="/transactions?account=0"
        title="Add Transaction"
        rightIcon="check.svg"
        rightLink="/transactions?account=0"
      />
      <div className="flex flex-col items-center justify-center gap-4 pb-24">
        <CategoryPicker />
      </div>
    </div>
  );
}
