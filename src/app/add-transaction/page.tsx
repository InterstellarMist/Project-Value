"use client";
import Image from "next/image";
import { AccountEmoji, CategoryEmoji } from "@/components/EmojiLoader";
import { TopBar } from "@/components/TopBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const CategorySelection: React.FC<{
  categoryType: string;
  subtype?: string;
  category: string;
}> = ({ categoryType, subtype, category }) => {
  return (
    <div className="size-16 bg-white rounded-2xl flex flex-col items-center justify-center gap-1 drop-shadow-[2px_2px_5px_rgba(0,0,0,0.2)]">
      {categoryType === "category" && subtype ? (
        <CategoryEmoji
          category={category}
          categoryType={subtype}
          width={40}
          height={40}
        />
      ) : (
        <AccountEmoji account={category} width={40} height={40} />
      )}
      <p className="text-[0.5rem] font-light text-center">{category}</p>
    </div>
  );
};

export default function AddTransactionPage() {
  return (
    <div>
      <TopBar
        leftIcon="close.svg"
        leftLink="/transactions?account=All"
        title="Add Transaction"
        rightIcon="check.svg"
        rightLink="/transactions?account=All"
      />
      <div className="flex flex-col items-center justify-center gap-4 pb-24">
        <Tabs defaultValue="income" className="w-full items-center mt-8">
          <TabsList className="bg-transparent gap-6">
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expense">Expense</TabsTrigger>
            <TabsTrigger value="transfer">Transfer</TabsTrigger>
          </TabsList>
          <TabsContent value="income" className="w-full">
            <div className="w-full grid grid-cols-3 grid-rows-[auto_auto] justify-items-center items-center px-16 mt-8">
              <CategorySelection categoryType="account" category="Cash" />
              <Image src="long-arrow.svg" alt="arrow" width={60} height={60} />
              <CategorySelection
                categoryType="category"
                subtype="expense"
                category="Food"
              />
              <h2 className="text-lg not-last:text-center pt-4">Income</h2>
              <h2 className="text-lg text-center col-start-3 pt-4">Account</h2>
            </div>
          </TabsContent>
          <TabsContent value="expense" className="w-full">
            <div className="w-full grid grid-cols-3 grid-rows-[auto_auto] justify-items-center items-center px-16 mt-8">
              <CategorySelection categoryType="account" category="Cash" />
              <Image src="long-arrow.svg" alt="arrow" width={60} height={60} />
              <CategorySelection
                categoryType="category"
                subtype="expense"
                category="Food"
              />
              <h2 className="text-lg not-last:text-center pt-4">Account</h2>
              <h2 className="text-lg text-center col-start-3 pt-4">Expense</h2>
            </div>
          </TabsContent>
          <TabsContent value="transfer" className="w-full">
            <div className="w-full grid grid-cols-3 grid-rows-[auto_auto] justify-items-center items-center px-16 mt-8">
              <CategorySelection categoryType="account" category="Cash" />
              <Image src="long-arrow.svg" alt="arrow" width={60} height={60} />
              <CategorySelection
                categoryType="category"
                subtype="expense"
                category="Food"
              />
              <h2 className="text-lg not-last:text-center pt-4">Account</h2>
              <h2 className="text-lg text-center col-start-3 pt-4">Account</h2>
            </div>
          </TabsContent>
        </Tabs>
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
