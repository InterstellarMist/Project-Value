"use client";
import { TopBar } from "@/components/TopBar";

export default function AddTransactionPage() {
  return (
    <div>
      <TopBar
        leftIcon="close.svg"
        leftLink="/transactions"
        title="Add Transaction"
        rightIcon="check.svg"
        rightLink="/transactions"
      />
      <div className="flex flex-col items-center justify-center gap-4 pb-24">
        Add Transaction Page
      </div>
    </div>
  );
}
