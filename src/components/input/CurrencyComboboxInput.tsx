"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
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
import { cn } from "@/lib/utils";
import { useDrawerState } from "@/store/uiStateStores";
import { useSetting } from "@/store/userSettingsStore";
import type { FormFieldProps } from "@/types/forms";
import { Button } from "../ui/button";

interface CurrencyComboboxProps extends FormFieldProps<string> {
  className?: string;
}

const currencies = Intl.supportedValuesOf("currency");
const currencyNames = new Intl.DisplayNames(["en"], {
  style: "long",
  type: "currency",
});

export const CurrencyComboboxInput = ({
  value,
  onChange,
  className,
}: CurrencyComboboxProps) => {
  const setSnap = useDrawerState((s) => s.setSnap);
  const defaultCurrency = useSetting.currency();
  const [open, setOpen] = useState(false);
  return (
    <Popover
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (val) setSnap(1);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "has-[>svg]:px-1.5 py-0.5 h-auto border-1 border-transparent hover:bg-black/5 hover:border-gray-300",
            className,
          )}
        >
          {value ? value : "test"}
          <ChevronsUpDown className="opacity-75" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-55 h-60 p-0 pointer-events-auto"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <Command>
          <CommandInput placeholder="Search" />
          <CommandList>
            <CommandEmpty>No Found</CommandEmpty>
            <CommandGroup>
              {currencies.map((curr) => (
                <CommandItem
                  key={curr}
                  value={curr}
                  keywords={currencyNames.of(curr)?.split(" ")}
                  onSelect={(currentValue) => {
                    onChange(
                      currentValue === value ? defaultCurrency : currentValue,
                    );
                  }}
                >
                  <p className="text-balance">
                    {`${currencyNames.of(curr)} (${curr})`}{" "}
                    <span
                      className={cn(
                        "inline",
                        curr === defaultCurrency ? "font-bold" : "font-normal",
                      )}
                    >
                      {curr === defaultCurrency && "[Default]"}
                    </span>
                  </p>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === curr ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
