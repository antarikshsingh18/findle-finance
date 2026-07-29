"use client";

import React, { useMemo, useState } from "react";
import SiteHeader from "../../components/SiteHeader";
import { Calculator, MapPin, DollarSign, ArrowRightLeft } from "lucide-react";
import Footer from "../../components/Footer";

type ProvinceData = {
  name: string;
  gst: number;
  pstType: "PST" | "QST" | "HST" | "None";
  pstRate: number;
  hstRate: number;
};

const PROVINCES: Record<string, ProvinceData> = {
  AB: { name: "Alberta", gst: 0.05, pstType: "None", pstRate: 0, hstRate: 0 },
  BC: { name: "British Columbia", gst: 0.05, pstType: "PST", pstRate: 0.07, hstRate: 0 },
  MB: { name: "Manitoba", gst: 0.05, pstType: "PST", pstRate: 0.07, hstRate: 0 },
  NB: { name: "New Brunswick", gst: 0.05, pstType: "HST", pstRate: 0, hstRate: 0.15 },
  NL: { name: "Newfoundland and Labrador", gst: 0.05, pstType: "HST", pstRate: 0, hstRate: 0.15 },
  NT: { name: "Northwest Territories", gst: 0.05, pstType: "None", pstRate: 0, hstRate: 0 },
  NS: { name: "Nova Scotia", gst: 0.05, pstType: "HST", pstRate: 0, hstRate: 0.14 },
  NU: { name: "Nunavut", gst: 0.05, pstType: "None", pstRate: 0, hstRate: 0 },
  ON: { name: "Ontario", gst: 0.05, pstType: "HST", pstRate: 0, hstRate: 0.13 },
  PE: { name: "Prince Edward Island", gst: 0.05, pstType: "HST", pstRate: 0, hstRate: 0.15 },
  QC: { name: "Quebec", gst: 0.05, pstType: "QST", pstRate: 0.09975, hstRate: 0 },
  SK: { name: "Saskatchewan", gst: 0.05, pstType: "PST", pstRate: 0.06, hstRate: 0 },
  YT: { name: "Yukon", gst: 0.05, pstType: "None", pstRate: 0, hstRate: 0 },
};

const currency = (n: number) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 2,
  }).format(isFinite(n) ? n : 0);

