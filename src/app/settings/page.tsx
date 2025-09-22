import {
  BellRing,
  ChevronRight,
  CircleUserRound,
  Download,
  Info,
  Moon,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { CardContainer } from "@/components/CardContainer";
import { TopBar } from "@/components/TopBar";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="flex flex-col gap-6 items-center pb-24">
      <TopBar title="Settings" />
      <CardContainer className="w-9/10 py-3 px-6 flex items-center gap-3">
        <CircleUserRound size={64} strokeWidth={1} />
        <div className="flex flex-col gap-1 flex-1">
          <h1 className="text-2xl font-serif leading-none select-none">
            Nicholas Chai
          </h1>
          <p className="text-xs text-[#7c7c7c]">Last Synced 10:47 PM</p>
        </div>
        <ChevronRight />
      </CardContainer>
      <CardContainer className="w-9/10 p-6 flex flex-col gap-6 ">
        <Link
          href="/settings/manage-accounts"
          // className="hover:bg-gray-500/50 transition-colors"
        >
          <div className="flex gap-4 items-center">
            <Wallet />
            <div className="flex-1">
              <p className="text-lg">Manage Accounts</p>
            </div>
            <ChevronRight />
          </div>
        </Link>
        <div className="flex gap-4 items-center">
          <Download />
          <div className="flex-1">
            <p className="text-lg">Import/Export Data</p>
          </div>
          <ChevronRight />
        </div>
      </CardContainer>
      <CardContainer className="w-9/10 p-6 flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <BellRing />
          <div className="flex-1">
            <p className="text-lg">Notification</p>
          </div>
          <Switch />
        </div>
        <div className="flex gap-4 items-center">
          <Moon />
          <div className="flex-1">
            <p className="text-lg">Dark Mode</p>
          </div>
          <Switch />
        </div>
        <div className="flex gap-4 items-center">
          <Info />
          <div className="flex-1">
            <p className="text-lg">About App</p>
          </div>
          <ChevronRight />
        </div>
      </CardContainer>
    </div>
  );
}
