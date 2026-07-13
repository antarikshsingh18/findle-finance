"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldCheck } from "lucide-react";
import SiteHeader from "../../components/SiteHeader";
import {motion} from "framer-motion";

export default function CompliancePage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100 selection:bg-sky-500/30">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_30%),linear-gradient(180deg,_rgba(2,6,23,0.85)_0%,_rgba(3,7,18,0.94)_50%,_rgba(4,9,20,0.98)_100%)]" />

      <SiteHeader activePage="compliance" />

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="grid gap-8 rounded-[32px] border border-white/10 bg-slate-950/70 p-8 shadow-[0_24px_80px_rgba(2,8,23,0.28)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-sm text-sky-200">
              <ShieldCheck size={16} />
              Trusted mortgage compliance support
            </div>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Compliance services backed by a licensed mortgage agent.
            </h1>
            {/* <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Our compliance page now houses the full mortgage broker profile, professional designation, and the official compliance logo so every client has one clear point of trust.
            </p> */}

            <div className="mt-25 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Mortgage Agent</p>
                <p className="mt-3 text-2xl font-semibold text-white">Nidhi Sharma</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Experienced mortgage planning specialist focused on transparent financing and client-ready approvals.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Designation</p>
                <p className="mt-3 text-2xl font-semibold text-white">Mortgage Agent Level 2</p>
                {/* <p className="mt-2 text-sm leading-7 text-slate-300">
                  Authorized to advise on residential financing, lender submission, and compliance oversight for mortgage applications.
                </p> */}
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Mortgage Agent</p>
                  <p className="mt-2 text-lg font-semibold text-white">Nidhi Sharma</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-[24px] bg-slate-900/80 p-4 text-center text-slate-300">
                <img
                  src="/nidhisharma.jpeg"
                  alt="Nidhi Sharma"
                  className="mx-auto mb-4 h-40 w-40 rounded-full object-cover"
                />
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center gap-4">
                <div>
                  {/* <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Compliance logo</p> */}
                  <p className="mt-2 text-lg font-semibold text-white">Official accreditation</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-[24px] bg-slate-900/80 p-4 text-center text-slate-300">
                <img
                  src="/findlefinance10.png"
                  alt="Findle Finance official accreditation"
                  className="mx-auto mb-4 h-56 w-56 rounded-full object-contain"
                />
                {/* <p className="text-sm leading-7">
                  Display the compliance logo here to reinforce your regulated mortgage services. Update the image at <code>/compliance-logo.png</code> when ready.
                </p> */}
              </div>
            </div>  
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-8 shadow-[0_15px_45px_rgba(2,8,23,0.25)]">
            <div className="mb-4 flex items-center gap-2 text-sky-300">
              <BadgeCheck size={20} />
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">Mortgage broker details</p>
            </div>
            <h2 className="text-2xl font-semibold text-white">Professional support with clear compliance standards.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Nidhi Sharma is a certified Mortgage Agent Level 2 who ensures every loan application is reviewed against the latest lender and regulatory requirements.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {[
                "Full mortgage affordability reviews for first-time and repeat buyers",
                "Regulatory readiness checks for documents and lender submission",
                "Dedicated compliance guidance through every stage of approval",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <BadgeCheck className="mt-0.5 shrink-0 text-sky-300" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-8 shadow-[0_15px_45px_rgba(2,8,23,0.25)]">
            <h2 className="text-2xl font-semibold text-white">Ready to connect</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Book a consultation to review mortgage options, talk through compliance requirements, and find the right structure for your financing needs.
            </p>
            <Link
              href="/Calculator"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Review calculator <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center">
              <img
                src="/findlefinance2.png"
                alt="Findle Finance"
                className="h-38 w-auto object-contain opacity-90 transition duration-300 hover:scale-[1.02] hover:opacity-100"
              />
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <Link href="/" className="transition hover:text-sky-300">Home</Link>
            <Link href="/Calculator" className="transition hover:text-sky-300">Calculator</Link>
            <Link href="/compliance" className="font-semibold text-white">Compliance</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
