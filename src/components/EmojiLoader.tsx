import { Icon, InlineIcon } from "@iconify/react/dist/iconify.js";

const accounts: Record<string, string> = {
  All: "fluent-emoji-flat:eyes",
  Cash: "fluent-emoji-flat:dollar-banknote",
  "Debit Card": "fluent-emoji-flat:credit-card",
  "Credit Card": "noto:credit-card",
  Loans: "fluent-emoji-flat:money-bag",
};

const categories: Record<string, string> = {
  Food: "fluent-emoji-flat:curry-rice",
  Drink: "fluent-emoji-flat:bubble-tea",
  Work: "fluent-emoji-flat:briefcase",
  Rent: "fluent-emoji-flat:house",
  Electricity: "fluent-emoji-flat:high-voltage",
  Water: "fluent-emoji-flat:droplet",
  Grocery: "fluent-emoji-flat:shopping-cart",
  Shopping: "fluent-emoji-flat:shopping-bags",
  Gas: "fluent-emoji-flat:fuel-pump",
  Misc: "fluent-emoji-flat:receipt",
};

export const AccountEmoji: React.FC<{
  account: string;
  inline?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
}> = ({ account, inline, width, height, className }) => {
  const emoji = accounts[account];
  if (!emoji) return null;

  if (width === undefined && height === undefined) {
    width = "2rem";
    height = "2rem";
  }

  return inline ? (
    <InlineIcon
      icon={emoji}
      width={width}
      height={height}
      className={className}
    />
  ) : (
    <Icon icon={emoji} width={width} height={height} className={className} />
  );
};

export const CategoryEmoji: React.FC<{
  category: string;
  inline?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
}> = ({ category, inline, width, height, className }) => {
  const emoji = categories[category];
  if (!emoji) return null;

  if (width === undefined && height === undefined) {
    width = "2rem";
    height = "2rem";
  }

  return inline ? (
    <InlineIcon
      icon={emoji}
      width={width}
      height={height}
      className={className}
    />
  ) : (
    <Icon icon={emoji} width={width} height={height} className={className} />
  );
};
