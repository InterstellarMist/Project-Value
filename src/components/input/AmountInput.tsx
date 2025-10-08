"use client";
import type { FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import type { FormFieldProps, FormInputProps, FormWatch } from "@/types/forms";
import { CurrencyComboboxInput } from "./CurrencyComboboxInput";

const CurrencyComboboxField = <T extends FieldValues>({
  control,
  name,
}: FormFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
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

const OpeningBalanceInputGroup = <T extends FieldValues>({
  control,
  field,
  watch,
  placeholder,
}: FormInputProps<T> &
  FormWatch<T> & {
    placeholder: string;
  }) => {
  const selectedCurr = watch("currency" as Path<T>);
  return (
    <InputGroup className="w-65 h-10 placeholder:text-gray-500 glass-shadow">
      <FormControl>
        <InputGroupInput
          placeholder={placeholder}
          {...field}
          value={field.value === 0 ? "" : field.value}
        />
      </FormControl>
      <InputGroupAddon>{getCurrencySymbol(selectedCurr)}</InputGroupAddon>
      <InputGroupAddon align="inline-end" className="pr-1">
        <CurrencyComboboxField<T>
          control={control}
          name={"currency" as Path<T>}
        />
      </InputGroupAddon>
    </InputGroup>
  );
};

export const OpeningBalanceField = <T extends FieldValues>({
  control,
  name,
  watch,
}: FormFieldProps<T> & FormWatch<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <OpeningBalanceInputGroup<T>
            control={control}
            field={field}
            watch={watch}
            placeholder="Opening Balance"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const TxnAmountInputGroup = <T extends FieldValues>({
  control,
  field,
  watch,
  placeholder,
}: FormInputProps<T> &
  FormWatch<T> & {
    placeholder: string;
  }) => {
  const selectedCurr = watch("currency" as Path<T>);
  const txnType = watch("txnType" as Path<T>);

  const inputStyle = cn(
    "text-4xl text-center text-blue-500 placeholder:text-blue-500",
    txnType === "income" && "text-green-500 placeholder:text-green-500",
    txnType === "expense" && "text-red-500 placeholder:text-red-500",
  );
  return (
    <InputGroup
      className={cn(
        "w-full h-12 text-2xl border-0 grid grid-cols-[20%_60%_20%]",
      )}
    >
      <FormControl>
        <InputGroupInput
          placeholder={placeholder}
          {...field}
          value={field.value === 0 ? "" : field.value}
          className={cn(inputStyle)}
        />
      </FormControl>
      <InputGroupAddon className={cn("justify-self-start", inputStyle)}>
        {getCurrencySymbol(selectedCurr)}
      </InputGroupAddon>
      <InputGroupAddon align="inline-end" className="pr-1 justify-self-end">
        <CurrencyComboboxField<T>
          control={control}
          name={"currency" as Path<T>}
        />
      </InputGroupAddon>
    </InputGroup>
  );
};

export const AddTxnAmountField = <T extends FieldValues>({
  name,
  label,
  control,
  watch,
}: FormFieldProps<T> & FormWatch<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="glass-shadow flex flex-col items-center rounded-2xl p-2 gap-2">
          <FormLabel className="font-bold text-lg justify-center">
            {label}
          </FormLabel>
          <FormControl>
            <TxnAmountInputGroup<T>
              control={control}
              field={field}
              watch={watch}
              placeholder="0.00"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
