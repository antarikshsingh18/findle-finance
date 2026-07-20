"use client";

import React, { useMemo, useState } from "react";
import SiteHeader from "../../components/SiteHeader";
import { Calculator, MapPin, ShieldCheck, DollarSign, ArrowRightLeft } from "lucide-react";

export default function LandTransferTaxComparatorPage() {
  const [purchasePrice, setPurchasePrice] = useState<string>("850000");
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState<boolean>(false);

  // Helper function to calculate Ontario Provincial LTT
  const calculateProvincialLTT = (price: number) => {
    let tax = 0;
    if (price <= 55000) {
      tax = price * 0.005;
    } else if (price <= 250000) {
      tax = 55000 * 0.005 + (price - 55000) * 0.01;
    } else if (price <= 400000) {
      tax = 55000 * 0.005 + 195000 * 0.01 + (price - 250000) * 0.015;
    } else if (price <= 2000000) {
      tax = 55000 * 0.005 + 195000 * 0.01 + 150000 * 0.015 + (price - 400000) * 0.02;
    } else {
      tax = 55000 * 0.005 + 195000 * 0.01 + 150000 * 0.015 + 1600000 * 0.02 + (price - 2000000) * 0.025;
    }
    return tax;
  };

  // Helper function to calculate Toronto MLTT (incorporating current luxury brackets)
  const calculateTorontoMLTT = (price: number) => {
    let tax = 0;
    if (price <= 55000) {
      tax = price * 0.005;
    } else if (price <= 250000) {
      tax = 55000 * 0.005 + (price - 55000) * 0.01;
    } else if (price <= 400000) {
      tax = 55000 * 0.005 + 195000 * 0.01 + (price - 250000) * 0.015;
    } else if (price <= 2000000) {
      tax = 55000 * 0.005 + 195000 * 0.01 + 150000 * 0.015 + (price - 400000) * 0.02;
    } else if (price <= 3000000) {
      tax = 55000 * 0.005 + 195000 * 0.01 + 150000 * 0.015 + 1600000 * 0.02 + (price - 2000000) * 0.025;
    } else {
      // Base up to 3M
      tax = 55000 * 0.005 + 195000 * 0.01 + 150000 * 0.015 + 1600000 * 0.02 + 1000000 * 0.025;
      
      // Luxury brackets
      if (price <= 4000000) {
        tax += (price - 3000000) * 0.044;
      } else if (price <= 5000000) {
        tax += 1000000 * 0.044 + (price - 4000000) * 0.0545;
      } else if (price <= 10000000) {
        tax += 1000000 * 0.044 + 1000000 * 0.0545 + (price - 5000000) * 0.065;
      } else if (price <= 20000000) {
        tax += 1000000 * 0.044 + 1000000 * 0.0545 + 5000000 * 0.065 + (price - 10000000) * 0.0755;
      } else {
        tax += 1000000 * 0.044 + 1000000 * 0.0545 + 5000000 * 0.065 + 10000000 * 0.0755 + (price - 20000000) * 0.086;
      }
    }
    return tax;
  };

  const results = useMemo(() => {
    const price = parseFloat(purchasePrice) || 0;
    
    // Outside Toronto Calculation
    const provTax = calculateProvincialLTT(price);
    const provRebate = isFirstTimeBuyer ? Math.min(provTax, 4000) : 0;
    const netOutsideToronto = Math.max(0, provTax - provRebate);

    // Inside Toronto Calculation (Provincial + MLTT)
    const torontoTax = calculateTorontoMLTT(price);
    const torontoRebate = isFirstTimeBuyer ? Math.min(torontoTax, 4475) : 0;
    const netTorontoTax = Math.max(0, torontoTax - torontoRebate);
    const netInsideToronto = netOutsideToronto + Math.max(0, torontoTax - torontoRebate);

    const difference = netInsideToronto - netOutsideToronto;

    return {
      provincialRaw: provTax,
      provincialRebate: provRebate,
      netOutside: netOutsideToronto,
      torontoRaw: torontoTax,
      torontoRebate: torontoRebate,
      netInside: netInsideToronto,
      difference,
    };
  }, [purchasePrice, isFirstTimeBuyer]);

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_30%),linear-gradient(180deg,_rgba(2,6,23,0.85)_0%,_rgba(3,7,18,0.94)_50%,_rgba(4,9,20,0.98)_100%)]" />

      <SiteHeader activePage="calculator" />

      <main className="relative z-10 mx-auto max-w-5xl px-4 py-12">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-4 uppercase tracking-wider">
            <ArrowRightLeft size={14} /> Regional Closing Cost Comparison
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Land Transfer Tax Comparator</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Compare closing tax obligations instantly between the City of Toronto and the rest of Ontario.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Controls Panel */}
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-xl space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
              <Calculator size={20} className="text-sky-400"/> Purchase Parameters
            </h2>
            
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Purchase Price</label>
              <div className="relative">
                <DollarSign size={18} className="absolute left-3 top-3.5 text-slate-500" />
                <input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition">
                <input
                  type="checkbox"
                  checked={isFirstTimeBuyer}
                  onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
                  className="w-5 h-5 accent-sky-500 rounded cursor-pointer"
                />
                <div>
                  <span className="block text-sm font-semibold text-white">First-Time Home Buyer</span>
                  <span className="block text-xs text-slate-400">Applies provincial & municipal rebates</span>
                </div>
              </label>
            </div>

            <div className="rounded-2xl bg-sky-950/20 border border-sky-500/10 p-4 text-xs text-slate-400 space-y-2">
              <p className="font-semibold text-sky-300">💡 Why location matters:</p>
              <p>Buying within Toronto boundaries subjects you to a secondary Municipal Land Transfer Tax (MLTT), effectively doubling your tax burden compared to cities like Mississauga, Markham, or Vaughan.</p>
            </div>
          </div>

          {/* Comparison Cards Display */}
          <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
            
            {/* Rest of Ontario Card */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <MapPin size={14} className="text-emerald-400" /> Rest of Ontario
                </div>
                <div className="text-xs text-slate-500 mb-4"> Mississauga, Ottawa, Hamilton, etc.</div>
                <div className="text-3xl font-bold text-white mb-4">${results.netOutside.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                
                <div className="space-y-2 border-t border-white/10 pt-4 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Provincial Tax:</span>
                    <span>${results.provincialRaw.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  {isFirstTimeBuyer && (
                    <div className="flex justify-between text-emerald-400">
                      <span>First-Time Rebate:</span>
                      <span>-${results.provincialRebate.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 text-[10px] text-slate-500 uppercase tracking-widest font-medium">Single Tax Structure</div>
            </div>

            {/* City of Toronto Card */}
            <div className="rounded-3xl border border-sky-500/30 bg-sky-600/10 p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-sky-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Double LTT
              </div>
              <div>
                <div className="flex items-center gap-2 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  <MapPin size={14} className="text-sky-400" /> City of Toronto
                </div>
                <div className="text-xs text-sky-400/80 mb-4">Includes Municipal MLTT</div>
                <div className="text-3xl font-bold text-white mb-4">${results.netInside.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                
                <div className="space-y-2 border-t border-sky-500/20 pt-4 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Provincial Tax:</span>
                    <span>${results.provincialRaw.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Municipal Tax (MLTT):</span>
                    <span>${results.torontoRaw.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  {isFirstTimeBuyer && (
                    <div className="flex justify-between text-emerald-400 font-medium">
                      <span>Max Combined Rebates:</span>
                      <span>-${(results.provincialRebate + results.torontoRebate).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-sky-500/20 flex items-center justify-between text-xs">
                <span className="text-sky-300 font-medium">Toronto Premium:</span>
                <span className="font-bold text-white">+${results.difference.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}