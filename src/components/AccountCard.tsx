import { CardContainer } from "./CardContainer";
import { Icon } from "@iconify/react";

export const AccountCard: React.FC<{ icon: string; title: string; amount: string }> = ({ icon, title, amount }) => {
  return (
    <CardContainer className="w-[33%-4px] flex flex-col items-center pt-0 pb-4">
      <Icon icon={icon} height="5em" />
      <p className="font-bold text-xs">{title}</p>
      <p className="font-light text-lg mt-2 leading-none">{amount}</p>
    </CardContainer>
  );
};
