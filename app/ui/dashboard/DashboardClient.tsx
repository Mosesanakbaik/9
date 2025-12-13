// app/ui/dashboard/DashboardClient.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import DashboardCards from "./summary-cards";
import { WeeklySalesChart, TransactionTrendChart, TopMenuPieChart } from "./charts";
import TopCustomersTable from "./TopCustomersTable";

async function fetchDashboard() {
  const res = await fetch('/api/dashboard');
  if (!res.ok) throw new Error('Failed to fetch dashboard');
  return res.json();
}

export default function DashboardClient() {
  const { data, isFetching } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
    refetchInterval: 5000, // 5 detik
    refetchIntervalInBackground: true
  });

  if (!data) return null;

  const topMenuFormatted = data.topMenu.map((item: any) => ({
    name: item.name,
    total: Number(item.sold_count),
  }));

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-pink-600">Dashboard Overview</h1>
          <p className="text-sm text-gray-500">
            Pantau Performa Bisnis BABIPEDIA Minggu Ini
          </p>
        </div>

        <span className="text-xs text-gray-400">
          {isFetching ? 'Updating…' : 'Live'}
        </span>
      </div>

      <DashboardCards data={data.cards} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <ChartCard title="Penjualan Mingguan" desc="7 Hari Terakhir">
          <WeeklySalesChart data={data.charts} />
        </ChartCard>

        <ChartCard title="Tren Transaksi" desc="Jumlah Transaksi Per Hari">
          <TransactionTrendChart data={data.charts} />
        </ChartCard>

        <ChartCard title="Top Menu" desc="Menu Paling Banyak Dipesan">
          <TopMenuPieChart data={topMenuFormatted} />
        </ChartCard>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <TopCustomersTable initialData={data.topCustomers} />
        </div>
      </div>
    </>
  );
}

function ChartCard({ title, desc, children }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-pink-600">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
      {children}
    </div>
  );
}
