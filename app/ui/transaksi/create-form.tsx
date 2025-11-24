'use client';

import { useState, useMemo } from 'react';
import { useActionState } from 'react';
import { createTransaction } from '@/app/lib/actions';
import { Menu } from '@/app/lib/definitions';
import { formatCurrency, getCustomerStatus } from '@/app/lib/utils'; // Import getCustomerStatus
import { ShoppingCart, Plus, Minus, User, Search, Utensils, Percent } from 'lucide-react';
import Link from 'next/link';

// Definisi Tipe Props untuk Customer
type CustomerOption = {
  id: string;
  name: string;
  transaction_frequency: number;
};

type CartItem = Menu & { quantity: number };

export default function POSTransaction({ 
  menus, 
  customers 
}: { 
  menus: Menu[], 
  customers: CustomerOption[] 
}) {
  const [state, formAction] = useActionState(createTransaction, null);
  
  // State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [useDiscount, setUseDiscount] = useState(false); // State Diskon

  // Filter menu
  const filteredMenus = menus.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Hitung Subtotal, Diskon, dan Grand Total
  const { subTotal, discountAmount, grandTotal } = useMemo(() => {
    const sub = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const disc = useDiscount ? sub * 0.05 : 0; // Diskon 5%
    return {
        subTotal: sub,
        discountAmount: disc,
        grandTotal: sub - disc
    };
  }, [cart, useDiscount]);

  // Logic Add to Cart
  const addToCart = (menu: Menu) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === menu.id);
      if (existing) {
        return prev.map(item => 
          item.id === menu.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...menu, quantity: 1 }];
    });
  };

  // Logic Kurangi Qty
  const decreaseQty = (id: string) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(0, item.quantity - 1) };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  // Helper icon status untuk dropdown
  const getStatusIcon = (freq: number) => {
    const status = getCustomerStatus(freq);
    switch(status) {
        case 'hot': return '🔥 Hot';
        case 'warm': return '😊 Warm';
        case 'cool': return '😐 Cool';
        default: return '🧊 Cold';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
      
      {/* BAGIAN KIRI: KATALOG MENU (Sama seperti sebelumnya) */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Cari menu..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-pink-500"
                />
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {filteredMenus.map(menu => (
                    <button 
                        key={menu.id}
                        onClick={() => addToCart(menu)}
                        className="flex flex-col text-left bg-white p-3 rounded-xl border border-gray-200 hover:border-pink-500 hover:shadow-md transition group"
                    >
                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mb-2 group-hover:bg-pink-600 group-hover:text-white transition">
                            <Utensils className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{menu.name}</h3>
                        <p className="text-pink-600 font-bold text-sm mt-auto">{formatCurrency(menu.price)}</p>
                    </button>
                ))}
            </div>
            {filteredMenus.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <p>Menu tidak ditemukan</p>
                </div>
            )}
        </div>
      </div>


      {/* BAGIAN KANAN: KERANJANG (CART) */}
      <div className="w-full lg:w-[380px] flex flex-col bg-white rounded-xl shadow-lg border border-gray-100 h-full">
        <form action={formAction} className="flex flex-col h-full">
            
            {/* Header Cart */}
            <div className="p-4 border-b border-gray-100 bg-pink-600 text-white rounded-t-xl">
                <h2 className="font-bold flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" /> Keranjang Pesanan
                </h2>
            </div>

            {/* Customer Selector (UPDATED) */}
            <div className="p-4 border-b border-gray-100 bg-gray-50">
                <label className="text-xs font-bold text-gray-500 mb-1 block">Pilih Pelanggan</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select 
                        name="customerId"
                        value={selectedCustomer}
                        onChange={(e) => setSelectedCustomer(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-pink-500 bg-white cursor-pointer"
                    >
                        <option value="">Umum / Guest (Tanpa Diskon)</option>
                        {customers.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name} ({getStatusIcon(c.transaction_frequency)} - {c.transaction_frequency}x)
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 italic text-sm">
                        Keranjang masih kosong.<br/>Pilih menu di sebelah kiri.
                    </div>
                ) : (
                    cart.map(item => (
                        <div key={item.id} className="flex justify-between items-start border-b border-dashed border-gray-100 pb-3">
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                                <p className="text-xs text-gray-500">{formatCurrency(item.price)} x {item.quantity}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                    <button type="button" onClick={() => decreaseQty(item.id)} className="w-5 h-5 flex items-center justify-center bg-white rounded shadow-sm hover:text-red-500 text-xs">
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                    <button type="button" onClick={() => addToCart(item)} className="w-5 h-5 flex items-center justify-center bg-white rounded shadow-sm hover:text-green-500 text-xs">
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                                <div className="text-sm font-bold text-gray-700">
                                    {formatCurrency(item.price * item.quantity)}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer Summary & Checkout */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
                
                {/* Subtotal */}
                <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subTotal)}</span>
                </div>

                {/* Discount Toggle (Hanya aktif jika Customer dipilih) */}
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 border-dashed">
                    <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-md ${useDiscount ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
                            <Percent className="w-4 h-4" />
                        </div>
                        <label htmlFor="discount" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                            Diskon Member (5%)
                        </label>
                    </div>
                    <div className="flex items-center gap-3">
                       {useDiscount && <span className="text-xs font-bold text-red-500">-{formatCurrency(discountAmount)}</span>}
                       <input 
                            id="discount"
                            type="checkbox" 
                            checked={useDiscount}
                            disabled={!selectedCustomer} // Disable jika Guest
                            onChange={(e) => setUseDiscount(e.target.checked)}
                            className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500 border-gray-300 cursor-pointer disabled:opacity-50"
                        />
                    </div>
                </div>

                {/* Total Akhir */}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 font-bold">Total Bayar</span>
                    <span className="text-2xl font-bold text-pink-600">{formatCurrency(grandTotal)}</span>
                </div>

                {/* Hidden Inputs untuk dikirim ke Server Action */}
                <input type="hidden" name="items" value={JSON.stringify(cart)} />
                {/* Kirim Grand Total ke Server */}
                <input type="hidden" name="totalAmount" value={grandTotal} />

                <div className="grid grid-cols-2 gap-3">
                    <Link href="/dashboard/transaksi" className="flex items-center justify-center py-3 rounded-xl bg-white border border-gray-300 text-gray-600 font-bold hover:bg-gray-100">
                        Batal
                    </Link>
                    <button 
                        type="submit" 
                        disabled={cart.length === 0}
                        className="flex items-center justify-center py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Proses Bayar
                    </button>
                </div>
                
                {state?.message && (
                    <p className="text-center text-red-500 text-xs mt-2 font-medium">{state.message}</p>
                )}
            </div>
        </form>
      </div>
    </div>
  );
}