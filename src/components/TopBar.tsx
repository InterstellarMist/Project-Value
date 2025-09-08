import Image from "next/image";
import Link from "next/link";

export const TopBar: React.FC<{
  leftIcon: string;
  leftLink: string;
  title: string;
  rightIcon: string;
  rightLink: string;
}> = ({ leftIcon, leftLink, title, rightIcon, rightLink }) => {
  return (
    <div className="grid grid-cols-[20%_60%_20%] items-center pt-8 pb-4 px-[5vw]">
      <Link href={leftLink} className="justify-self-start">
        <Image src={leftIcon} alt={leftIcon} width={32} height={32} />
      </Link>
      <h1 className="text-2xl text-center font-serif leading-none select-none">
        {title}
      </h1>
      <Link href={rightLink} className="justify-self-end">
        <Image src={rightIcon} alt={rightIcon} width={32} height={32} />
      </Link>
    </div>
  );
};
