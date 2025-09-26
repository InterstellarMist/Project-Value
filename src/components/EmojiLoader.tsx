import { Icon, InlineIcon } from "@iconify/react";
import useSWR from "swr";
import { getAccEmojis, getAccNames } from "@/data/SQLData";
import { cn } from "@/lib/utils";

interface EmojiTypes {
  acctId: number;
  inline?: boolean;
  width: string | number;
  height: string | number;
  className?: string;
}

export const AccountEmoji = ({
  acctId,
  inline,
  width = "2rem",
  height = "2rem",
  className,
}: EmojiTypes) => {
  const { data: emojiList } = useSWR("/db/account/emojis", getAccEmojis);
  const emoji =
    emojiList && acctId !== 0 ? emojiList[acctId] : "fluent-emoji-flat:eyes";

  return inline ? (
    <InlineIcon
      icon={!emoji ? "fluent-emoji-flat:eyes" : emoji}
      width={width}
      height={height}
      className={className}
    />
  ) : (
    <Icon
      icon={!emoji ? "fluent-emoji-flat:eyes" : emoji}
      width={width}
      height={height}
      className={className}
    />
  );
};

export const AccountEmojiWithText = ({
  acctId: accountId,
  textStyle,
  className,
  ...props
}: EmojiTypes & { textStyle?: string }) => {
  const { data: accNames } = useSWR("/db/account/names", getAccNames);
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <AccountEmoji acctId={accountId} {...props} />
      <p className={cn("text-[0.5rem] font-light text-center", textStyle)}>
        {accNames ? accNames[accountId] : "All Accounts"}
      </p>
    </div>
  );
};
