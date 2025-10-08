"use client";
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
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormFieldProps } from "@/types/forms";

export const CurrencyComboboxInput = ({
  value,
  onChange,
}: FormFieldProps<string>) => {
  const [open, setOpen] = useState(false);
  const currencies = Intl.supportedValuesOf("currency");
  const currNames = new Intl.DisplayNames(["en"], {
    style: "long",
    type: "currency",
  });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="has-[>svg]:px-1.5 py-0.5 h-auto border-1 border-transparent hover:bg-black/5 hover:border-gray-300"
        >
          {value ? value : "test"}
          <ChevronsUpDown className="opacity-75" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-50 h-60 p-0 pointer-events-auto"
        onWheel={(e) => e.stopPropagation()}
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
                  keywords={currNames.of(curr)?.split(" ")}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "CUR" : currentValue);
                  }}
                >
                  {`${currNames.of(curr)} (${curr})`}
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
