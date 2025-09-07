"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useState } from "react";
import AddTransactionIcon from "../../public/add-transaction.svg";

export const NavigationBar: React.FC<{ variant?: "glass" | "solid" }> = ({
  variant = "glass",
}) => {
  const page = usePathname().replace("/", "") || "home";
  // const [page, _] = useState("home");

  const baseVariants: Record<string, string> = {
    glass: "bg-white/60 border-white/80 glass-shadow",
    solid: "bg-white/90 border-gray-300",
  };

  const btnVariants: Record<string, string> = {
    glass: "bg-white/20 border-white/30",
    solid: "bg-[#f2f2f2] border-gray-300",
  };

  return (
    <div
      className={`${baseVariants[variant]} w-9/10 h-15 p-1.5 rounded-full border grid grid-cols-5 gap-2 justify-stretch fixed bottom-4 left-1/2 transform -translate-x-1/2
        `}
    >
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
        className={`flex items-center justify-center neumorphic-outset ${btnVariants[variant]}`}
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
