"use client";
import {
  BellRing,
  ChevronRight,
  CircleDollarSign,
  CircleUserRound,
  Download,
  Info,
  Languages,
  SunMoon,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { CardContainer } from "@/components/CardContainer";
import { TopBar } from "@/components/TopBar";
import { Switch } from "@/components/ui/switch";
import { useSetting } from "@/store/userSettingsStore";
import { capitalize } from "@/lib/utils";
import { CurrencyComboboxInput } from "@/components/input/CurrencyComboboxInput";
import { useState } from "react";

export default function Settings() {
  const settings = useSetting;
  console.log(settings);

  const language = new Intl.DisplayNames("en", {
    type: "language",
    languageDisplay: "standard",
  }).of(settings.language());
  // const currency = settings.currency();

  const notification = settings.notification();
  const setNotification = settings.setNotification();

  const theme = settings.theme();

  // const [value, setValue] = useState("USD");

  // console.log(settings.currency());

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
        <div className="flex gap-4 items-center">
          <CircleDollarSign />
          <div className="flex-1">
            <p className="text-lg">Default Currency</p>
          </div>
          <div className="h-full px-2 flex justify-center border-2 border-gray-700 rounded-md">
            {settings.currency()}
          </div>
          <CurrencyComboboxInput
            value={settings.currency()}
            onChange={settings.setCurrency()}
          />
        </div>
      </CardContainer>
      <CardContainer className="w-9/10 p-6 flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <BellRing />
          <div className="flex-1">
            <p className="text-lg">Notification</p>
          </div>
          <Switch checked={notification} onCheckedChange={setNotification} />
        </div>
        <div className="flex gap-4 items-center">
          <Languages />
          <div className="flex-1">
            <p className="text-lg">Language</p>
          </div>
          <div className="h-full px-2 flex justify-center border-2 border-gray-700 rounded-md">
            {language}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <SunMoon />
          <div className="flex-1">
            <p className="text-lg">Appearance</p>
          </div>
          <div className="h-full px-2 flex justify-center border-2 border-gray-700 rounded-md">
            {capitalize(theme)}
          </div>
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
