"use client";

import React, { useEffect, useMemo, useState } from "react";
import SiteHeader from "../../components/SiteHeader";

type PaymentFrequency =
  | "monthly"
  | "semi-monthly"
  | "bi-weekly"
  | "accelerated-bi-weekly"
  | "weekly"
  | "accelerated-weekly";

const FREQUENCIES: { value: PaymentFrequency; label: string; perYear: number }[] = [
  { value: "monthly", label: "Monthly", perYear: 12 },
  { value: "semi-monthly", label: "Semi-monthly", perYear: 24 },
  { value: "bi-weekly", label: "Bi-weekly", perYear: 26 },
  { value: "accelerated-bi-weekly", label: "Accelerated bi-weekly", perYear: 26 },
  { value: "weekly", label: "Weekly", perYear: 52 },
  { value: "accelerated-weekly", label: "Accelerated weekly", perYear: 52 },
];

const currency = (n: number) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 2,
  }).format(isFinite(n) ? n : 0);

function cmhcRate(ltv: number): number {
  if (ltv <= 0.65) return 0.006;
  if (ltv <= 0.75) return 0.017;
  if (ltv <= 0.8) return 0.024;
  if (ltv <= 0.85) return 0.028;
  if (ltv <= 0.9) return 0.031;
  if (ltv <= 0.95) return 0.04;
  return 0;
}

function calcPayment(principal: number, annualRate: number, years: number, perYear: number) {
  const semiAnnual = annualRate / 2;
  const periodic = Math.pow(1 + semiAnnual, 2 / perYear) - 1;
  const n = years * perYear;
  if (periodic === 0) return principal / n;
  return (principal * periodic) / (1 - Math.pow(1 + periodic, -n));
}

// --- Land transfer tax helpers -------------------------------------------------

type Bracket = { upTo: number; rate: number };

function bracketTax(amount: number, brackets: Bracket[]): number {
  let tax = 0;
  let last = 0;
  for (const b of brackets) {
    if (amount > last) {
      const taxable = Math.min(amount, b.upTo) - last;
      tax += taxable * b.rate;
      last = b.upTo;
    } else {
      break;
    }
  }
  return tax;
}

const ONTARIO_LTT_BRACKETS: Bracket[] = [
  { upTo: 55_000, rate: 0.005 },
  { upTo: 250_000, rate: 0.01 },
  { upTo: 400_000, rate: 0.015 },
  { upTo: 2_000_000, rate: 0.02 },
  { upTo: Infinity, rate: 0.025 },
];

const TORONTO_MLTT_BRACKETS: Bracket[] = [
  { upTo: 55_000, rate: 0.005 },
  { upTo: 250_000, rate: 0.01 },
  { upTo: 400_000, rate: 0.015 },
  { upTo: 2_000_000, rate: 0.02 },
  { upTo: 3_000_000, rate: 0.025 },
  { upTo: 4_000_000, rate: 0.035 },
  { upTo: 5_000_000, rate: 0.045 },
  { upTo: 10_000_000, rate: 0.055 },
  { upTo: 20_000_000, rate: 0.065 },
  { upTo: Infinity, rate: 0.075 },
];

const ONTARIO_FTHB_REBATE_CAP = 4_000;
const TORONTO_FTHB_REBATE_CAP = 4_475;

