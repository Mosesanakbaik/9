import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { fetchDashboardData } from "@/app/lib/data";
import DashboardCards from "@/app/ui/dashboard/summary-cards";
import { WeeklySalesChart, TransactionTrendChart, TopMenuPieChart } from "@/app/ui/dashboard/charts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | BABIPEDIA Dashboard",
  description: "Halaman utama untuk memantau performa bisnis BABIPEDIA.",
};

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const { cards, charts, topMenu } = await fetchDashboardData();
  const topMenuFormatted = topMenu.map((item: any) => ({
    name: item.name,
    total: Number(item.sold_count),
  }));

  return (
    <main className="w-full space-y-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-pink-600">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">
          Pantau performa bisnis Babi Pedia minggu ini
        </p>
      </div>

      <DashboardCards data={cards} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-pink-600">Penjualan Mingguan</h3>
            <p className="text-sm text-gray-500">Performa penjualan 7 hari terakhir</p>
          </div>
          <WeeklySalesChart data={charts} />
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-pink-600">Tren Transaksi</h3>
            <p className="text-sm text-gray-500">Jumlah transaksi per hari</p>
          </div>
          <TransactionTrendChart data={charts} />
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm ">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-pink-600">Top Menu</h3>
            <p className="text-sm text-gray-500">Menu yang paling banyak dipesan</p>
          </div>
          <TopMenuPieChart data={topMenuFormatted} />
        </div>
      </div>
    </main>
  );
}
