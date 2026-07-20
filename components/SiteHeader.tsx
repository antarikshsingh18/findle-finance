import Link from "next/link";

type PageKey = "home" | "calculator" | "compliance" | "bookacall" | "portal";

type SiteHeaderProps = {
  activePage: PageKey;
};

const navItems: Array<{
  href?: string;
  label: string;
  page: PageKey;
  children?: Array<{ href: string; label: string }>;
}> = [
  { href: "/", label: "Home", page: "home" },
  {
    label: "Calculator",
    page: "calculator",
    children: [
      { href: "/Calculator", label: "Mortgage Calculator" },
      { href: "/land-transfer-tax", label: "Land Transfer Tax" },
    ],
  },
  { href: "/compliance", label: "Compliance", page: "compliance" },
  { href: "/portal", label: "Portal", page: "portal" },
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
          {navItems.map((item) => {
            if (item.page === "calculator") {
              return (
                <details key={item.page} className="group relative">
                  <summary
                    className={`flex cursor-pointer list-none items-center gap-1 rounded-full px-2 py-1 transition ${
                      activePage === "calculator" ? "font-semibold text-white" : "hover:text-sky-300"
                    }`}
                  >
                    <span>{item.label}</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition group-open:rotate-180">
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </summary>

                  <div className="absolute left-0 top-full mt-2 w-56 rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-xl backdrop-blur">
                    {item.children?.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-sky-300"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </details>
              );
            }

            if (item.page === activePage) {
              return (
                <span key={item.page} className="font-semibold text-white">
                  {item.label}
                </span>
              );
            }

            return (
              <Link key={item.page} href={item.href || "/"} className="transition hover:text-sky-300">
                {item.label}
              </Link>
            );
          })}
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