export default function ProfessionalCalculatorPage() {
  const [price, setPrice] = useState("750000");
  const [downPayment, setDownPayment] = useState("150000");
  const [rate, setRate] = useState("5");
  const [amortization, setAmortization] = useState(25);
  const [isDownPaymentAuto, setIsDownPaymentAuto] = useState(true);
  const [frequency, setFrequency] = useState<PaymentFrequency>("monthly");
  const [term, setTerm] = useState(5);

  // Closing cost inputs
  const [isToronto, setIsToronto] = useState(false);
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false);
  const [legalFees, setLegalFees] = useState("1800");
  const [titleInsurance, setTitleInsurance] = useState("300");
  const [homeInspection, setHomeInspection] = useState("500");
  const [adjustments, setAdjustments] = useState("500");

  // Monthly expense inputs
  const [propertyTaxRate, setPropertyTaxRate] = useState("1.0");
  const [homeInsuranceMonthly, setHomeInsuranceMonthly] = useState("100");
  const [utilitiesMonthly, setUtilitiesMonthly] = useState("150");
  const [condoFeesMonthly, setCondoFeesMonthly] = useState("0");

  useEffect(() => {
    if (!isDownPaymentAuto) return;

    const parsedPrice = parseFloat(price) || 0;
    const parsedRate = parseFloat(rate) || 0;
    const autoDownPayment = parsedPrice * (parsedRate / 100);
    setDownPayment(String(Math.round(autoDownPayment)));
  }, [price, rate, isDownPaymentAuto]);

  const result = useMemo(() => {
    const parsedPrice = parseFloat(price) || 0;
    const parsedDownPayment = parseFloat(downPayment) || 0;
    const parsedRate = parseFloat(rate) || 0;

    const dpPct = parsedPrice > 0 ? parsedDownPayment / parsedPrice : 0;
    const ltv = 1 - dpPct;
    const baseLoan = Math.max(parsedPrice - parsedDownPayment, 0);
    const insurable = dpPct < 0.2 && dpPct >= 0.05 && parsedPrice < 1_000_000;
    const premium = insurable ? baseLoan * cmhcRate(ltv) : 0;
    const totalMortgage = baseLoan + premium;
    const freq = FREQUENCIES.find((f) => f.value === frequency)!;

    let payment: number;
    if (frequency === "accelerated-bi-weekly") {
      const monthly = calcPayment(totalMortgage, parsedRate / 100, amortization, 12);
      payment = monthly / 2;
    } else if (frequency === "accelerated-weekly") {
      const monthly = calcPayment(totalMortgage, parsedRate / 100, amortization, 12);
      payment = monthly / 4;
    } else {
      payment = calcPayment(totalMortgage, parsedRate / 100, amortization, freq.perYear);
    }

    const semiAnnual = parsedRate / 100 / 2;
    const periodic = Math.pow(1 + semiAnnual, 2 / freq.perYear) - 1;
    const periodsInTerm = Math.round(term * freq.perYear);
    let balance = totalMortgage;
    let interestPaid = 0;
    let principalPaid = 0;

    for (let i = 0; i < periodsInTerm && balance > 0; i++) {
      const interest = balance * periodic;
      const principalPart = Math.min(payment - interest, balance);
      interestPaid += interest;
      principalPaid += principalPart;
      balance -= principalPart;
    }

    // --- Cash needed to close ---
    const provincialLTT = bracketTax(parsedPrice, ONTARIO_LTT_BRACKETS);
    const municipalLTT = isToronto ? bracketTax(parsedPrice, TORONTO_MLTT_BRACKETS) : 0;
    const provincialRebate = isFirstTimeBuyer ? Math.min(provincialLTT, ONTARIO_FTHB_REBATE_CAP) : 0;
    const municipalRebate =
      isFirstTimeBuyer && isToronto ? Math.min(municipalLTT, TORONTO_FTHB_REBATE_CAP) : 0;
    const netLTT = provincialLTT - provincialRebate + municipalLTT - municipalRebate;

    const legalFeesNum = parseFloat(legalFees) || 0;
    const titleInsuranceNum = parseFloat(titleInsurance) || 0;
    const homeInspectionNum = parseFloat(homeInspection) || 0;
    const adjustmentsNum = parseFloat(adjustments) || 0;

    const cashToClose =
      parsedDownPayment +
      netLTT +
      legalFeesNum +
      titleInsuranceNum +
      homeInspectionNum +
      adjustmentsNum;

    // --- Monthly expenses ---
    const monthlyMortgage = (payment * freq.perYear) / 12;
    const propertyTaxMonthly = (parsedPrice * ((parseFloat(propertyTaxRate) || 0) / 100)) / 12;
    const homeInsuranceNum = parseFloat(homeInsuranceMonthly) || 0;
    const utilitiesNum = parseFloat(utilitiesMonthly) || 0;
    const condoFeesNum = parseFloat(condoFeesMonthly) || 0;
    const totalMonthlyExpenses =
      monthlyMortgage + propertyTaxMonthly + homeInsuranceNum + utilitiesNum + condoFeesNum;

    return {
      payment,
      premium,
      totalMortgage,
      dpPct,
      balanceEndTerm: Math.max(balance, 0),
      interestPaid,
      principalPaid,
      insurable,
      // closing costs
      provincialLTT,
      municipalLTT,
      provincialRebate,
      municipalRebate,
      netLTT,
      legalFeesNum,
      titleInsuranceNum,
      homeInspectionNum,
      adjustmentsNum,
      cashToClose,
      // monthly expenses
      monthlyMortgage,
      propertyTaxMonthly,
      homeInsuranceNum,
      utilitiesNum,
      condoFeesNum,
      totalMonthlyExpenses,
    };
  }, [
    price,
    downPayment,
    rate,
    amortization,
    frequency,
    term,
    isToronto,
    isFirstTimeBuyer,
    legalFees,
    titleInsurance,
    homeInspection,
    adjustments,
    propertyTaxRate,
    homeInsuranceMonthly,
    utilitiesMonthly,
    condoFeesMonthly,
  ]);

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_30%),linear-gradient(180deg,_rgba(2,6,23,0.85)_0%,_rgba(3,7,18,0.94)_50%,_rgba(4,9,20,0.98)_100%)]" />

      <SiteHeader activePage="calculator" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 lg:py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">Mortgage Payment Calculator</h1>
          <p className="mx-auto max-w-2xl text-slate-400">
            Estimate your regular mortgage payments, include CMHC insurance when applicable,
            and review your balance over the selected term.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl lg:col-span-3">
            <h2 className="mb-5 text-xl font-semibold text-white">Your Details</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <NumberField label="Home price" value={price} onChange={setPrice} prefix="$" step={1000} />
              <NumberField
                label="Down payment"
                value={downPayment}
                onChange={(value) => {
                  setDownPayment(value);
                  setIsDownPaymentAuto(false);
                }}
                prefix="$"
                step={1000}
                helper={
                  isDownPaymentAuto
                    ? `Auto-set from ${rate}% interest; edit to override`
                    : `${(result.dpPct * 100).toFixed(1)}% of price`
                }
              />
              <NumberField
                label="CMHC insurance"
                value={result.premium}
                prefix="$"
                step={100}
                readOnly
                helper="Auto-calculated from the loan-to-value and price limits"
              />

              <SelectField
                label="Interest rate"
                value={rate}
                onChange={setRate}
                options={[5, 10, 15, 20].map((value) => ({ value: String(value), label: `${value}%` }))}
                className="w-28"
              />

              <SelectField
                label="Amortization period"
                value={String(amortization)}
                onChange={(v) => setAmortization(Number(v))}
                options={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map((y) => ({ value: String(y), label: `${y} years` }))}
              />
              <SelectField
                label="Payment frequency"
                value={frequency}
                onChange={(v) => setFrequency(v as PaymentFrequency)}
                options={FREQUENCIES.map((f) => ({ value: f.value, label: f.label }))}
              />
              <SelectField
                label="Mortgage term"
                value={String(term)}
                onChange={(v) => setTerm(Number(v))}
                options={[1, 2, 3, 4, 5, 7, 10].map((y) => ({ value: String(y), label: `${y} year${y > 1 ? "s" : ""}` }))}
              />
            </div>

            {result.insurable && (
              <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
                Down payment is less than 20%. CMHC insurance premium of <strong>{currency(result.premium)}</strong> has been added to your mortgage.
              </div>
            )}
          </section>

          <aside className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border border-sky-500/20 bg-sky-600/10 p-6 shadow-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
                {FREQUENCIES.find((f) => f.value === frequency)?.label} payment
              </p>
              <p className="mt-2 text-4xl font-bold text-white">{currency(result.payment)}</p>
              <div className="mt-4 h-px bg-white/10" />
              <dl className="mt-4 space-y-2 text-sm">
                <Row label="Mortgage amount" value={currency(result.totalMortgage)} />
                <Row label="CMHC insurance" value={currency(result.premium)} />
                <Row label="Down payment" value={`${currency(parseFloat(downPayment) || 0)} (${(result.dpPct * 100).toFixed(1)}%)`} />
              </dl>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
                Over your {term}-year term
              </h3>
              <dl className="mt-3 space-y-2 text-sm">
                <Row label="Principal paid" value={currency(result.principalPaid)} />
                <Row label="Interest paid" value={currency(result.interestPaid)} />
                <Row label="Balance at end of term" value={currency(result.balanceEndTerm)} />
              </dl>
            </div>
          </aside>
        </div>

        {/* --- Cash Needed to Close & Monthly Expenses --- */}
        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl lg:col-span-3">
            <h2 className="mb-5 text-xl font-semibold text-white">Cash Needed to Close</h2>

            <div className="mb-5 flex flex-wrap gap-4">
              <Toggle label="Property is in Toronto" checked={isToronto} onChange={setIsToronto} />
              <Toggle label="First-time home buyer" checked={isFirstTimeBuyer} onChange={setIsFirstTimeBuyer} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <NumberField label="Legal fees" value={legalFees} onChange={setLegalFees} prefix="$" step={50} />
              <NumberField label="Title insurance" value={titleInsurance} onChange={setTitleInsurance} prefix="$" step={25} />
              <NumberField label="Home inspection" value={homeInspection} onChange={setHomeInspection} prefix="$" step={25} />
              <NumberField
                label="Tax / utility adjustments"
                value={adjustments}
                onChange={setAdjustments}
                prefix="$"
                step={50}
                helper="Prorated property tax & utilities owed to seller"
              />
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Land transfer tax estimates use current Ontario provincial brackets{isToronto ? " plus Toronto's municipal land transfer tax" : ""}.
              {isFirstTimeBuyer ? " First-time buyer rebates are applied where eligible." : ""} Actual costs vary — confirm with your lawyer.
            </p>
          </section>

          <aside className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-600/10 p-6 shadow-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Estimated cash to close</p>
              <p className="mt-2 text-4xl font-bold text-white">{currency(result.cashToClose)}</p>
              <div className="mt-4 h-px bg-white/10" />
              <dl className="mt-4 space-y-2 text-sm">
                <Row label="Down payment" value={currency(parseFloat(downPayment) || 0)} />
                <Row label="Provincial LTT" value={currency(result.provincialLTT)} />
                {isToronto && <Row label="Toronto municipal LTT" value={currency(result.municipalLTT)} />}
                {isFirstTimeBuyer && (
                  <Row
                    label="First-time buyer rebate"
                    value={`-${currency(result.provincialRebate + result.municipalRebate)}`}
                  />
                )}
                <Row label="Legal fees" value={currency(result.legalFeesNum)} />
                <Row label="Title insurance" value={currency(result.titleInsuranceNum)} />
                <Row label="Home inspection" value={currency(result.homeInspectionNum)} />
                <Row label="Adjustments" value={currency(result.adjustmentsNum)} />
              </dl>
            </div>
          </aside>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl lg:col-span-3">
            <h2 className="mb-5 text-xl font-semibold text-white">Monthly Expenses</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <NumberField
                label="Property tax rate"
                value={propertyTaxRate}
                onChange={setPropertyTaxRate}
                suffix="% / yr"
                step={0.05}
                helper={`≈ ${currency(result.propertyTaxMonthly)}/mo on this price`}
              />
              <NumberField label="Home insurance" value={homeInsuranceMonthly} onChange={setHomeInsuranceMonthly} prefix="$" suffix="/mo" step={10} />
              <NumberField label="Utilities" value={utilitiesMonthly} onChange={setUtilitiesMonthly} prefix="$" suffix="/mo" step={10} />
              <NumberField label="Condo / maintenance fees" value={condoFeesMonthly} onChange={setCondoFeesMonthly} prefix="$" suffix="/mo" step={10} />
            </div>
          </section>

          <aside className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border border-indigo-500/20 bg-indigo-600/10 p-6 shadow-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Total monthly cost of ownership</p>
              <p className="mt-2 text-4xl font-bold text-white">{currency(result.totalMonthlyExpenses)}</p>
              <div className="mt-4 h-px bg-white/10" />
              <dl className="mt-4 space-y-2 text-sm">
                <Row label="Mortgage payment (monthly equiv.)" value={currency(result.monthlyMortgage)} />
                <Row label="Property tax" value={currency(result.propertyTaxMonthly)} />
                <Row label="Home insurance" value={currency(result.homeInsuranceNum)} />
                <Row label="Utilities" value={currency(result.utilitiesNum)} />
                <Row label="Condo / maintenance fees" value={currency(result.condoFeesNum)} />
              </dl>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-400">{label}</dt>
      <dd className="font-medium text-white">{value}</dd>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  helper,
  readOnly = false,
}: {
  label: string;
  value: number | string;
  onChange?: (value: string) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  helper?: string;
  readOnly?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-300">{label}</span>
      <div className="flex items-center rounded-xl border border-slate-700 bg-slate-950/80 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
        {prefix && <span className="pl-3 text-slate-500">{prefix}</span>}
        <input
          type="number"
          value={value}
          step={step}
          readOnly={readOnly}
          onChange={(e) => onChange?.(e.target.value)}
          className={`w-full bg-transparent px-3 py-2.5 text-white outline-none ${readOnly ? "cursor-default" : ""}`.trim()}
        />
        {suffix && <span className="pr-3 text-slate-500">{suffix}</span>}
      </div>
      {helper && <span className="mt-1 block text-xs text-slate-500">{helper}</span>}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-300">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2.5 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${className ?? ""}`.trim()}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-sky-500"
      />
      {label}
    </label>
  );
}