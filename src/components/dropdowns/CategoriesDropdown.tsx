"use client";
import { FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AddAccountControlTypes } from "../AddAccountDrawer";

// TODO: dynamic accounts
export const CategoriesDropdown = ({ control }: AddAccountControlTypes) => {
  return (
    <FormField
      control={control}
      name="parentId"
      render={({ field }) => (
        <FormItem>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              dark
              size="sm"
              className="border-0 bg-zinc-800 rounded-full text-white cursor-pointer"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Food</SelectItem>
              <SelectItem value="2">Utilities</SelectItem>
              <SelectItem value="3">Transportation</SelectItem>
              <SelectItem value="4">Personal</SelectItem>
              <SelectItem value="0">No category</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
