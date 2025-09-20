"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/useFilterStore";

interface ClassName {
  className: string;
}

interface PageButton {
  icon: string;
  link?: string;
}

interface TopBarProps {
  leftIcon?: string;
  leftLink?: string;
  title: string;
  rightIcon?: string;
  rightLink?: string;
}

const FilterButton = ({ className }: ClassName) => {
  return (
    <button type="button" className={cn("cursor-pointer", className)}>
      <Image src="filter.svg" alt="filter" width={32} height={32} />
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
      <Image src="back.svg" alt="back" width={32} height={32} />
    </button>
  );
};

const TransactionsButton = ({ className }: ClassName) => {
  const setFilter = useFilterStore((s) => s.setFilter);
  return (
    <Link
      href="/transactions"
      onClick={() => setFilter("0")}
      className={className}
    >
      <Image src="transactions.svg" alt="transactions" width={32} height={32} />
    </Link>
  );
};

const PageButtonBase = ({ icon, link, className }: PageButton & ClassName) => {
  switch (icon) {
    case "transactions-button":
      return <TransactionsButton className={className} />;
    case "back-button":
      return <BackButton className={className} />;
    case "filter-button":
      return <FilterButton className={className} />;
    default:
      return (
        link && (
          <Link href={link} className={className}>
            <Image src={icon} alt={icon} width={32} height={32} />
          </Link>
        )
      );
  }
};

export const TopBar = ({
  leftIcon,
  leftLink,
  title,
  rightIcon,
  rightLink,
}: TopBarProps) => {
  return (
    <div className="w-full grid grid-cols-[20%_60%_20%] items-center pt-8 pb-4 px-[5vw]">
      {leftIcon && (
        <PageButtonBase
          icon={leftIcon}
          link={leftLink}
          className="col-1 justify-self-start"
        />
      )}
      <h1 className="col-2 text-2xl text-center font-serif leading-none select-none">
        {title}
      </h1>
      {rightIcon && (
        <PageButtonBase
          icon={rightIcon}
          link={rightLink}
          className="col-3 justify-self-end"
        />
      )}
    </div>
  );
};
