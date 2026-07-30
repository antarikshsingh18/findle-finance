"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-300 py-16 px-4">
      {/* Close Button to Navigate Back */}
      <div className="max-w-4xl mx-auto flex justify-end mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Privacy Policy Content Container */}
      <main className="max-w-4xl mx-auto bg-slate-900/50 border border-white/10 p-8 md:p-12 rounded-2xl shadow-xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest">
            Effective Date: [July 2026] · Last Updated: [July 2026]
          </p>
        </div>

        <section className="space-y-4 text-sm leading-relaxed text-slate-400">
          <h2 className="text-lg font-semibold text-white pt-2">1. Introduction</h2>
          <p>
            Findle Finance (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or use our mortgage services, in accordance with Canada&apos;s Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable Ontario privacy legislation.
          </p>
          <p>
            By using our platform, you agree to the practices described in this Policy.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-slate-400">
          <h2 className="text-lg font-semibold text-white pt-2">2. Who We Are</h2>
          <p>
            Findle Finance is a mortgage services firm operating through licensed mortgage agents affiliated with registered mortgage brokerages in Ontario, regulated by the Financial Services Regulatory Authority of Ontario (FSRA). We are a subsidiary of Findle Global — a preconstruction real estate technology platform.
          </p>
          <p>
            We are not a bank or direct lender. We act as an intermediary between clients and lending institutions.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-slate-400">
          <h2 className="text-lg font-semibold text-white pt-2">3. What We Collect</h2>
          <h3 className="text-base font-medium text-slate-200">Information You Provide</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Full name, email address, phone number</li>
            <li>Financial information including income, employment details, assets, and liabilities</li>
            <li>Property details and purchase intentions</li>
            <li>Government-issued identification (required for mortgage applications and FINTRAC compliance)</li>
            <li>Communications submitted via our contact, pre-approval, or feedback forms</li>
          </ul>
          <h3 className="text-base font-medium text-slate-200 pt-2">Information Collected Automatically</h3>
          <p>
            Findle Finance does not currently use cookies, advertising pixels, or third-party analytics tools. Basic server logs are retained for security purposes only. This Policy will be updated before any tracking technologies are implemented.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-slate-400">
          <h2 className="text-lg font-semibold text-white pt-2">4. Why We Collect It</h2>
          <p>We collect your information to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Process mortgage inquiries, pre-approval requests, and applications</li>
            <li>Match you with appropriate lenders and mortgage products</li>
            <li>Fulfill our legal obligations under FINTRAC and FSRA regulations</li>
            <li>Communicate with you about your application, rates, and renewal timelines</li>
            <li>Improve our platform tools and client experience</li>
            <li>Respond to feedback and service inquiries</li>
          </ul>
          <p>
            We will not use your information for any purpose beyond the above without your renewed consent.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-slate-400">
          <h2 className="text-lg font-semibold text-white pt-2">5. Who We Share It With</h2>
          <p>We do not sell or license your personal information. We share it only with:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-slate-200">Lenders & Financial Institutions:</strong> Your mortgage application information is shared with lenders you authorize us to approach on your behalf.</li>
            <li><strong className="text-slate-200">Regulatory Authorities:</strong> We are required by law to verify client identity and report certain transactions to the Financial Transactions and Reports Analysis Centre of Canada (FINTRAC) under the Proceeds of Crime (Money Laundering) and Terrorist Financing Act (PCMLTFA).</li>
            <li><strong className="text-slate-200">Findle Global:</strong> As a Findle Global company, limited platform and referral data may be shared internally to provide a connected experience across our services.</li>
            <li><strong className="text-slate-200">Legal Requirements:</strong> We may disclose your information if required by law, court order, or government authority.</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-slate-400">
          <h2 className="text-lg font-semibold text-white pt-2">6. Financial Data & Sensitivity</h2>
          <p>
            Mortgage applications involve sensitive financial information. We treat all financial data with the highest level of care — restricting access strictly to the agents and lenders directly involved in your file. We do not store financial documents beyond what is necessary to process your application.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-slate-400">
          <h2 className="text-lg font-semibold text-white pt-2">7. Data Retention</h2>
          <p>
            We retain personal information only as long as necessary for the purposes it was collected, or as required by law and regulatory obligations. FINTRAC regulations require us to retain certain client identification records for a minimum of five years. All other data is reviewed and purged on a regular basis.
          </p>
          <p>
            You may request deletion of your data at any time, subject to our legal retention obligations.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-slate-400">
          <h2 className="text-lg font-semibold text-white pt-2">8. Your Rights Under PIPEDA</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-slate-200">Access</strong> — Request a copy of the personal information we hold about you</li>
            <li><strong className="text-slate-200">Correction</strong> — Ask us to correct inaccurate information</li>
            <li><strong className="text-slate-200">Withdrawal of Consent</strong> — Withdraw consent to how we use your data, subject to legal obligations</li>
            <li><strong className="text-slate-200">Deletion</strong> — Request removal of your personal information where legally permissible</li>
          </ul>
          <p>To exercise any of these rights:</p>
          <p className="pl-2">
            📧 finance@findle.global<br />
            📞 +1 (437) 432-0003
          </p>
          <p>
            We respond within 30 days as required under PIPEDA. You may also file a complaint with the Office of the Privacy Commissioner of Canada at priv.gc.ca.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-slate-400">
          <h2 className="text-lg font-semibold text-white pt-2">9. Security</h2>
          <p>
            We apply reasonable technical and organizational safeguards to protect your information, including SSL encryption across all data collection points and restricted internal access on a need-to-know basis.
          </p>
          <p>
            No internet transmission is 100% secure. We apply commercially reasonable protections but cannot guarantee absolute security.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-slate-400">
          <h2 className="text-lg font-semibold text-white pt-2">10. Third-Party Links</h2>
          <p>
            Our platform may link to external lender websites, government portals, or partner resources. Findle Finance is not responsible for the privacy practices of those third-party sites.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-slate-400">
          <h2 className="text-lg font-semibold text-white pt-2">11. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed at individuals under 18. We do not knowingly collect personal information from minors.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-slate-400">
          <h2 className="text-lg font-semibold text-white pt-2">12. Updates to This Policy</h2>
          <p>
            We may update this Policy as our services evolve or regulations change. The &quot;Last Updated&quot; date at the top of this page will always reflect the most current version. Material changes will be communicated via a notice on our platform.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-slate-400">
          <h2 className="text-lg font-semibold text-white pt-2">13. Contact Us</h2>
          <p>
            <strong className="text-slate-200">Findle Finance — Privacy Office</strong><br />
            📧 finance@findle.global<br />
            📞 +1 (437) 432-0003<br />
            🌐 findle-finance.vercel.app
          </p>
        </section>
      </main>
    </div>
  );
}