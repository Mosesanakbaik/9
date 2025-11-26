  "use client";

  import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, Legend
  } from "recharts";
  import { formatCurrency } from "@/app/lib/utils";

  // Warna tema BabiPedia
  const COLORS = ["#ec4899", "#f472b6", "#fb7185", "#fbcfe8", "#fecdd3"];

  /* ---------------------------
    WEEKLY SALES BAR CHART
  ----------------------------*/
  export function WeeklySalesChart({ data }: { data: any[] }) {
    return (
      <div className="w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} dy={10} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              cursor={{ fill: "#fdf2f8" }}
              formatter={(value: number) => [formatCurrency(value), "Penjualan"]}
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            <Bar dataKey="revenue" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  /* ---------------------------
    TRANSACTION TREND LINE CHART
  ----------------------------*/
  export function TransactionTrendChart({ data }: { data: any[] }) {
    return (
      <div className="w-full">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
            <Tooltip
              formatter={(value: number) => [value, "Transaksi"]}
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            <Line
              type="monotone"
              dataKey="transactions"
              stroke="#ec4899"
              strokeWidth={3}
              dot={{ r: 4, fill: "#ec4899", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  /* ---------------------------
    🚀 NEW: TOP MENU PIE CHART
  ----------------------------*/
  export function TopMenuPieChart({ data }: { data: { name: string; total: number }[] }) {
    // Hitung total keseluruhan untuk tooltip
    const totalAll = data.reduce((sum, item) => sum + item.total, 0);

    return (
      <div className="w-full">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label={({ name, percent }) => {
                const p = ((percent ?? 0) * 100).toFixed(1);
                return `${name} (${p}%)`;
              }}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number, _, item: any) => {
                const p = ((value / totalAll) * 100).toFixed(1);
                return [`${value}x dipesan (${p}%)`, item?.payload?.name];
              }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }



  export function TopPelanggan({ data }: { data: any[] }) {
    return (
      <div className="w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} dy={10} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              cursor={{ fill: "#fdf2f8" }}
              formatter={(value: number) => [formatCurrency(value), "Customers"]}
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            <Bar dataKey="revenue" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )}
