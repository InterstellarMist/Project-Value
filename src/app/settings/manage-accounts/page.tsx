"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { CardContainer } from "@/components/CardContainer";
import { AccountEmoji } from "@/components/EmojiLoader";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AcctTypeDropdown } from "@/components/dropdowns/AcctTypeDropdown";
import { TopBar } from "@/components/TopBar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIconCategories, searchIcons } from "@/data/iconifyFetch";

interface AccEmojis {
  name: string;
  icon: string;
}

const data: Record<string, AccEmojis[]> = {
  Food: [
    { name: "Restaurant", icon: "fluent-emoji-flat:curry-rice" },
    { name: "Drink", icon: "fluent-emoji-flat:bubble-tea" },
    { name: "Snack", icon: "fluent-emoji-flat:hot-dog" },
    { name: "Grocery", icon: "fluent-emoji-flat:shopping-cart" },
  ],
  Utilities: [
    { name: "Rent", icon: "fluent-emoji-flat:house" },
    { name: "Water", icon: "fluent-emoji-flat:droplet" },
    { name: "Electricity", icon: "fluent-emoji-flat:high-voltage" },
    { name: "Internet", icon: "fluent-emoji-flat:wireless" },
  ],
  Transportation: [
    { name: "Commute", icon: "fluent-emoji-flat:light-rail" },
    { name: "Gas", icon: "fluent-emoji-flat:fuel-pump" },
    { name: "Maintenance", icon: "fluent-emoji-flat:wrench" },
  ],
  Personal: [
    { name: "Clothes", icon: "fluent-emoji-flat:coat" },
    { name: "Shopping", icon: "fluent-emoji-flat:shopping-bags" },
    { name: "Subscriptions", icon: "fluent-emoji-flat:mobile-phone" },
    { name: "Leisure", icon: "fluent-emoji-flat:man-cartwheeling" },
    { name: "Online Purchase", icon: "fluent-emoji-flat:credit-card" },
    { name: "Misc", icon: "fluent-emoji-flat:receipt" },
  ],
};

// TODO: dynamic accounts
export const IconCategorySelect = ({
  categoryList,
  value,
  onChange,
}: {
  categoryList: string[];
  value: string;
  onChange: (val: string) => void;
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="border-2 rounded-lg max-w-40 gap-0">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categoryList.concat(["All"]).map((category) => (
          <SelectItem value={category} key={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default function ManageAccounts() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [emojiSelection, setEmojiSelection] = useState("");
  const [emojiCategory, setEmojiCategory] = useState("All");
  const [search, setSearch] = useState("");

  const snapPoints = [0.65, 1];
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  // Temporary search replacement
  const categories = getIconCategories();

  return (
    <div className="flex flex-col gap-4 items-center h-screen">
      <TopBar
        title="Manage Accounts"
        leftIcon="back-button"
        rightIcon="edit-accounts-button"
        onClick={setOpenDrawer}
      />
      <AcctTypeDropdown />
      <div className="w-[calc(90%+2rem)] flex flex-col gap-4 flex-1 overflow-y-auto pb-24 px-4">
        {Object.entries(data).map(([category, arr]) => (
          <div key={category} className="flex flex-col items-center">
            <h2 className="text-lg font-bold text-center mb-2">{category}</h2>
            <CardContainer className="w-full grid grid-cols-4 gap-y-2 px-0 place-items-center">
              {arr.map((acc) => (
                <div
                  key={acc.name}
                  className="flex flex-col items-center gap-1 w-18"
                >
                  <Icon icon={acc.icon} width={64} height={64} />
                  <p className="text-xs font-bold text-center">{acc.name}</p>
                </div>
              ))}
            </CardContainer>
          </div>
        ))}
      </div>
      <Drawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        snapPoints={snapPoints}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
      >
        <DrawerContent className="pb-[calc(env(safe-area-inset-bottom)/2)] min-w-[24rem] bg-slate-200">
          <DrawerHeader className="pt-2">
            <DrawerTitle className="font-serif text-2xl font-normal">
              Expenses
            </DrawerTitle>
            <DrawerDescription> </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col items-center gap-8 mb-8 overflow-y-auto">
            <AcctTypeDropdown />
            <button
              type="button"
              onClick={() => {
                setOpenEmojiPicker(!openEmojiPicker);
                openEmojiPicker
                  ? setSnap(snapPoints[0])
                  : setSnap(snapPoints[1]);
              }}
              className={cn(
                "size-20 flex flex-col shrink-0 items-center justify-center glass-shadow rounded-2xl ring-blue-700",
                openEmojiPicker && "empty:ring-4",
              )}
            >
              {emojiSelection && (
                <Icon icon={emojiSelection} width={64} height={64} />
              )}
            </button>
            <div>
              <Input
                placeholder="Account Name"
                className="w-46 h-10 p-2 placeholder:text-gray-500 glass-shadow rounded-lg mb-4"
              />
              <Input
                placeholder="Opening Balance"
                className="w-46 h-10 p-2 placeholder:text-gray-500 glass-shadow"
              />
            </div>
            <CardContainer className="w-9/10 ">
              <div className="flex gap-2">
                <Input
                  placeholder="Search Icon..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    console.log(searchIcons(e.target.value, emojiCategory));
                  }}
                  className="w-46 h-10 p-2 flex-1 placeholder:text-gray-500 border-2 rounded-lg mb-2"
                />
                <IconCategorySelect
                  categoryList={categories}
                  value={emojiCategory}
                  onChange={setEmojiCategory}
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="size-10 border-2 bg-transparent rounded-lg"
                >
                  <CircleCheck />
                </Button>
              </div>
              <div className="w-full h-58 rounded-lg py-2 px-1 border-2 grid grid-cols-8 auto-rows-min justify-items-center gap-y-1 overflow-y-auto overflow-x-hidden">
                {searchIcons(search, emojiCategory)
                  .slice(0, 265)
                  .map((icon) => {
                    const iconFmtd =
                      !search && emojiCategory !== "All"
                        ? `fluent-emoji-flat:${icon}`
                        : icon;
                    return (
                      <div
                        key={iconFmtd}
                        className={cn(
                          "size-10 p-1 rounded-sm ring-blue-700",
                          emojiSelection === iconFmtd ? "ring-2" : "",
                        )}
                      >
                        <Icon
                          icon={iconFmtd}
                          fontSize={32}
                          onClick={() => setEmojiSelection(iconFmtd)}
                        />
                      </div>
                    );
                  })}
              </div>
            </CardContainer>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
