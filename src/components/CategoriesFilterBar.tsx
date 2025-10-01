import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface FilterBarProps {
  category: number;
  setCategory: (category: number) => void;
  categories: {
    acctId: number;
    name: string;
  }[];
}

export const CategoriesFilterBar = ({
  category,
  setCategory,
  categories,
}: FilterBarProps) => {
  return (
    <ScrollArea>
      <div className="flex flex-row gap-2 px-4 ">
        {categories.length > 1 &&
          categories.map((cat) => (
            <Button
              key={cat.acctId}
              onClick={() => setCategory(cat.acctId)}
              variant={category === cat.acctId ? "selected" : "secondary"}
              size="sm"
              className="rounded-full mb-4"
            >
              {cat.name}
            </Button>
          ))}
        <ScrollBar orientation="horizontal" />
      </div>
    </ScrollArea>
  );
};
