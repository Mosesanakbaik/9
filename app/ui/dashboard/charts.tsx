'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { formatCurrency } from '@/app/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function WeeklySalesChart({ data }: { data: any[] }) {
  return (
    // Hapus class h-[300px] dari div pembungkus
    <div className="w-full">
      {/* Ganti height="100%" menjadi height={300} */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
          />
          <Tooltip
            cursor={{ fill: '#fdf2f8' }}
            formatter={(value: number) => [formatCurrency(value), 'Penjualan']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar
            dataKey="revenue"
            fill="#ec4899"
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TransactionTrendChart({ data }: { data: any[] }) {
  return (
    // Hapus class h-[300px] dari div pembungkus
    <div className="w-full">
      {/* Ganti height="100%" menjadi height={300} */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
          <Tooltip
            formatter={(value: number) => [value, 'Transaksi']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Line
            type="monotone"
            dataKey="transactions"
            stroke="#ec4899"
            strokeWidth={3}
            dot={{ r: 4, fill: '#ec4899', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}