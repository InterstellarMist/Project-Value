import { Icon, InlineIcon } from "@iconify/react/dist/iconify.js";
import { accounts, expenseCategories, incomeCategories } from "@/data/emojis";

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
  categoryType: string;
  inline?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
}> = ({ category, categoryType, inline, width, height, className }) => {
  const emoji =
    categoryType === "expense"
      ? expenseCategories[category]
      : incomeCategories[category];
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
