// app/dashboard/transaksi/[id]/edit/page.tsx

import { notFound } from 'next/navigation';
import { fetchTransactionById, fetchCustomers, fetchMenus } from '@/app/lib/data';
import EditTransactionForm from '@/app/ui/transaksi/edit-form';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditTransactionPage(props: PageProps) {
  // Await params terlebih dahulu
  const params = await props.params;
  const id = params.id;

  // Debug log (akan muncul di terminal server)
  console.log('Params received:', params);
  console.log('ID value:', id);
  console.log('ID type:', typeof id);

  // Validasi ID
  if (!id || id === 'undefined') {
    console.error('Invalid ID:', id);
    return (
      <div className="p-6">
        <div className="rounded-lg bg-red-50 p-4">
          <h2 className="font-bold text-red-800">Debug Info:</h2>
          <pre className="mt-2 text-sm">
            {JSON.stringify({ params, id, type: typeof id }, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  try {
    const [transaction, customers, menus] = await Promise.all([
      fetchTransactionById(id),
      fetchCustomers(),
      fetchMenus(),
    ]);

    if (!transaction) {
      notFound();
    }

    return (
      <main className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Edit Transaksi: {transaction.id}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Perbarui detail transaksi dan keranjang belanja
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <EditTransactionForm
            transaction={transaction}
            customers={customers}
            menus={menus}
          />
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading transaction:', error);
    throw error;
  }
}