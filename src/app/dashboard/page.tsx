import { TopBar } from "@/components/TopBar";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 items-center h-screen pb-24">
      <TopBar title="Dashboard" />
      <div className="flex flex-col justify-center items-center h-full">
        <span className="text-6xl animate-bounce mb-4">🚧</span>
        <h1 className="text-3xl font-semibold">Work in Progress... </h1>
      </div>
    </div>
  );
}
