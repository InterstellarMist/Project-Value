"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Check, CircleCheck } from "lucide-react";
import { useState } from "react";
import { type Control, useForm } from "react-hook-form";
import { z } from "zod";
import { CardContainer } from "@/components/CardContainer";
import { CategoriesDropdown } from "@/components/dropdowns/CategoriesDropdown";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getIconCategories, searchIcons } from "@/data/iconifyFetch";
import { cn } from "@/lib/utils";
import { useAcctTypeFilterStore } from "@/store/dropdownStores";
import { useDrawerState } from "@/store/uiStateStores";

type FormTypes = z.infer<typeof FormSchema>;

const FormSchema = z.object({
  name: z
    .string()
    .min(1, "Enter an account name")
    .max(20, "Maximum 20 chars, keep it simple :)"),
  openingBalance: z
    .transform(Number)
    .pipe(z.number("Enter a number"))
    .optional(),
  parentId: z.string(),
  icon: z.string("Select an icon").min(1, "Select an icon"),
});

export interface AddAccountControlTypes {
  control: Control<FormTypes>;
}

interface EmojiSelectionHook {
  emojiSelection: string;
  setEmojiSelection: (val: string) => void;
}

interface OpenEmojiPickerHook {
  openEmojiPicker: boolean;
  setOpenEmojiPicker: (val: boolean) => void;
}

interface SetSnap {
  setSnap: (val: number | string | null) => void;
}

const snapPoints = [0.65, 1];

const AccountNameInput = ({ control }: AddAccountControlTypes) => {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type="text"
              placeholder="Account Name"
              className="w-46 h-10 p-2 placeholder:text-gray-500 glass-shadow rounded-lg"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const OpeningBalanceInput = ({ control }: AddAccountControlTypes) => {
  return (
    <FormField
      control={control}
      name="openingBalance"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type="text"
              placeholder="Opening Balance"
              className="w-46 h-10 p-2 placeholder:text-gray-500 glass-shadow"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// TODO: dynamic accounts
const IconCategorySelect = ({
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

const EmojiPicker = ({
  emojiSelection,
  setEmojiSelection,
  openEmojiPicker,
  setOpenEmojiPicker,
  setSnap,
}: SetSnap & OpenEmojiPickerHook & EmojiSelectionHook) => {
  const [emojiCategory, setEmojiCategory] = useState("All");
  const [search, setSearch] = useState("");
  const categories = getIconCategories();

  return (
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
          type="button"
          size="icon"
          variant="secondary"
          onClick={() => {
            setOpenEmojiPicker(!openEmojiPicker);
            openEmojiPicker ? setSnap(snapPoints[0]) : setSnap(snapPoints[1]);
          }}
          className="size-10 border-2 bg-transparent rounded-lg hover:bg-border"
        >
          <CircleCheck />
        </Button>
      </div>
      <div className="w-full h-58 rounded-lg py-2 px-1 border-2 grid grid-cols-8 auto-rows-min justify-items-center gap-y-1 overflow-y-auto overflow-x-hidden">
        {searchIcons(search, emojiCategory)
          .slice(0, 265)
          .map((icon) => {
            const fullIconName =
              !search && emojiCategory !== "All"
                ? `fluent-emoji-flat:${icon}`
                : icon;
            return (
              <div
                key={fullIconName}
                className={cn(
                  "size-10 p-1 rounded-sm ring-blue-700",
                  emojiSelection === fullIconName ? "ring-2" : "",
                )}
              >
                <Icon
                  icon={fullIconName}
                  fontSize={32}
                  onClick={() => {
                    emojiSelection === fullIconName
                      ? setEmojiSelection("")
                      : setEmojiSelection(fullIconName);
                  }}
                />
              </div>
            );
          })}
      </div>
    </CardContainer>
  );
};

const EmojiSelectionField = ({
  icon: emojiSelection,
  setSnap,
  openEmojiPicker,
  setOpenEmojiPicker,
}: SetSnap & OpenEmojiPickerHook & { icon: string }) => {
  return (
    <button
      type="button"
      onClick={() => {
        setOpenEmojiPicker(!openEmojiPicker);
        openEmojiPicker ? setSnap(snapPoints[0]) : setSnap(snapPoints[1]);
      }}
      className={cn(
        "size-20 flex flex-col shrink-0 items-center justify-center glass-shadow rounded-2xl ring-blue-700",
        openEmojiPicker && "empty:ring-4",
      )}
    >
      {emojiSelection && <Icon icon={emojiSelection} width={64} height={64} />}
    </button>
  );
};

const AddAccountForm = ({ setSnap }: SetSnap) => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const filter = useAcctTypeFilterStore((s) => s.filter);

  const form = useForm<FormTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      parentId: "1",
      name: "",
    },
  });

  const onSubmit = (data: FormTypes) => {
    console.log(
      JSON.stringify({ ...data, acctType: filter, currency: "USD" }, null, 2),
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-8 mb-8">
          <CategoriesDropdown control={form.control} />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-center gap-4">
                <div className="flex flex-col items-center">
                  <FormControl>
                    <EmojiSelectionField
                      icon={field.value}
                      setSnap={setSnap}
                      openEmojiPicker={openEmojiPicker}
                      setOpenEmojiPicker={setOpenEmojiPicker}
                    />
                  </FormControl>
                  <FormLabel className="font-base text-sm justify-center pt-2">
                    Account Icon
                  </FormLabel>
                  <FormMessage />
                </div>
                <AccountNameInput control={form.control} />
                <OpeningBalanceInput control={form.control} />
                <EmojiPicker
                  emojiSelection={field.value}
                  setEmojiSelection={field.onChange}
                  openEmojiPicker={openEmojiPicker}
                  setOpenEmojiPicker={setOpenEmojiPicker}
                  setSnap={setSnap}
                />
              </FormItem>
            )}
          />
        </div>
        <button
          type="submit"
          className="absolute top-[calc(1.5rem+env(safe-area-inset-bottom)/2)] right-6 cursor-pointer hover:bg-white/50 rounded-full p-2"
        >
          <Check size={30} strokeWidth={1.25} />
        </button>
      </form>
    </Form>
  );
};

export const AddAccountDrawer = () => {
  const openDrawer = useDrawerState((s) => s.openDrawer);
  const setOpenDrawer = useDrawerState((s) => s.setOpenDrawer);
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
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
          <DrawerDescription>Create an account</DrawerDescription>
        </DrawerHeader>
        <AddAccountForm setSnap={setSnap} />
      </DrawerContent>
    </Drawer>
  );
};
