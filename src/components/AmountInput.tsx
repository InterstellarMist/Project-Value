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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import type {
  AddAccountControlTypes,
  AddAccountFormTypes,
} from "./AddAccountDrawer";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UseFormWatch } from "react-hook-form";
import { useState } from "react";

const CurrencyCombobox = ({ control }: AddAccountControlTypes) => {
  const [open, setOpen] = useState(false);
  const currencies = Intl.supportedValuesOf("currency");
  const currNames = new Intl.DisplayNames(["en"], {
    style: "long",
    type: "currency",
  });
  return (
    <FormField
      control={control}
      name="currency"
      render={({ field }) => (
        <FormItem>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                role="combobox"
                aria-expanded={open}
                className="has-[>svg]:px-1.5 py-0.5 h-auto border-1 border-transparent hover:bg-black/5 hover:border-gray-300"
              >
                {field.value ? field.value : "test"}
                <ChevronsUpDown className="opacity-75" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-0">
              <Command className="pointer-events-auto">
                <CommandInput placeholder="Search" />
                <CommandList className="pointer-events-auto">
                  <CommandEmpty>No Found</CommandEmpty>
                  <CommandGroup className="pointer-events-auto">
                    {currencies.map((curr) => (
                      <CommandItem
                        key={curr}
                        value={curr}
                        keywords={currNames.of(curr)?.split(" ")}
                        onSelect={(currentValue) => {
                          field.onChange(
                            currentValue === field.value ? "CUR" : currentValue,
                          );
                        }}
                      >
                        {`${currNames.of(curr)} (${curr})`}
                        <Check
                          className={cn(
                            "ml-auto",
                            field.value === curr ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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
              <InputGroupInput placeholder="Opening Balance" {...field} />
            </FormControl>
            <InputGroupAddon>{currSymbols.of(selectedCurr)}</InputGroupAddon>
            <InputGroupAddon align="inline-end" className="pr-1">
              <CurrencyCombobox control={control} />
            </InputGroupAddon>
          </InputGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
