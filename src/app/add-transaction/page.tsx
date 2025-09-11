"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TransactionForm } from "@/components/TransactionForm";

const TopBar = () => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-[20%_60%_20%] items-center pt-8 pb-4 px-[5vw]">
      <button
        type="button"
        className="justify-self-start cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <Image src="close.svg" alt="back" width={32} height={32} />
      </button>
      <h1 className="text-2xl text-center font-serif leading-none select-none">
        Add Transaction
      </h1>
    </div>
  );
};

export default function AddTransactionPage() {
  return (
    <div>
      <TopBar />
      <div className="flex flex-col items-center justify-center gap-8 pb-24">
        <TransactionForm />
      </div>
    </div>
  );
}
