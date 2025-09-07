import { Icon, InlineIcon } from "@iconify/react/dist/iconify.js";
import { emojiList } from "@/data/emojis";
import { accountNames } from "@/data/accounts";
import { cn } from "@/lib/utils";

interface EmojiTypes {
  accountId: number;
  inline?: boolean;
  width: string | number;
  height: string | number;
  className?: string;
}

export const AccountEmoji = ({
  accountId,
  inline,
  width = "2rem",
  height = "2rem",
  className,
}: EmojiTypes) => {
  const emoji = emojiList[accountId];
  if (!emoji) return null;

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

export const AccountEmojiWithText = ({
  accountId,
  textStyle,
  className,
  ...props
}: EmojiTypes & { textStyle?: string }) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <AccountEmoji accountId={accountId} {...props} />
      <p className={cn("text-[0.5rem] font-light text-center", textStyle)}>
        {accountNames[accountId]}
      </p>
    </div>
  );
};
