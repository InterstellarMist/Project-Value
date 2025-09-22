"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAccountFilterStore } from "@/store/dropdownStores";

type Buttons =
  | "transactions-button"
  | "back-button"
  | "filter-button"
  | "edit-accounts-button";

interface ClassName {
  className: string;
}

interface OnClick {
  onClick?: (val: boolean) => void;
}

interface PageButtonProps extends OnClick, ClassName {
  icon: Buttons;
}

interface TopBarProps extends OnClick {
  leftIcon?: Buttons;
  title: string;
  rightIcon?: Buttons;
}

const FilterButton = ({ className }: ClassName) => {
  return (
    <button type="button" className={cn("cursor-pointer", className)}>
      <Image src="/filter.svg" alt="filter" width={32} height={32} />
    </button>
  );
};

const BackButton = ({ className }: ClassName) => {
  const router = useRouter();
  return (
    <button
      type="button"
      className={cn("cursor-pointer", className)}
      onClick={() => {
        router.back();
      }}
    >
      <Image src="/back.svg" alt="back" width={32} height={32} />
    </button>
  );
};

const TransactionsButton = ({ className }: ClassName) => {
  const setFilter = useAccountFilterStore((s) => s.setFilter);
  return (
    <Link
      href="/transactions"
      onClick={() => setFilter("0")}
      className={className}
    >
      <Image
        src="/transactions.svg"
        alt="transactions"
        width={32}
        height={32}
      />
    </Link>
  );
};

const EditAccountsButton = ({
  onClick: setOpen,
  className,
}: ClassName & OnClick) => {
  return (
    <button
      type="button"
      className={cn("cursor-pointer", className)}
      onClick={() => {
        setOpen?.(true);
      }}
    >
      <Image src="/edit.svg" alt="edit" width={32} height={32} />
    </button>
  );
};

const PageButtonBase = ({ icon, onClick, className }: PageButtonProps) => {
  switch (icon) {
    case "transactions-button":
      return <TransactionsButton className={className} />;
    case "back-button":
      return <BackButton className={className} />;
    case "filter-button":
      return <FilterButton className={className} />;
    case "edit-accounts-button":
      return <EditAccountsButton onClick={onClick} className={className} />;
    default:
      return (
        <div className={className}>
          <Image src={icon} alt={icon} width={32} height={32} />
        </div>
      );
  }
};

export const TopBar = ({
  leftIcon,
  title,
  rightIcon,
  onClick,
}: TopBarProps) => {
  return (
    <div className="w-full grid grid-cols-[20%_60%_20%] items-center pt-8 px-[5vw]">
      {leftIcon && (
        <PageButtonBase
          icon={leftIcon}
          onClick={onClick}
          className="col-1 justify-self-start"
        />
      )}
      <h1 className="col-2 text-2xl text-center font-serif select-none">
        {title}
      </h1>
      {rightIcon && (
        <PageButtonBase
          icon={rightIcon}
          onClick={onClick}
          className="col-3 justify-self-end"
        />
      )}
    </div>
  );
};
