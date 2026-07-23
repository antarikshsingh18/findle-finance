"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Clock, User } from "lucide-react";
import SiteHeader from "../../components/SiteHeader";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  isFeatured?: boolean;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'navigating-mortgage-stress-test-2026',
    title: 'Navigating the Mortgage Stress Test: What Buyers Need to Know in 2026',
    excerpt: 'A comprehensive breakdown of qualifying rates, qualification criteria, and how strategic down-payment adjustments can safeguard your buying power.',
    category: 'MORTGAGE STRATEGY',
    readTime: '4 MIN READ',
    date: 'OCT 12, 2026',
    author: 'FINDLE ADVISORY TEAM',
    isFeatured: true,
    image: '/mortgage_stress.jpg',
  },
  {
    id: 'pre-approval-vs-pre-qualification',
    title: 'Pre-Qualification vs. Pre-Approval: Why Document Verification Matters',
    excerpt: 'Do not let a weak financial letter cost you your dream property. Learn why verified digital uploads drastically speed up broker closing intervals.',
    category: 'FINANCIAL PREPARATION',
    readTime: '3 MIN READ',
    date: 'SEP 28, 2026',
    author: 'MARCUS VANCE',
    isFeatured: false,
    image: '/pre_approval.webp',
  },
  {
    id: 'optimizing-debt-to-income-ratios',
    title: 'Optimizing Your GDS and TDS Ratios Before Submitting Files',
    excerpt: 'Gross Debt Service and Total Debt Service ratios dictate your borrowing ceiling. Here is how underwriters evaluate your file before greenlighting capital.',
    category: 'UNDERWRITING INSIGHTS',
    readTime: '5 MIN READ',
    date: 'SEP 14, 2026',
    author: 'ELENA ROSTOVA',
    isFeatured: false,
    image: '/gds_tds.jpg',
  },
  {
    id: 'fixed-vs-variable-rate-environments',
    title: 'Fixed vs. Variable: Structuring Mortgage Terms in Changing Markets',
    excerpt: 'Analyzing historical yield curves and risk tolerances to help you lock in a term structure tailored to your long-term cash flow goals.',
    category: 'MARKET INTELLIGENCE',
    readTime: '6 MIN READ',
    date: 'AUG 30, 2026',
    author: 'FINDLE ADVISORY TEAM',
    isFeatured: false,
    image: '/fixed_variable.jpg',
  },
];

export default function BlogDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['ALL', 'MORTGAGE STRATEGY', 'FINANCIAL PREPARATION', 'UNDERWRITING INSIGHTS', 'MARKET INTELLIGENCE'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'ALL' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find(p => p.isFeatured) || BLOG_POSTS[0];

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100 selection:bg-sky-500/30">
      
      {/* Background Atmosphere Matching Homepage */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_35%),linear-gradient(135deg,_rgba(2,6,23,0.72)_0%,_rgba(7,20,37,0.68)_45%,_rgba(3,7,18,0.86)_100%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/40 via-slate-950/10 to-transparent pointer-events-none" />

      <SiteHeader activePage="home" />

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        
        {/* Page Identity Header */}
        <section className="rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-[0_20px_80px_rgba(2,8,23,0.35)] backdrop-blur-xl lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6"
          >
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-sm text-sky-200">
                <Sparkles size={16} />
                Knowledge repository & insights
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Findle Finance <span className="text-sky-300">Journal</span>
              </h1>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
              Active Publications: <span className="text-sky-300 font-semibold">{BLOG_POSTS.length} Articles</span>
            </div>
          </motion.div>

          {/* Featured Post Banner (Visible on 'ALL' & no search query) */}
          {selectedCategory === 'ALL' && !searchQuery && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-8 overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-6 lg:p-8 relative group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 relative">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="h-full w-full object-cover opacity-70 group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-sky-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    {featuredPost.category}
                  </span>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1"><Clock size={14} /> {featuredPost.readTime}</span>
                      <span>•</span>
                      <span>{featuredPost.date}</span>
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">By {featuredPost.author}</span>
                    <Link
                      href={`/blog/${featuredPost.id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-sky-400 shadow-lg shadow-sky-500/20"
                    >
                      Read article <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Filtering Engine & Search Bar */}
          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto]">
            <input
              type="text"
              placeholder="Search guides, underwriting topics, or market strategies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-sky-400/50 focus:bg-white/10 transition"
            />
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-sky-400/50 transition cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-950 text-white">
                  {cat === 'ALL' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Articles Grid Deck */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group flex flex-col justify-between rounded-[24px] border border-white/10 bg-slate-950/60 p-6 shadow-[0_15px_45px_rgba(2,8,23,0.25)] backdrop-blur-xl transition hover:border-sky-400/30 hover:bg-slate-950/80"
              >
                <div>
                  <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 relative mb-5">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-90 transition duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center rounded-full bg-slate-950/80 border border-white/10 px-3 py-1 text-[10px] font-semibold text-sky-300 backdrop-blur-md">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <User size={12} /> {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                  >
                    Read <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-[32px] border border-white/10 bg-slate-950/60 p-16 text-center backdrop-blur-xl">
            <BookOpen className="mx-auto h-12 w-12 text-slate-500 mb-4" />
            <h3 className="text-lg font-semibold text-white">No matching publications found</h3>
            <p className="mt-1 text-sm text-slate-400">Try adjusting your search terms or selecting a different category filter.</p>
          </div>
        )}

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