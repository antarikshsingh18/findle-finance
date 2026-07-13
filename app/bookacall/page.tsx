"use client";

import React from "react";
import Link from "next/link";
import { CalendarDays, Clock, ArrowLeft } from "lucide-react";
import SiteHeader from "../../components/SiteHeader";

export default function BookCallPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100 selection:bg-sky-500/30">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_30%),linear-gradient(180deg,_rgba(2,6,23,0.85)_0%,_rgba(3,7,18,0.94)_50%,_rgba(4,9,20,0.98)_100%)]" />

      <SiteHeader activePage="book-call" />

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-sm text-sky-200">
            <CalendarDays size={16} />
            Schedule a consultation
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Let's discuss your financing.
          </h1>
          <p className="mt-5 text-lg text-slate-300">
            Choose a time that works best for you to review your mortgage options with Nidhi Sharma.
          </p>
        </div>

        {/* Booking Section */}
        <section className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr]">
          {/* Details Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-8 shadow-[0_24px_80px_rgba(2,8,23,0.28)] backdrop-blur-xl">
              <h2 className="text-xl font-semibold text-white">What to expect</h2>
              <div className="mt-6 space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 rounded-full bg-sky-500/10 p-2 text-sky-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-white">30 Minute Session</p>
                    <p className="text-sm text-slate-400">Deep dive into your mortgage eligibility and planning.</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-300">
                  Please have your documentation ready, including proof of income and current debt obligations for a more accurate assessment.
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Form */}
          <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-4 shadow-[0_24px_80px_rgba(2,8,23,0.28)] backdrop-blur-xl sm:p-8">
            <form className="flex flex-col gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                  placeholder="for example:+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-white">
                  Preferred Time
                </label>
                <select
                  id="time"
                  name="time"
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-3 text-white transition focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                >
                  <option value="">Select a time slot</option>
                  <option value="9am">9:00 AM</option>
                  <option value="10am">10:00 AM</option>
                  <option value="11am">11:00 AM</option>
                  <option value="2pm">2:00 PM</option>
                  <option value="3pm">3:00 PM</option>
                  <option value="4pm">4:00 PM</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white">
                  Questions or Notes (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                  placeholder="Tell us about your financing needs..."
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-3 font-medium text-white transition hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
              >
                Schedule Consultation
              </button>
            </form>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/compliance"
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={16} /> Back to Compliance
          </Link>
        </div>
      </main>
    </div>
  );
}