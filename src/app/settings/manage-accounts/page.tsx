import { AddAccountDrawer } from "@/components/AddAccountDrawer";
import { AcctTypeDropdown } from "@/components/dropdowns/AcctTypeDropdown";
import { ManageCategoriesDropdown } from "@/components/dropdowns/ManageCategoriesDropdown";
import { TopBar } from "@/components/TopBar";
import { ManageAccountsList } from "@/components/AccountsList";

export default function ManageAccounts() {
  return (
    <div className="flex flex-col gap-2 items-center h-screen">
      <TopBar
        title="Manage Accounts"
        leftIcon="back-button"
        rightIcon="add-account-button"
      />
      <div className="flex gap-3">
        <AcctTypeDropdown />
        <ManageCategoriesDropdown />
      </div>
      <ManageAccountsList />
      <AddAccountDrawer />
    </div>
  );
}
