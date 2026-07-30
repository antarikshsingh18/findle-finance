"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TermsAndConditions() {
    const router=useRouter();
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="flex justify-between items-center mb-16">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-all"
          >
            <span className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:border-indigo-500 transition-colors">
              ←
            </span>
            <span className="text-xs uppercase tracking-widest font-bold">Back</span>
          </button>
          {/* <SiteNavbar /> */}
        </div>
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">Terms & Conditions</h1>
          <p className="text-sm text-slate-400 mt-2">
            Findle Finance &bull; Effective & Last Updated: [JULY 2026]
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">1. Introduction</h2>
            <p>
              These Terms & Conditions (&quot;Terms&quot;) govern your use of the Findle Finance website and all associated tools, services, and content available at findle-finance.vercel.app (&quot;Platform&quot;). By accessing or using our Platform, you agree to be bound by these Terms. If you do not agree, please discontinue use of the Platform immediately.
            </p>
            <p>
              Findle Finance is a mortgage services firm operating through licensed mortgage agents affiliated with registered mortgage brokerages in Ontario, regulated by the Financial Services Regulatory Authority of Ontario (FSRA).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">2. Use of the Platform</h2>
            <p>
              You agree to use the Findle Finance Platform only for lawful purposes and in a manner consistent with all applicable federal and provincial laws, including but not limited to Ontario&apos;s Mortgage Brokerages, Lenders and Administrators Act, 2006 (MBLAA).
            </p>
            <p className="font-medium text-slate-200">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Use the Platform for any fraudulent, deceptive, or unlawful purpose</li>
              <li>Submit false or misleading information through any form or portal</li>
              <li>Attempt to gain unauthorized access to any part of the Platform or its systems</li>
              <li>Reproduce, distribute, or commercially exploit any content on the Platform without prior written consent from Findle Finance</li>
              <li>Interfere with the operation or security of the Platform in any way</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">3. Tools &amp; Calculators</h2>
            <p>
              Findle Finance provides mortgage, GST/HST, and land transfer tax calculators for informational and illustrative purposes only. These tools are designed to provide general estimates based on the information you input.
            </p>
            <p className="font-medium text-slate-200">Calculator results:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Do not constitute a mortgage commitment, pre-approval, or offer to lend</li>
              <li>Are not guaranteed to be accurate, complete, or applicable to your specific situation</li>
              <li>Should not be relied upon as financial, legal, or tax advice</li>
              <li>May not reflect current lender rates, government policies, or market conditions</li>
            </ul>
            <p className="text-slate-400 italic pt-1">
              Always consult a licensed mortgage professional before making any financing decisions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">4. Pre-Approval Portal</h2>
            <p>
              Use of the Findle Finance pre-approval portal involves the submission of personal and financial information. By submitting an application through the portal, you:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Confirm that all information provided is accurate and complete to the best of your knowledge</li>
              <li>Authorize Findle Finance agents to share your application with lenders on your behalf</li>
              <li>Acknowledge that a pre-approval is not a guarantee of final mortgage approval, which is subject to lender underwriting and property valuation</li>
              <li>Understand that rates and terms presented during pre-approval are subject to change until a formal commitment is issued by a lender</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">5. No Financial or Legal Advice</h2>
            <p>
              Nothing on the Findle Finance Platform constitutes financial, legal, tax, or investment advice. All content, tools, articles, and communications are provided for general informational purposes only.
            </p>
            <p className="font-medium text-slate-200">Findle Finance strongly recommends that you consult with:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>A licensed mortgage professional for mortgage-specific guidance</li>
              <li>A qualified legal professional for property and contract advice</li>
              <li>A certified financial advisor or accountant for tax and investment decisions</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">6. Mortgage Services</h2>
            <p>
              Findle Finance mortgage services are provided through licensed mortgage agents affiliated with FSRA-registered brokerages in Ontario. The provision of mortgage services is subject to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Lender approval and individual qualification criteria</li>
              <li>Applicable lending policies, rates, and terms at the time of application</li>
              <li>Compliance with all applicable provincial and federal regulations</li>
            </ul>
            <p>
              Findle Finance does not guarantee mortgage approval, specific rates, or specific terms. All mortgage products are subject to change without notice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">7. Intellectual Property</h2>
            <p>
              All content on the Findle Finance Platform &mdash; including but not limited to text, graphics, logos, tool interfaces, and brand assets &mdash; is the property of Findle Finance and Findle Global and is protected by applicable Canadian copyright and intellectual property laws.
            </p>
            <p>
              You may not copy, reproduce, modify, distribute, or use any content from this Platform without prior written permission from Findle Finance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">8. Third-Party Links</h2>
            <p>
              The Platform may contain links to external websites including lender portals, government resources, and partner platforms. Findle Finance is not responsible for the content, accuracy, or privacy practices of any third-party websites. Links are provided for convenience only and do not constitute an endorsement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, Findle Finance and its affiliated agents, brokerages, and parent company Findle Global shall not be liable for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Any direct, indirect, incidental, or consequential damages arising from your use of the Platform</li>
              <li>Errors, inaccuracies, or omissions in any content, tool output, or communication</li>
              <li>Any loss or damage resulting from reliance on information provided on this Platform</li>
              <li>Interruption, suspension, or termination of Platform access for any reason</li>
            </ul>
            <p className="pt-1">
              Your use of the Platform is entirely at your own risk.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">10. Privacy</h2>
            <p>
              Your use of the Findle Finance Platform is also governed by our <Link href="/privacy-policy" className="text-sky-400 hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference. By using the Platform, you consent to the collection and use of your information as described in our Privacy Policy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">11. Compliance &amp; Regulatory Obligations</h2>
            <p>
              Findle Finance and its agents comply with all applicable regulatory requirements including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong className="text-slate-200">FSRA</strong> &mdash; Financial Services Regulatory Authority of Ontario</li>
              <li><strong className="text-slate-200">FINTRAC</strong> &mdash; Financial Transactions and Reports Analysis Centre of Canada</li>
              <li><strong className="text-slate-200">PIPEDA</strong> &mdash; Personal Information Protection and Electronic Documents Act</li>
              <li><strong className="text-slate-200">MBLAA</strong> &mdash; Mortgage Brokerages, Lenders and Administrators Act, 2006</li>
            </ul>
            <p className="pt-1">
              Clients may be required to provide government-issued identification and other documentation as part of our legal obligations under FINTRAC&apos;s client identification and verification requirements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">12. Amendments</h2>
            <p>
              Findle Finance reserves the right to update or modify these Terms at any time without prior notice. Changes take effect immediately upon posting to the Platform. The &quot;Last Updated&quot; date at the top of this page will reflect the most recent revision. Continued use of the Platform following any changes constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">13. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the Province of Ontario and the applicable federal laws of Canada. Any disputes arising from these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts of Ontario.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">14. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact:
            </p>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg space-y-1 text-slate-300">
              <p><strong className="text-white">Findle Finance</strong></p>
              <p>Email: <a href="mailto:info@findle.global" className="text-sky-400 hover:underline">info@findle.global</a></p>
              <p>Phone: <a href="tel:+14374320003" className="text-sky-400 hover:underline">+1 (437) 432-0003</a></p>
              {/* <p>Web: <a href="https://findle-finance.vercel.app" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">findle-finance.vercel.app</a></p> */}
            </div>
          </section>

        </div>

      </div>
    </main>
  );
}