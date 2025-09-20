import { AccountsHomepage, NetWorthHomepage } from "@/components/AccountsList";
import { RecentTransactions } from "@/components/TransactionsList";
import { TopBar } from "@/components/TopBar";

// const TopBar = () => {
//   return (
//     <div className="flex self-start items-center gap-2 p-6 pt-8 px-[5vw]">
//       <Icon icon="stash:user-avatar-light" width={64} />
//       <div className="flex flex-col">
//         <span className="font-serif text-gray-500">Welcome back,</span>
//         <span className="font-serif text-3xl leading-none">Nicholas Chai</span>
//       </div>
//     </div>
//   );
// };

export default function Settings() {
  return (
    <div>
      <TopBar title="Settings" leftIcon="back-button" />
      <div className="w-full flex flex-col gap-4 items-center pb-24">
        <NetWorthHomepage />
        <AccountsHomepage />
        <RecentTransactions />
      </div>
    </div>
  );
}