export default function CanadaTaxCalculatorPage() {
  const [provinceKey, setProvinceKey] = useState("ON");
  const [subtotalInput, setSubtotalInput] = useState("1000");
  const [totalInput, setTotalInput] = useState("1130");

  const prov = PROVINCES[provinceKey];

  // Forward calculations (Add Tax)
  const forwardResult = useMemo(() => {
    const sub = parseFloat(subtotalInput) || 0;
    if (prov.pstType === "HST") {
      const hstAmount = sub * prov.hstRate;
      return {
        subtotal: sub,
        gst: 0,
        provTax: 0,
        hst: hstAmount,
        total: sub + hstAmount,
        isHst: true,
      };
    } else {
      const gstAmount = sub * prov.gst;
      const provAmount = sub * prov.pstRate;
      return {
        subtotal: sub,
        gst: gstAmount,
        provTax: provAmount,
        hst: 0,
        total: sub + gstAmount + provAmount,
        isHst: false,
      };
    }
  }, [subtotalInput, prov]);

  // Reverse calculations (Extract Tax)
  const reverseResult = useMemo(() => {
    const tot = parseFloat(totalInput) || 0;
    const combinedRate = prov.pstType === "HST" ? prov.hstRate : prov.gst + prov.pstRate;
    const sub = tot / (1 + combinedRate);

    if (prov.pstType === "HST") {
      const hstAmount = tot - sub;
      return {
        total: tot,
        subtotal: sub,
        gst: 0,
        provTax: 0,
        hst: hstAmount,
        isHst: true,
      };
    } else {
      const gstAmount = sub * prov.gst;
      const provAmount = sub * prov.pstRate;
      return {
        total: tot,
        subtotal: sub,
        gst: gstAmount,
        provTax: provAmount,
        hst: 0,
        isHst: false,
      };
    }
  }, [totalInput, prov]);

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      {/* Background Image and Gradient Layers matching exact theme */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_30%),linear-gradient(180deg,_rgba(2,6,23,0.85)_0%,_rgba(3,7,18,0.94)_50%,_rgba(4,9,20,0.98)_100%)]" />

      <SiteHeader activePage="calculator" />

      <main className="relative z-10 mx-auto max-w-5xl px-4 py-12">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-4 uppercase tracking-wider">
            <ArrowRightLeft size={14} /> Official CRA Guidelines
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">GST/HST and PST Sales Tax Calculator</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Calculate applicable federal, provincial, or harmonized sales taxes across all Canadian provinces and territories.</p>
        </div>

        {/* Global Province Selector Panel */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-xl">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <MapPin size={14} className="text-sky-400" /> Select Province or Territory
          </label>
          <select
            value={provinceKey}
            onChange={(e) => setProvinceKey(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition text-sm"
          >
            {Object.entries(PROVINCES).map(([key, data]) => (
              <option key={key} value={key}>
                {data.name} ({data.pstType === "HST" ? `HST ${data.hstRate * 100}%` : data.pstType === "None" ? `GST 5%` : `GST 5% + ${data.pstType} ${(data.pstRate * 100).toFixed(2)}%`})
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Forward Calculator Card (Add Tax) */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Calculator size={14} className="text-emerald-400" /> Forward Sales Tax Calculator
              </div>
              <h2 className="text-xl font-semibold text-white mb-1">Add Tax to Amount</h2>
              <p className="text-xs text-slate-400 mb-6">Find the final total from a pre-tax invoice subtotal.</p>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Amount before taxes</label>
                <div className="relative">
                  <DollarSign size={18} className="absolute left-3 top-3.5 text-slate-500" />
                  <input
                    type="number"
                    step="0.01"
                    value={subtotalInput}
                    onChange={(e) => setSubtotalInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-3 rounded-2xl bg-slate-950 border border-slate-800/80 p-5 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Pre-tax subtotal:</span>
                  <span className="font-medium text-white">{currency(forwardResult.subtotal)}</span>
                </div>

                {forwardResult.isHst ? (
                  <div className="flex justify-between text-slate-400">
                    <span>plus HST ({(prov.hstRate * 100)}%):</span>
                    <span className="font-medium text-emerald-400">+{currency(forwardResult.hst)}</span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-slate-400">
                      <span>plus GST ({(prov.gst * 100)}%):</span>
                      <span className="font-medium text-emerald-400">+{currency(forwardResult.gst)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>plus {prov.pstType} ({(prov.pstRate * 100).toFixed(2)}%):</span>
                      <span className="font-medium text-emerald-400">+{currency(forwardResult.provTax)}</span>
                    </div>
                  </>
                )}

                <div className="pt-3 border-t border-slate-800 flex justify-between font-semibold text-base text-white">
                  <span>Total after taxes:</span>
                  <span className="text-sky-400">{currency(forwardResult.total)}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 text-[10px] text-slate-500 uppercase tracking-widest font-medium">Standard Forward Calculation</div>
          </div>

          {/* Reverse Calculator Card (Extract Tax) */}
          <div className="rounded-3xl border border-sky-500/30 bg-sky-600/10 p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-sky-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Reverse Mode
            </div>
            <div>
              <div className="flex items-center gap-2 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Calculator size={14} className="text-sky-400" /> Reverse Sales Tax Calculator
              </div>
              <h2 className="text-xl font-semibold text-white mb-1">Extract Tax from Total</h2>
              <p className="text-xs text-sky-400/80 mb-6">Find the pre-tax subtotal from an inclusive receipt total.</p>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-sky-300/80 uppercase tracking-wider mb-2">Total amount after taxes</label>
                <div className="relative">
                  <DollarSign size={18} className="absolute left-3 top-3.5 text-slate-500" />
                  <input
                    type="number"
                    step="0.01"
                    value={totalInput}
                    onChange={(e) => setTotalInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-3 rounded-2xl bg-slate-950 border border-sky-500/20 p-5 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Total after taxes:</span>
                  <span className="font-medium text-white">{currency(reverseResult.total)}</span>
                </div>

                {reverseResult.isHst ? (
                  <div className="flex justify-between text-slate-300">
                    <span>minus HST ({(prov.hstRate * 100)}%):</span>
                    <span className="font-medium text-rose-400">-{currency(reverseResult.hst)}</span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-slate-300">
                      <span>minus GST ({(prov.gst * 100)}%):</span>
                      <span className="font-medium text-rose-400">-{currency(reverseResult.gst)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>minus {prov.pstType} ({(prov.pstRate * 100).toFixed(2)}%):</span>
                      <span className="font-medium text-rose-400">-{currency(reverseResult.provTax)}</span>
                    </div>
                  </>
                )}

                <div className="pt-3 border-t border-sky-500/20 flex justify-between font-semibold text-base text-white">
                  <span>Amount before taxes:</span>
                  <span className="text-sky-400">{currency(reverseResult.subtotal)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-sky-500/20 text-[10px] text-slate-400 uppercase tracking-widest font-medium">
              * Results are estimates based on standard CRA rounding rules.
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}