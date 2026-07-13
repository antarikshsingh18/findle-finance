import Link from "next/link";

type PageKey = "home" | "calculator" | "compliance"|"bookacall";

type SiteHeaderProps = {
  activePage: PageKey;
};

const navItems: Array<{ href: string; label: string; page: PageKey }> = [
  { href: "/", label: "Home", page: "home" },
  { href: "/Calculator", label: "Calculator", page: "calculator" },
  { href: "/compliance", label: "Compliance", page: "compliance" },
];

export default function SiteHeader({ activePage }: SiteHeaderProps) {
  return (
    <header className="relative z-10 px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-950/20 px-4 py-3 shadow-[0_8px_30px_rgba(2,8,23,0.25)] backdrop-blur-xl sm:px-6">
        <Link href="/" className="flex items-center">
          <img
            src="/findlefinance2.png"
            alt="Findle Finance"
            className="h-35 w-auto object-contain opacity-90 transition duration-300 hover:scale-[1.02] hover:opacity-100"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navItems.map((item) =>
            item.page === activePage ? (
              <span key={item.page} className="font-semibold text-white">
                {item.label}
              </span>
            ) : (
              <Link key={item.page} href={item.href} className="transition hover:text-sky-300">
                {item.label}
              </Link>
            )
          )}
        </nav>

        <Link
          href="/bookacall"
          className="rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-200 transition hover:bg-sky-500/20"
        >
          Book a call
        </Link>
      </div>
    </header>
  );
}
