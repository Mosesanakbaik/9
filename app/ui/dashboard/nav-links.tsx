// File: app/ui/dashboard/nav-links.tsx
"use client";

import {
  UserGroupIcon,
  HomeIcon,
  InboxIcon,
  DocumentDuplicateIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Pelanggan", href: "/dashboard/pelanggan", icon: UserGroupIcon },
  { name: "Stok Bahan", href: "/dashboard/stok", icon: ArchiveBoxIcon },
  { name: "Menu", href: "/dashboard/menu", icon: InboxIcon },
  { name: "Transaksi", href: "/dashboard/transaksi", icon: CurrencyDollarIcon },
  { name: "Laporan", href: "/dashboard/laporan", icon: DocumentDuplicateIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex w-full gap-1 overflow-x-auto scrollbar-none">
      {links.map((link) => {
        const LinkIcon = link.icon;
        // Fix untuk bug hover - hanya aktif jika persis sama
        const active = link.name === "Dashboard"
          ? pathname === link.href
          : pathname === link.href || pathname.startsWith(link.href + "/");

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition",
              // Sesuai gambar: aktif = background pink, teks putih
              active
                ? "bg-pink-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            )}
            aria-current={active ? "page" : undefined}
            title={link.name}
          >
            <span className="inline-flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              <span>{link.name}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}