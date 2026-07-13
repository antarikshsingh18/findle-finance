"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Calculator, ShieldCheck, Sparkles } from "lucide-react";
import SiteHeader from "../../components/SiteHeader";

export default function MortgageCalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState(780000);
  const [downPayment, setDownPayment] = useState(20);
  const [rate, setRate] = useState(5.1);
  const [termYears, setTermYears] = useState(25);

  const mortgageAmount = useMemo(() => purchasePrice * (1 - downPayment / 100), [purchasePrice, downPayment]);
  const monthlyPayment = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = termYears * 12;

    if (monthlyRate === 0) {
      return Math.round(mortgageAmount / numberOfPayments);
    }

    return Math.round(
      (mortgageAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments))
    );
  }, [mortgageAmount, rate, termYears]);

  const totalInterest = useMemo(() => monthlyPayment * termYears * 12 - mortgageAmount, [monthlyPayment, mortgageAmount, termYears]);

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100 selection:bg-sky-500/30">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_35%),linear-gradient(135deg,_rgba(2,6,23,0.9)_0%,_rgba(7,20,37,0.82)_45%,_rgba(3,7,18,0.95)_100%)] backdrop-blur-[2px]" />

      <SiteHeader activePage="calculator" />

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid gap-8 rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-[0_20px_80px_rgba(2,8,23,0.35)] backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr] lg:p-10"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-sm text-sky-200">
              <Sparkles size={16} />
              Smart planning for confident buyers
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Mortgage clarity with <span className="text-sky-300">beautiful precision</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Explore realistic monthly payments, compare financing scenarios, and see how each adjustment changes your long-term position.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Estimated monthly</p>
                <p className="mt-2 text-3xl font-semibold text-white">${monthlyPayment.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Estimated interest</p>
                <p className="mt-2 text-3xl font-semibold text-white">${totalInterest.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-sky-400/20 bg-slate-950/80 p-6 shadow-[0_10px_50px_rgba(56,189,248,0.18)] backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-300">
                <Calculator size={18} />
                <h2 className="text-lg font-semibold text-white">Mortgage calculator</h2>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                Live estimate
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Purchase price</label>
                  <span className="text-sm font-medium text-slate-200">${purchasePrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="300000"
                  max="1800000"
                  step="10000"
                  value={purchasePrice}
                  onChange={(event) => setPurchasePrice(Number(event.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-sky-500"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Down payment</label>
                    <span className="text-sm font-medium text-slate-200">{downPayment}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="1"
                    value={downPayment}
                    onChange={(event) => setDownPayment(Number(event.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-sky-500"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Interest rate</label>
                    <span className="text-sm font-medium text-slate-200">{rate.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    step="0.1"
                    value={rate}
                    onChange={(event) => setRate(Number(event.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-sky-500"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Loan term</label>
                  <span className="text-sm font-medium text-slate-200">{termYears} years</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="35"
                  step="5"
                  value={termYears}
                  onChange={(event) => setTermYears(Number(event.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-sky-500"
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-sky-400/15 bg-slate-900/80 p-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Estimated monthly</span>
                <span className="text-xl font-semibold text-white">${monthlyPayment.toLocaleString()}</span>
              </div>
              <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-slate-400">Down payment</p>
                  <p className="mt-1 font-semibold text-slate-100">${(purchasePrice * (downPayment / 100)).toLocaleString()}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-slate-400">Loan amount</p>
                  <p className="mt-1 font-semibold text-slate-100">${mortgageAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="benefits"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-7 shadow-[0_15px_45px_rgba(2,8,23,0.25)]">
            <div className="mb-4 flex items-center gap-2 text-sky-300">
              <ShieldCheck size={20} />
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
                Confidence built in
              </p>
            </div>
            <h3 className="text-2xl font-semibold text-white">Move through the numbers with calm clarity.</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Every metric stays readable and actionable so you can understand how deposit size, interest rate, and term length influence the bigger picture.
            </p>
          </div>

          <div className="rounded-[28px] border border-sky-400/20 bg-gradient-to-br from-sky-500/10 via-slate-950/70 to-slate-950/90 p-7 shadow-[0_15px_45px_rgba(2,8,23,0.25)]">
            <div className="mb-4 flex items-center gap-2 text-sky-300">
              <BadgeCheck size={20} />
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">What you can explore</p>
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              {[
                "See how a higher deposit lowers monthly pressure",
                "Compare term lengths to balance affordability and long-term cost",
                "Understand the trade-off between rate and repayment speed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <BadgeCheck className="mt-0.5 shrink-0 text-sky-300" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Return to homepage <ArrowRight size={16} />
            </Link>
          </div>
        </motion.section>
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
            <a href="#about" className="transition hover:text-sky-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
