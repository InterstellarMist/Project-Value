"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Archive, Check, CircleCheck } from "lucide-react";
import { useState } from "react";
import { type Control, useForm } from "react-hook-form";
import { type ScopedMutator, useSWRConfig } from "swr";
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
import { addAccount, deleteAccount, editAccount } from "@/data/SQLData";
import { cn } from "@/lib/utils";
import { useAcctTypeFilterStore } from "@/store/dropdownStores";
import { snapPoints, useDrawerState } from "@/store/uiStateStores";
import { useAcctStore } from "@/store/useAcctStore";
import { useSetting } from "@/store/userSettingsStore";
import type { AddAccount } from "@/types/accounts";
import { OpeningBalanceField } from "./input/AmountInput";

export type AddAccountFormTypes = z.infer<typeof FormSchema>;

const FormSchema = z.object({
  name: z
    .string()
    .min(1, "Enter an account name")
    .max(20, "Maximum 20 chars, keep it simple :)"),
  openingBalance: z
    .transform(Number)
    .pipe(z.number("Enter a number"))
    .optional(),
  currency: z.string("Choose a currency"),
  parentId: z.string().refine((val) => Number(val) > 0, "Choose a category"),
  icon: z.string("Select an icon").min(1, "Select an icon"),
});

export interface AddAccountControlTypes {
  control: Control<AddAccountFormTypes>;
}

interface EmojiSelectionHook {
  emojiSelection: string;
  setEmojiSelection: (val: string) => void;
}

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
}: EmojiSelectionHook) => {
  const toggleSnap = useDrawerState((s) => s.toggleSnap);
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
          onClick={toggleSnap}
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

const EmojiSelectionField = ({ icon: emojiSelection }: { icon: string }) => {
  const snap = useDrawerState((s) => s.snap);
  const toggleSnap = useDrawerState((s) => s.toggleSnap);
  return (
    <button
      type="button"
      onClick={toggleSnap}
      className={cn(
        "size-20 flex flex-col shrink-0 items-center justify-center glass-shadow rounded-2xl ring-blue-700",
        snap === 1 && "empty:ring-4",
      )}
    >
      {emojiSelection && <Icon icon={emojiSelection} width={64} height={64} />}
    </button>
  );
};

const revalidateAccounts = (mutate: ScopedMutator, acctTypeId: number) => {
  mutate(["/db/accounts", acctTypeId]);
};

const AddAccountForm = () => {
  const defaultCurrency = useSetting.currency();
  const acctTypeId = Number(useAcctTypeFilterStore((s) => s.filter));
  const acctSelected = useAcctStore((s) => s.AcctSelected);
  const isEdit = useDrawerState((s) => s.isEdit);
  const setOpenDrawer = useDrawerState((s) => s.setOpenDrawer);
  const { mutate } = useSWRConfig();

  const defaultValues = isEdit
    ? {
        name: acctSelected.name,
        parentId: acctSelected.parentId?.toString(),
        icon: acctSelected.icon,
        openingBalance: 0,
        currency: defaultCurrency,
      }
    : {
        parentId: "0",
        name: "",
        openingBalance: 0,
        currency: defaultCurrency,
      };

  const form = useForm<AddAccountFormTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: AddAccountFormTypes) => {
    setOpenDrawer(false, false);
    const formattedData: AddAccount = {
      name: data.name,
      parentId: Number(data.parentId),
      icon: data.icon,
      acctTypeId: acctTypeId,
      currency: data.currency,
      openingBalance:
        data.openingBalance && acctTypeId === 2
          ? -data.openingBalance
          : data.openingBalance,
    };

    console.log(JSON.stringify(formattedData, null, 2));

    if (isEdit) {
      await editAccount(acctSelected.acctId, formattedData);
    } else {
      await addAccount(formattedData);
    }

    revalidateAccounts(mutate, acctTypeId);
  };

  const onDelete = async () => {
    console.log("Delete", acctSelected.acctId);
    await deleteAccount(acctSelected.acctId);
    revalidateAccounts(mutate, acctTypeId);
    setOpenDrawer(false, false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-[70dvh] flex flex-col items-center gap-6 mb-[calc(max(env(safe-area-inset-bottom),2em)/2)] box-sizing overflow-y-auto">
          <CategoriesDropdown control={form.control} />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-center gap-4">
                <div className="flex flex-col items-center">
                  <FormControl>
                    <EmojiSelectionField icon={field.value} />
                  </FormControl>
                  <FormLabel className="font-base text-sm justify-center pt-2">
                    Account Icon
                  </FormLabel>
                  <FormMessage />
                </div>
                <AccountNameInput control={form.control} />
                {!isEdit && (acctTypeId === 1 || acctTypeId === 2) && (
                  <OpeningBalanceField<AddAccountFormTypes>
                    name="openingBalance"
                    control={form.control}
                    watch={form.watch}
                  />
                )}
                <EmojiPicker
                  emojiSelection={field.value}
                  setEmojiSelection={field.onChange}
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
        {isEdit && (
          <Button
            variant="destructive"
            className="font-normal h-8 absolute top-[calc(2rem+env(safe-area-inset-bottom)/2)] left-6"
            onClick={onDelete}
          >
            <Archive />
            Archive
          </Button>
        )}
      </form>
    </Form>
  );
};

export const AddAccountDrawer = () => {
  const openDrawer = useDrawerState((s) => s.openDrawer);
  const setOpenDrawer = useDrawerState((s) => s.setOpenDrawer);
  const snap = useDrawerState((s) => s.snap);
  const setSnap = useDrawerState((s) => s.setSnap);

  return (
    <Drawer
      repositionInputs={false}
      open={openDrawer}
      onOpenChange={(open) => setOpenDrawer(open, false)}
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
        <AddAccountForm />
      </DrawerContent>
    </Drawer>
  );
};
