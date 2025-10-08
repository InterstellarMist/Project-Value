"use client";
import type { UseFormWatch } from "react-hook-form";
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

function getCurrencySymbol(code: string): string {
  return (0)
    .toLocaleString("en", {
      style: "currency",
      currency: code,
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();
}

// TODO: default currency
export const OpeningBalanceInput = ({
  control,
  watch,
}: AddAccountControlTypes & { watch: UseFormWatch<AddAccountFormTypes> }) => {
  const selectedCurr = watch("currency");
  return (
    <FormField
      control={control}
      name="openingBalance"
      render={({ field }) => (
        <FormItem>
          <InputGroup className="w-65 h-10 placeholder:text-gray-500 glass-shadow">
            <FormControl>
              <InputGroupInput
                placeholder="Opening Balance"
                {...field}
                value={field.value === 0 ? "" : field.value}
              />
            </FormControl>
            <InputGroupAddon>{getCurrencySymbol(selectedCurr)}</InputGroupAddon>
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
