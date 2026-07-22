"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Calculator,
  Landmark,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import SiteHeader from "../components/SiteHeader";

// const featureCards = [
//   {
//     icon: Building2,
//     title: "Mortgage planning",
//     description: "Model deposits, amortization, and refinancing options with calm confidence.",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Compliance-first",
//     description: "Every workflow is designed to stay secure, auditable, and regulation aware.",
//   },
//   {
//     icon: Landmark,
//     title: "Broker-ready",
//     description: "Connect with trusted professionals without the friction of scattered documents.",
//   },
//   {
//     icon: TrendingUp,
//     title: "Market insight",
//     description: "Follow trends in real time and keep every client conversation evidence-led.",
//   },
// ];

const highlights = [
  { label: "Average approval time", value: "24 hrs" },
  { label: "Trusted partners", value: "140+" },
  { label: "Client retention", value: "96%" },
];

export default function FinanceHomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100 selection:bg-sky-500/30">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_35%),linear-gradient(135deg,_rgba(2,6,23,0.72)_0%,_rgba(7,20,37,0.68)_45%,_rgba(3,7,18,0.86)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/40 via-slate-950/10 to-transparent" />

      <SiteHeader activePage="home" />

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <section className="grid items-center gap-8 rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-[0_20px_80px_rgba(2,8,23,0.35)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-sm text-sky-200">
              <Sparkles size={16} />
              Blue-chip guidance for modern buyers
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Mortgage clarity with <span className="text-sky-300">compliance-first calm</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Findle Finance brings together mortgage planning, secure compliance processes, and polished client experiences in one elegant digital home.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/Calculator"
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                Explore calculator <ArrowRight size={16} />
              </Link>
              <Link
                href="/compliance"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              >
                See compliance tools
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="flex items-center justify-center"
          >
            <img
              src="/findlefinance2.png"
              alt="Findle Finance"
              className="w-full max-w-[420px] object-contain sm:max-w-[500px] lg:max-w-[560px]"
            />
          </motion.div>
        </section>

        {/* <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {featureCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="rounded-[24px] border border-white/10 bg-slate-950/60 p-6 shadow-[0_15px_45px_rgba(2,8,23,0.25)]"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-sky-500/10 p-3 text-sky-300">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{item.description}</p>
                </motion.article>
              );
            })}
          </div>

        </section> */}
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center">
            <img
              src="/findlefinance2.png"
              alt="Findle Finance"
              className="h-30 w-auto max-w-[260px] object-contain opacity-90 transition-all duration-300 hover:scale-[1.02] hover:opacity-100 sm:h-32 md:h-40 lg:h-45"
            />
          </Link>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <a href="/Calculator" className="transition hover:text-sky-300">Calculator</a>
            <a href="/compliance" className="transition hover:text-sky-300">Compliance</a>
            <a href="/blog" className="transition hover:text-sky-300">Blog</a>
          </div>
        </div>
      </footer>
    </div>
  );
}