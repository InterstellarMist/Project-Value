"use client";
import { Icon, listIcons } from "@iconify/react/dist/iconify.js";
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
import { getIconCategories } from "@/data/iconifyFetch";

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
      <SelectTrigger className="border-2 rounded-lg max-w-35">
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

  const categories = getIconCategories();
  const icons = listIcons("", "fluent-emoji-flat");

  const loadEmojis = (category: string) => {
    return category === "All" ? icons : categories[category];
  };

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
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent className="pb-[calc(env(safe-area-inset-bottom)/2)] bg-slate-200">
          <DrawerHeader className="pt-2">
            <DrawerTitle className="font-serif text-2xl font-normal">
              Expenses
            </DrawerTitle>
            <DrawerDescription> </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col items-center gap-8 mb-8">
            <AcctTypeDropdown />
            <button
              type="button"
              onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
              className={cn(
                "size-20 flex flex-col items-center justify-center glass-shadow rounded-2xl ring-blue-700",
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
            {openEmojiPicker && (
              <CardContainer className="w-9/10 ">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search Icon..."
                    className="w-46 h-10 p-2 flex-1 placeholder:text-gray-500 border-2 rounded-lg mb-2"
                  />
                  <IconCategorySelect
                    categoryList={Object.keys(categories)}
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
                <div className="w-full h-58 rounded-lg py-2 px-1 border-2 grid grid-cols-8 place-items-center gap-y-1 overflow-y-auto overflow-x-hidden">
                  {loadEmojis(emojiCategory)
                    .slice(0, 120)
                    .map((icon) => (
                      <div
                        key={icon}
                        className={cn(
                          "p-1 rounded-sm ring-blue-700",
                          emojiSelection === icon ? "ring-2" : "",
                        )}
                      >
                        <Icon
                          icon={
                            emojiCategory === "All"
                              ? icon
                              : `fluent-emoji-flat:${icon}`
                          }
                          fontSize={32}
                          onClick={() => setEmojiSelection(icon)}
                        />
                      </div>
                    ))}
                </div>
              </CardContainer>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
