import { CustomerStatus } from './definitions';

export const formatCurrency = (amount: number | string): string => {
  // Jika tipe string, coba konversi ke number
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (typeof numericAmount !== 'number' || isNaN(numericAmount)) {
    return 'Rp 0';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const getCustomerStatus = (frequency: number): CustomerStatus => {
  if (frequency >= 25) return 'hot';
  if (frequency >= 15) return 'warm';
  if (frequency >= 5) return 'cool';
  return 'cold';
};

// Logic penentuan status stok
export const getStockStatus = (stock: number, minStock: number): 'aman' | 'rendah' | 'kritis' => {
  const criticalThreshold = minStock * 0.5; // Batas Kritis (50% dari min)

  if (stock < criticalThreshold) {
    return 'kritis'; 
  }
  
  if (stock >= criticalThreshold && stock <= minStock) {
    return 'rendah'; 
  }

  return 'aman'; 
};
// Format angka ribuan (contoh: 15000 -> 15.000)
export const formatNumber = (num: number) => {
  return num.toLocaleString('id-ID');
};