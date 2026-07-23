"use client";

import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, User, Sparkles } from "lucide-react";
import SiteHeader from "../../../components/SiteHeader";

// Central database housing all individual blog posts
const BLOG_DATABASE: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  content: string[];
}> = {
  'navigating-mortgage-stress-test-2026': {
    title: 'Navigating the Mortgage Stress Test: What Buyers Need to Know in 2026',
    excerpt: 'A comprehensive breakdown of qualifying rates, qualification criteria, and how strategic down-payment adjustments can safeguard your buying power.',
    category: 'MORTGAGE STRATEGY',
    readTime: '4 MIN READ',
    date: 'OCT 12, 2026',
    author: 'FINDLE ADVISORY TEAM',
    image: '/mortgage_stress.jpg',
    content: [
      'Navigating the Canadian mortgage landscape requires more than just finding a competitive interest rate. Under current regulatory frameworks, prospective buyers must qualify against the mortgage stress test—proving their capacity to service debt even if macroeconomic conditions shift upwards.',
      'Underwriters evaluate your file using either the benchmark qualifying rate or your contract rate plus 2%, whichever is higher. This compliance-first buffer ensures long-term borrower resilience.',
      'To stay ahead of qualification shifts, consider proactive steps such as consolidating short-term high-interest consumer debt, timing your property acquisitions carefully, and working directly with verified digital documentation portals to expedite underwriter assessment.'
    ]
  },
  'pre-approval-vs-pre-qualification': {
    title: 'Pre-Qualification vs. Pre-Approval: Why Document Verification Matters',
    excerpt: 'Do not let a weak financial letter cost you your dream property. Learn why verified digital uploads drastically speed up broker closing intervals.',
    category: 'FINANCIAL PREPARATION',
    readTime: '3 MIN READ',
    date: 'SEP 28, 2026',
    author: 'MARCUS VANCE',
    image: '/pre_approval.webp',
    content: [
      'Many home buyers use pre-qualification and pre-approval interchangeably, but in the eyes of lenders and listing agents, they represent completely different tiers of financial readiness.',
      'A pre-qualification is typically an estimate based on self-reported numbers. A pre-approval, however, involves actual document verification—such as checking tax notices of assessment, pay stubs, and credit reports.',
      'By submitting structured digital documentation early through verified channels like Findle Finance, you give underwriters the hard evidence needed to issue a rock-solid pre-approval letter.'
    ]
  },
  'optimizing-debt-to-income-ratios': {
    title: 'Optimizing Your GDS and TDS Ratios Before Submitting Files',
    excerpt: 'Gross Debt Service and Total Debt Service ratios dictate your borrowing ceiling. Here is how underwriters evaluate your file before greenlighting capital.',
    category: 'UNDERWRITING INSIGHTS',
    readTime: '5 MIN READ',
    date: 'SEP 14, 2026',
    author: 'ELENA ROSTOVA',
    image: '/gds_tds.jpg',
    content: [
      'Gross Debt Service (GDS) and Total Debt Service (TDS) ratios are the fundamental metrics lenders use to determine whether a mortgage application fits within risk parameters.',
      'GDS measures housing-related costs (mortgage payments, property taxes, heating) relative to your income, while TDS factors in all other debt obligations like car loans and credit cards.',
      'Lowering your revolving debts before application submission can dramatically improve your ratios, allowing you to secure a higher borrowing ceiling with absolute peace of mind.'
    ]
  },
  'fixed-vs-variable-rate-environments': {
    title: 'Fixed vs. Variable: Structuring Mortgage Terms in Changing Markets',
    excerpt: 'Analyzing historical yield curves and risk tolerances to help you lock in a term structure tailored to your long-term cash flow goals.',
    category: 'MARKET INTELLIGENCE',
    readTime: '6 MIN READ',
    date: 'AUG 30, 2026',
    author: 'FINDLE ADVISORY TEAM',
    image: '/fixed_variable.jpg',
    content: [
      'Choosing between a fixed or variable mortgage rate is one of the most critical decisions a property buyer will make during their financing journey.',
      'Fixed rates offer absolute predictability and psychological comfort, locking in payments for a set term. Variable rates fluctuate alongside the central bank prime rate, potentially offering savings when monetary policy eases.',
      'Evaluating your personal cash flow stability, risk tolerance, and long-term holding horizon is essential when building a custom term structure that matches your financial strategy.'
    ]
  },
  'extended-amortization-new-construction': {
    title: 'Extended Amortization for New Construction: How 30-Year Terms Change Your Monthly Math',
    excerpt: 'Since late 2024, extended amortizations have shifted Canadian mortgage rules. Here is who qualifies, how it affects your monthly cash flow, and the real trade-off buyers face.',
    category: 'MORTGAGE STRATEGY',
    readTime: '6 MIN READ',
    date: 'JULY 2026',
    author: 'FINDLE ADVISORY TEAM',
    image: '/background.jpg',
    content: [
      'Since late 2024, one of the biggest affordability shifts in Canadian mortgage rules has been extended amortizations—and it applies directly to pre-construction buyers in a way that is worth understanding properly, because the eligibility rules are not as simple as "everyone gets 30 years now."',
      'Here is exactly who qualifies, what it actually does to your monthly payment, and the real trade-off buyers need to weigh before choosing it.',
      'Who Actually Qualifies for 30 Years: If you are a first-time home buyer, you can access a 30-year amortization on any eligible insured purchase—new construction or resale. If you are not a first-time buyer, the 30-year amortization is only available if you are purchasing a newly constructed home. Repeat buyers purchasing resale remain capped at 25 years.',
      'Either way, to qualify for the insured (high-ratio) mortgage that makes this available, you will generally need: a down payment under 20%, a purchase price under $1.5 million, a credit score of at least 600, and to pass the federal stress test at the higher of your contract rate plus 2% or 5.25%.',
      'The Actual Monthly Math: Take a $570,000 mortgage at a 4.5% rate—a realistic scenario for a $600,000 pre-construction unit with 5% down. At a 25-year amortization, your monthly payment works out to roughly $3,169. At a 30-year amortization, that same mortgage drops to roughly $2,889 per month. That is about $280 less every single month—over $3,300 back in your budget annually.',
      'The Trade-Off: What It Costs You Over Time: Lower monthly payments are not free. Stretching from 25 to 30 years adds roughly $89,000 in additional interest paid over the full amortization period, all else being equal. You also carry a mortgage balance for five more years, alongside a CMHC mortgage insurance premium surcharge of roughly 20 basis points.',
      'Why This Trade-Off Makes Sense for Pre-Construction: Pre-construction buyers are often financing a home they won\'t take possession of for 2-5 years while managing deposit payments. The lower monthly payment offers crucial qualification cushion and cash-flow flexibility. Many smart buyers choose 30 years for the lower payment now, then utilize annual prepayment privileges (typically 10-20% of original principal) to pay it down faster once their financial picture stabilizes after closing.'
    ]
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const id = params?.id as string;
  
  // Safely grab the matching blog post or fallback to the first one if slug doesn't match
  const post = BLOG_DATABASE[id] || BLOG_DATABASE['navigating-mortgage-stress-test-2026'];

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100 selection:bg-sky-500/30">
      
      {/* Background Atmosphere Matching Homepage & Blog Directory */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_35%),linear-gradient(135deg,_rgba(2,6,23,0.72)_0%,_rgba(7,20,37,0.68)_45%,_rgba(3,7,18,0.86)_100%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/40 via-slate-950/10 to-transparent pointer-events-none" />

      <SiteHeader activePage="home" />

      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        
        {/* Back Button Navigation */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-xs font-semibold text-slate-300 backdrop-blur-xl transition hover:border-sky-400/40 hover:text-white"
          >
            <ArrowLeft size={14} /> Back to Journal
          </Link>
        </div>

        {/* Article Container */}
        <article className="rounded-[32px] border border-white/10 bg-slate-950/60 p-6 sm:p-10 shadow-[0_20px_80px_rgba(2,8,23,0.35)] backdrop-blur-xl">
          
          {/* Article Header Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-200">
              <Sparkles size={14} />
              {post.category}
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-white/10 pb-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <User size={14} className="text-sky-400" /> {post.author}
              </span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-sky-400" /> {post.readTime}
              </span>
            </div>
          </motion.div>

          {/* Featured Hero Banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 relative shadow-lg"
          >
            <img 
              src={post.image} 
              alt={post.title} 
              className="h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </motion.div>

          {/* Article Body Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-10 space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base font-sans"
          >
            <p className="text-lg text-slate-200 font-medium leading-relaxed">
              {post.excerpt}
            </p>

            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            <div className="my-6 rounded-2xl border border-sky-400/20 bg-sky-500/10 p-6 text-sky-200">
              <h4 className="font-semibold text-white mb-2 text-sm uppercase tracking-wider">Compliance-First Assurance</h4>
              <p className="text-xs sm:text-sm leading-relaxed text-sky-100">
                All Findle Finance workflows adhere to strict institutional guidelines, ensuring your financial information remains fully protected and transparent throughout review.
              </p>
            </div>
          </motion.div>

          {/* Article Footer Actions */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Published by <strong className="text-slate-200">{post.author}</strong> under {post.category}.
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-xs font-semibold text-white transition hover:bg-sky-400 shadow-lg shadow-sky-500/20"
            >
              Explore More Articles
            </Link>
          </div>

        </article>

      </main>

      {/* Footer Matching Homepage Structure */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center">
              <img
                src="/findlefinance2.png"
                alt="Findle Finance"
                className="h-20 w-auto max-w-[220px] object-contain opacity-90 transition-all duration-300 hover:scale-[1.02] hover:opacity-100"
              />
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <Link href="/Calculator" className="transition hover:text-sky-300">Calculator</Link>
            <Link href="/compliance" className="transition hover:text-sky-300">Compliance</Link>
            <Link href="/blog" className="transition hover:text-sky-300">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}