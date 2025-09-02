"use client"
import AddTransactionIcon from "../../public/add-transaction.svg";
import Link from "next/link"
import { useState } from "react";

export const NavigationBar = () => {
  const [page, setPage] = useState("home");

  return (
    <div className="w-9/10 h-15 p-1.5 rounded-full bg-white/90 border border-gray-300 grid grid-cols-5 gap-2 justify-stretch fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <Link
        href="/"
        onClick={() => setPage("home")}
        className={`flex items-center justify-center ${page == 'home' ? 'neumorphic-inset' : ''}`}
      >
        <img src="home.svg" width={30} />
      </Link>
      <Link
        href="/accounts"
        onClick={() => setPage("accounts")}
        className={`flex items-center justify-center ${page == 'accounts' ? 'neumorphic-inset' : ''}`}
      >
        <img src="accounts.svg" width={30} />
      </Link>
      <Link href="/" className="flex items-center justify-center neumorphic-outset">
        <AddTransactionIcon className="text-blue-700 w-[30px] drop-shadow-[2px_2px_1px_rgba(0,0,0,0.3)]" />
      </Link>
      <Link
        href="/dashboard"
        onClick={() => setPage("dashboard")}
        className={`flex items-center justify-center ${page == 'dashboard' ? 'neumorphic-inset' : ''}`}
      >
        <img src="dashboard.svg" width={30} />
      </Link>
      <Link
        href="/settings"
        onClick={() => setPage("settings")}
        className={`flex items-center justify-center ${page == 'settings' ? 'neumorphic-inset' : ''}`}
      >
        <img src="settings.svg" width={30} />
      </Link>
    </div>
  );
}