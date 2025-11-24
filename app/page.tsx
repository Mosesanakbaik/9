// File: app/page.tsx
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beranda | BABIPEDIA',
  description: 'Selamat datang di BABIPEDIA, solusi digital inovatif untuk bisnis Anda.',
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mt-4 grid grow grid-cols-1 gap-4 md:grid-cols-5">
        {/* Kiri */}
        <section className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:col-span-2 md:px-10">
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Halo, saya Mario Louis Steven Gunardi Panyi.</strong> Seseorang yang antusias mengembangkan solusi digital yang inovatif dan user-friendly. Saya senang berkolaborasi untuk menciptakan proyek-proyek yang bermakna.
          </p>
          <Link
            href="/dashboard"
            className="flex items-center gap-5 self-start rounded-lg bg-rose-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-500 md:text-base"
          >
            <span>Lihat Dashboard BabiPedia</span>
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </section>

        <section className="relative overflow-hidden rounded-lg md:col-span-3">
          <div className="relative h-[320px] w-full md:h-full min-h-[420px]">
            <Image
              src="/panyi-anime.png" 
              alt="Foto latar Mario Louis"
              fill
              priority
              className="object-cover animate-scroll-vertical"
              sizes="(min-width: 768px) 60vw, 100vw"
            />
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-10">
            <div className="max-w-2xl space-y-3">
              <h2 className={`${lusitana.className} text-2xl font-bold text-white drop-shadow md:text-3xl`}>
                Mari Terhubung
              </h2>
              <p className="text-sm text-gray-200 md:text-base">
                Saya selalu terbuka untuk diskusi tentang proyek baru, kreatif, atau peluang untuk menjadi bagian dari visi Anda.
              </p>

              <div className="mt-4 flex gap-3">
                <Link
                  href="https://github.com/LouisPanyi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/20 transition hover:bg-white/25"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22" height="22" viewBox="0 0 24 24" fill="currentColor"
                    className="drop-shadow"
                    aria-hidden
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </Link>

                <Link
                  href="https://www.linkedin.com/in/mario-louis-steven-gunardi-panyi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/20 transition hover:bg-white/25"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22" height="22" viewBox="0 0 24 24" fill="currentColor"
                    className="drop-shadow"
                    aria-hidden
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </Link>
                {/* Email */}
                <Link
                  href="mailto:Louispanyi@gmail.com"
                  aria-label="Email Louis"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/20 transition hover:bg-white/25"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22" height="22" viewBox="0 0 24 24" fill="currentColor"
                    className="drop-shadow"
                    aria-hidden
                  >
                    <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}