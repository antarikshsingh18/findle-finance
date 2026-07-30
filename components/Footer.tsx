"use client";

import React from "react";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-4 items-start">
          {/* Brand & Description Section */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="inline-block transition-transform duration-300 hover:scale-[1.02]">
              <img
                src="/findlefinance2.png"
                alt="Findle Finance"
                className="h-50 w-auto max-w-[220px] object-contain opacity-95 hover:opacity-100"
              />
            </Link>

            <p className="max-w-sm text-sm text-slate-400 leading-relaxed">
              Your trusted partner in finance and real estate. Browse listings, get home valuations, and plan your mortgage — all in one place.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            {/* Tools Column */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Tools</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/mortgages" className="hover:text-sky-400 transition-colors">
                    Mortgages
                  </Link>
                </li>
                <li>
                  <Link href="/Calculator" className="hover:text-sky-400 transition-colors">
                    Mortgage calculator
                  </Link>
                </li>
                <li>
                  <Link href="/portal" className="hover:text-sky-400 transition-colors">
                    Pre-approval 
                  </Link>
                </li>
                <li>
                  <Link href="/land-transfer-tax" className="hover:text-sky-400 transition-colors">
                    Land transfer tax
                  </Link>
                </li>
                <li>
                  <Link href="/home-valuation" className="hover:text-sky-400 transition-colors">
                    Home valuation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Company</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/join-our-team" className="hover:text-sky-400 transition-colors">
                    Join our team
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-sky-400 transition-colors">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="hover:text-sky-400 transition-colors">
                    Feedback
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-sky-400 transition-colors">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-sky-400 transition-colors">
                    Terms & conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Findle Finance. All rights reserved.
        </div>
      </div>
    </footer>
  );
}