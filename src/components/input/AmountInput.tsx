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
import type {
  AddAccountControlTypes,
  AddAccountFormTypes,
} from "../AddAccountDrawer";
import type { UseFormWatch } from "react-hook-form";
import { CurrencyComboboxInput } from "./CurrencyComboboxInput";

const CurrencyComboboxField = ({ control }: AddAccountControlTypes) => {
  return (
    <FormField
      control={control}
      name="currency"
      render={({ field }) => (
        <FormItem>
          <CurrencyComboboxInput {...field} />
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
          <InputGroup className="w-57 h-10 placeholder:text-gray-500 glass-shadow">
            <FormControl>
              <InputGroupInput
                placeholder="Opening Balance"
                {...field}
                value={field.value === 0 ? "" : field.value}
              />
            </FormControl>
            <InputGroupAddon>{currSymbols.of(selectedCurr)}</InputGroupAddon>
            <InputGroupAddon align="inline-end" className="pr-1">
              <CurrencyComboboxField control={control} />
            </InputGroupAddon>
          </InputGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
