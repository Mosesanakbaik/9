'use client';

import { Transaction } from '@/app/lib/definitions';
import { formatCurrency, formatDate } from '@/app/lib/utils';
import { Eye, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { getTransactionDetail } from '@/app/lib/actions';  // Import Server Action
import ReceiptModal from './receipt-modal';

export default function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewDetail = async (id: string) => {
    setIsLoading(true);
    try {
      const detail = await getTransactionDetail(id);
      setSelectedTx(detail);
    } catch (error) {
      console.error(error);
      alert('Gagal mengambil detail transaksi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-lg bg-pink-50 p-2 md:pt-0 mt-6">
        <table className="min-w-full text-gray-900">
          <thead className="text-left text-sm font-normal">
            <tr>
              <th className="px-4 py-5 font-medium">ID Transaksi</th>
              <th className="px-3 py-5 font-medium">Tanggal & Waktu</th>
              <th className="px-3 py-5 font-medium">Pelanggan</th>
              <th className="px-3 py-5 font-medium">Total</th>
              <th className="py-3 pl-6 pr-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {/* Removed unused 'index' argument */}
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b py-3 text-sm hover:bg-gray-50">
                <td className="whitespace-nowrap py-3 pl-6 pr-3 font-mono font-bold text-pink-600">
                  {tx.id}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{formatDate(tx.date).split(' pukul ')[0]}</span>
                    <span className="text-xs text-gray-500">{formatDate(tx.date).split(' pukul ')[1]}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {tx.customer_name}
                </td>
                <td className="whitespace-nowrap px-3 py-3 font-bold text-gray-700">
                  {formatCurrency(tx.total_amount)}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <button 
                    onClick={() => handleViewDetail(tx.id)}
                    disabled={isLoading}
                    className="flex items-center gap-1 rounded-md border border-gray-200 p-2 text-gray-600 hover:bg-gray-100 hover:text-pink-600 transition"
                  >
                    {isLoading && selectedTx?.id === tx.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Eye className="w-4 h-4" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RENDER MODAL */}
      {selectedTx && (
        <ReceiptModal 
            transaction={selectedTx} 
            onClose={() => setSelectedTx(null)} 
        />
      )}
    </>
  );
}