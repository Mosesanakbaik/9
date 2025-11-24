import Link from 'next/link';
import { Plus } from 'lucide-react';
import { fetchTransactions, fetchTransactionCounts } from '@/app/lib/data';
import TransactionTable from '@/app/ui/transaksi/table';
import TransactionCards from '@/app/ui/transaksi/cards';
import Search from '@/app/ui/search';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transaksi | BABIPEDIA Dashboard',
  description: 'Halaman untuk mengelola dan memantau transaksi penjualan dalam sistem.',
};

export default async function Page(props: { searchParams?: Promise<{ query?: string }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const [transactions, counts] = await Promise.all([
    fetchTransactions(query),
    fetchTransactionCounts(),
  ]);

  return (
    <div className="w-full space-y-6">
      
      <TransactionCards data={counts} />

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
            <div>
                <h1 className="text-xl font-bold text-pink-600">Riwayat Transaksi</h1>
                <p className="text-sm text-gray-500">Kelola dan pantau semua transaksi penjualan</p>
            </div>
            
            <Link 
                href="/dashboard/transaksi/create" 
                className="flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-500"
            >
                <Plus className="w-5 h-5" /> Transaksi Baru
            </Link>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
             <Search placeholder="Cari ID transaksi atau nama pelanggan..." />
        </div>
      </div>

      <TransactionTable transactions={transactions} />
    </div>
  );
}