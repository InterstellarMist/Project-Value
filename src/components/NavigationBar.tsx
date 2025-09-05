"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOptimistic } from "react";
import AddTransactionIcon from "../../public/add-transaction.svg";

export const NavigationBar = () => {
  const page = usePathname().replace("/", "") || "home";
  // const [page, setPage] = useState("home");

  useOptimistic;

  return (
    <div className="w-9/10 h-15 p-1.5 rounded-full bg-white/90 border border-gray-300 grid grid-cols-5 gap-2 justify-stretch fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <Link
        href="/"
        className={`flex items-center justify-center ${
          page === "home" ? "neumorphic-inset" : ""
        }`}
      >
        <Image src="home.svg" alt="Home" width={30} height={30} />
      </Link>
      <Link
        href="/accounts"
        className={`flex items-center justify-center ${
          page === "accounts" ? "neumorphic-inset" : ""
        }`}
      >
        <Image src="accounts.svg" alt="Accounts" width={30} height={30} />
      </Link>
      <Link
        href="/add-transaction"
        className="flex items-center justify-center neumorphic-outset"
      >
        <AddTransactionIcon className="text-blue-700 w-[30px] drop-shadow-[2px_2px_1px_rgba(0,0,0,0.3)]" />
      </Link>
      <Link
        href="/dashboard"
        className={`flex items-center justify-center ${
          page === "dashboard" ? "neumorphic-inset" : ""
        }`}
      >
        <Image src="dashboard.svg" alt="Dashboard" width={30} height={30} />
      </Link>
      <Link
        href="/settings"
        className={`flex items-center justify-center ${
          page === "settings" ? "neumorphic-inset" : ""
        }`}
      >
        <Image src="settings.svg" alt="Settings" width={30} height={30} />
      </Link>
    </div>
  );
};
