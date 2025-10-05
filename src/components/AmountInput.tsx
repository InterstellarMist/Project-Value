"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  AddAccountControlTypes,
  AddAccountFormTypes,
} from "./AddAccountDrawer";
import type { UseFormWatch } from "react-hook-form";

const CurrencyCombobox = ({ control }: AddAccountControlTypes) => {
  const currencies = Intl.supportedValuesOf("currency");
  return (
    <FormField
      control={control}
      name="currency"
      render={({ field }) => (
        <FormItem>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              iconSize={16}
              className="!h-auto border-0 shadow-none gap-1 p-0"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CUR">(CUR)</SelectItem>
              {currencies.map((curr) => (
                <SelectItem key={curr} value={curr}>
                  {curr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// TODO: default currency
export const OpeningBalanceInput = ({
  control,
  watch,
}: AddAccountControlTypes & { watch: UseFormWatch<AddAccountFormTypes> }) => {
  const currSymbols = new Intl.DisplayNames(["en"], {
    style: "narrow",
    type: "currency",
  });
  const selectedCurr = watch("currency") === "CUR" ? "USD" : watch("currency");
  return (
    <FormField
      control={control}
      name="openingBalance"
      render={({ field }) => (
        <FormItem>
          <InputGroup className="w-60 h-10 placeholder:text-gray-500 glass-shadow">
            <FormControl>
              <InputGroupInput placeholder="Opening Bal" {...field} />
            </FormControl>
            <InputGroupAddon>{currSymbols.of(selectedCurr)}</InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <CurrencyCombobox control={control} />
            </InputGroupAddon>
          </InputGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
