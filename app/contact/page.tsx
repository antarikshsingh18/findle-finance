"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ContactPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    contactMethod: "Call",
    bestTime: "Morning",
    clientType: "First-Time Buyer",
    inquiryType: "Mortgage Inquiry",
    propertyType: "Residential",
    budget: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1000);
  };

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

      {/* Main Container */}
      <main className="max-w-4xl mx-auto bg-slate-900/50 border border-white/10 p-8 md:p-12 rounded-2xl shadow-xl space-y-12">
        
        {/* Header Section */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Let&apos;s Talk Mortgages</h1>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            Have a question about financing, rates, or your next property purchase? Our team is ready to help — no jargon, no pressure, just clarity.
          </p>
          <p className="text-xs text-sky-400 font-medium">Average response time: 24 hours or less.</p>
        </div>

        {/* Get In Touch Cards */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Get In Touch</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-slate-950 border border-white/10 p-5 rounded-xl space-y-2">
              <span className="text-xl">📞</span>
              <h3 className="text-sm font-medium text-white">Call or Text</h3>
              <p className="text-xs text-slate-400">+1 (437) 432-0003</p>
              <p className="text-[11px] text-slate-500">Mon–Fri: 9AM–6PM EST<br />Sat: By Appointment</p>
            </div>
            <a 
  href="mailto:info@findle.global?subject=Inquiry%20Regarding%20Findle%20Finance"
  className="bg-slate-950 border border-white/10 p-5 rounded-xl space-y-2 block hover:border-sky-500 transition-colors cursor-pointer group"
>
  <span className="text-xl">📧</span>
  <h3 className="text-sm font-medium text-white group-hover:text-sky-400 transition-colors">Email Us</h3>
  <p className="text-xs text-slate-400">info@findle.global</p>
  <p className="text-[11px] text-slate-500">We respond within 1 business day.</p>
</a>
            <div className="bg-slate-950 border border-white/10 p-5 rounded-xl space-y-2">
              <span className="text-xl">📅</span>
              <h3 className="text-sm font-medium text-white">Book a Call</h3>
              <p className="text-xs text-slate-400">Free Consultation</p>
              <Link href="/portal" className="inline-block text-xs text-sky-400 hover:underline pt-1">Schedule now →</Link>
            </div>
          </div>
        </div>

        {/* What Can We Help You With */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">What Can We Help You With?</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-950/60 border border-white/10 p-4 rounded-xl space-y-1">
              <h3 className="font-semibold text-white"> First-Time Home Buyers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">We&apos;ll walk you through qualification, programs, and what to expect from the mortgage process.</p>
            </div>
            <div className="bg-slate-950/60 border border-white/10 p-4 rounded-xl space-y-1">
              <h3 className="font-semibold text-white"> Preconstruction Financing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Plan your financing from deposit stage all the way to final closing for your new development.</p>
            </div>
            <div className="bg-slate-950/60 border border-white/10 p-4 rounded-xl space-y-1">
              <h3 className="font-semibold text-white"> Investment & Commercial</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Specialized underwriting and investor-specific mortgage structures for your portfolio.</p>
            </div>
            <div className="bg-slate-950/60 border border-white/10 p-4 rounded-xl space-y-1">
              <h3 className="font-semibold text-white"> Renewals & Refinancing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Unlock home equity or shop the market for a better deal than your current lender offers.</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="border-t border-white/10 pt-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Send Us a Message</h2>
            <p className="text-xs text-slate-400">Fill out the form below and a Findle Finance mortgage agent will be in touch within 1 business day.</p>
          </div>

          {status === "success" ? (
            <div className="p-6 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-sm space-y-2">
              <p className="font-semibold">Message Sent Successfully!</p>
              <p className="text-xs">Thank you for reaching out. A mortgage agent will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-sm">
              
              {/* Your Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Your Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Preferred Contact Method</label>
                    <select
                      name="contactMethod"
                      value={formData.contactMethod}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="Call">Call</option>
                      <option value="Text">Text</option>
                      <option value="Email">Email</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Best Time to Reach You</label>
                    <select
                      name="bestTime"
                      value={formData.bestTime}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Your Inquiry */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Your Inquiry</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">I Am A...</label>
                    <select
                      name="clientType"
                      value={formData.clientType}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="First-Time Buyer">First-Time Buyer</option>
                      <option value="Repeat Buyer">Repeat Buyer</option>
                      <option value="Investor">Investor</option>
                      <option value="Commercial Buyer">Commercial Buyer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">I&apos;m Inquiring About...</label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="Mortgage Inquiry">Mortgage Inquiry</option>
                      <option value="Pre-Approval Request">Pre-Approval Request</option>
                      <option value="Preconstruction Financing">Preconstruction Financing</option>
                      <option value="Renewal or Refinancing">Renewal or Refinancing</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Property Type</label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Preconstruction">Preconstruction</option>
                      <option value="Investment">Investment</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Not Sure Yet">Not Sure Yet</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Approximate Budget or Property Value <span className="text-slate-500">(Optional)</span></label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="$800,000"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Your Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us a bit about your situation and what you're looking for..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium transition-colors"
                >
                  Send Message
                </button>
                <p className="text-[11px] text-slate-500 text-center">
                  By submitting this form, you agree to Findle Finance&apos;s Privacy Policy and consent to being contacted by our mortgage team regarding your inquiry.
                </p>
              </div>

            </form>
          )}
        </div>

        {/* Not Ready to Talk Yet? */}
        <div className="border-t border-white/10 pt-8 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Not Ready to Talk Yet?</h3>
          <p className="text-xs text-slate-400">That&apos;s completely fine. Start with our free tools and come back when you&apos;re ready.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link href="/Calculator" className="p-3 bg-slate-950 border border-white/10 rounded-xl text-center hover:border-sky-500 transition-colors text-slate-300"> Mortgage Calculator</Link>
            <Link href="/land-transfer-tax" className="p-3 bg-slate-950 border border-white/10 rounded-xl text-center hover:border-sky-500 transition-colors text-slate-300"> Land Transfer Tax</Link>
            <Link href="/portal" className="p-3 bg-slate-950 border border-white/10 rounded-xl text-center hover:border-sky-500 transition-colors text-slate-300"> Get Pre-Approved</Link>
            <Link href="/mortgages" className="p-3 bg-slate-950 border border-white/10 rounded-xl text-center hover:border-sky-500 transition-colors text-slate-300"> View Mortgages</Link>
          </div>
        </div>

        {/* Regulatory Note */}
        <div className="border-t border-white/10 pt-6 text-[11px] text-slate-500 space-y-2">
          <p className="font-semibold text-slate-400 uppercase tracking-wider">Regulatory Note</p>
          <p className="leading-relaxed">
            Findle Finance operates through licensed mortgage agents affiliated with registered mortgage brokerages in Ontario, regulated by the Financial Services Regulatory Authority of Ontario (FSRA). All information provided through this contact form is kept strictly confidential in accordance with our <Link href="/privacy-policy" className="text-sky-400 hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-white/10 pt-8 text-center space-y-4">
          <p className="text-sm font-medium text-white">Ready to take the next step? Whether you&apos;re just exploring or ready to move forward — we&apos;re here.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/portal" className="py-2.5 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition-colors">📅 Book a Free Call</Link>
            <Link href="/portal" className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-white/10 transition-colors">⚡ Start Pre-Approval</Link>
          </div>
        </div>

      </main>
    </div>
  );
}