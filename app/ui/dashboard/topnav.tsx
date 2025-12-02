import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { House } from "lucide-react";
import Image from "next/image";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-rose-200/40 bg-gradient-to-r bg-pink-500 backdrop-blur">
      <div className="mx-auto max-w-7xl px-3 py-3 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Dashboard" className="flex items-center gap-3 text-white">
            <div className="flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="Inventory Logo"
                width={40}
                height={40}
                className="h-8 w-auto md:h-10 object-contain"
              />
            </div>

            <div className="hidden md:block">
              <strong className="text-lg">BABIPEDIA</strong>
              <span className="text-xs opacity-90 block mt-1">All about Pork!</span>
            </div>
          </Link>
          <form className="ml-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              title="Sign Out"
            >
              <House className="h-5 w-5" aria-hidden="true" />
              <span className="hidden md:inline">Beranda</span>
            </Link>
          </form>
        </div>
      </div>
      <div className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-3 py-2 md:px-6">
          <NavLinks />
        </div>
      </div>
    </header>
  );
}