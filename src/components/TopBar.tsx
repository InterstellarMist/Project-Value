"use client";
import {
  ChevronLeft,
  Grid2X2Plus,
  ListFilter,
  SquareMenuIcon,
  SquarePen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAccountFilterStore } from "@/store/dropdownStores";
import { useDrawerState } from "@/store/uiStateStores";

type Buttons =
  | "transactions-button"
  | "back-button"
  | "filter-button"
  | "edit-accounts-button"
  | "add-account-button";

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

const buttonStyle =
  "cursor-pointer hover:bg-white/50 rounded-full p-2 border-2 border-transparent";

const FilterButton = ({ className }: ClassName) => {
  return (
    <button type="button" className={cn(buttonStyle, className)}>
      <ListFilter size={30} strokeWidth={1.25} />
    </button>
  );
};

const BackButton = ({ className }: ClassName) => {
  const router = useRouter();
  return (
    <button
      type="button"
      className={cn(buttonStyle, "p-0", className)}
      onClick={() => {
        router.back();
      }}
    >
      <ChevronLeft size={40} strokeWidth={1.25} />
    </button>
  );
};

const TransactionsButton = ({ className }: ClassName) => {
  const setFilter = useAccountFilterStore((s) => s.setFilter);
  return (
    <Link
      href="/transactions"
      onClick={() => setFilter("0")}
      className={cn(buttonStyle, className)}
    >
      <SquareMenuIcon size={30} strokeWidth={1.25} />
    </Link>
  );
};

const EditAccountsButton = ({ className }: ClassName) => {
  return (
    <button type="button" className={cn(buttonStyle, className)}>
      <SquarePen size={30} strokeWidth={1.25} />
    </button>
  );
};

const AddAccountButton = ({ className }: ClassName) => {
  const openDrawer = useDrawerState((s) => s.openDrawer);
  const setOpenDrawer = useDrawerState((s) => s.setOpenDrawer);
  return (
    <button
      type="button"
      className={cn(buttonStyle, openDrawer && "border-2 bg-white", className)}
      onClick={() => {
        setOpenDrawer(!openDrawer, false);
      }}
    >
      <Grid2X2Plus size={30} strokeWidth={1.25} />
    </button>
  );
};

const PageButtonBase = ({ icon, className }: PageButtonProps) => {
  switch (icon) {
    case "transactions-button":
      return <TransactionsButton className={className} />;
    case "back-button":
      return <BackButton className={className} />;
    case "filter-button":
      return <FilterButton className={className} />;
    case "edit-accounts-button":
      return <EditAccountsButton className={className} />;
    case "add-account-button":
      return <AddAccountButton className={className} />;
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
    <div className="w-full grid grid-cols-[20%_60%_20%] items-center pt-6 px-[5vw]">
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
