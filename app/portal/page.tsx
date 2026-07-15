"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, ShieldCheck } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

export default function DocumentPortal() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const uploadFile = async () => {
    if (!file) return;
    setStatus('uploading');

    const response = await fetch(`/api/upload?filename=${file.name}`, {
      method: 'POST',
      body: file,
    });

    if (response.ok) {
      setStatus('success');
      setShowSuccessModal(true);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100 selection:bg-sky-500/30">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_30%),linear-gradient(180deg,_rgba(2,6,23,0.85)_0%,_rgba(3,7,18,0.94)_50%,_rgba(4,9,20,0.98)_100%)]" />

      <SiteHeader activePage="portal" />

      <main className="relative z-10 mx-auto w-full max-w-2xl px-4 pb-16 pt-8 sm:px-6">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-8 backdrop-blur-xl">
          <div className="flex items-center gap-3 text-sky-400 mb-6">
            <ShieldCheck size={24} />
            <span className="text-sm uppercase tracking-widest font-semibold">Secure Service Portal</span>
          </div>
          
          <h2 className="text-3xl font-semibold text-white">Request your Audit</h2>
          <p className="mt-2 text-slate-400">Upload your income verification documents to receive your personalized affordability analysis within 2 hours.</p>

          <div className="mt-8 border-2 border-dashed border-white/10 rounded-[24px] p-10 text-center hover:border-sky-500/50 transition">
            <Upload className="mx-auto text-slate-600 mb-4" size={40} />
            <input type="file" className="hidden" id="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <label htmlFor="file" className="cursor-pointer text-sky-400 font-semibold underline">Select document</label>
            <p className="text-slate-500 text-sm mt-1">PDF or Image (Max 10MB)</p>
          </div>

          {file && (
            <div className="mt-6">
              <div className="flex items-center justify-between rounded-xl bg-white/5 p-4 mb-4">
                <div className="flex items-center gap-3"><FileText className="text-sky-400" /> <span>{file.name}</span></div>
              </div>
              <button 
                onClick={uploadFile}
                disabled={status !== 'idle'}
                className="w-full rounded-full bg-sky-500 py-3 font-semibold text-white transition hover:bg-sky-400 disabled:bg-slate-700"
              >
                {status === 'idle' ? 'Upload & Start Audit' : status === 'uploading' ? 'Sending...' : (
                  <span className="inline-flex items-center justify-center gap-2">
                    <CheckCircle size={18} /> Sent
                  </span>
                )}
              </button>
            </div>
          )}

          {status === 'success' && !showSuccessModal && (
            <div className="mt-6 flex items-center gap-2 text-green-400 justify-center">
              <CheckCircle size={20} /> <span className="font-semibold">Documents received!</span>
            </div>
          )}
        </div>
      </main>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6">
          <div className="w-full max-w-lg rounded-[32px] border border-white/10 bg-slate-900/95 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-center rounded-full bg-emerald-500/10 p-4 text-emerald-300">
              <CheckCircle size={28} className="text-emerald-300" />
            </div>
            <h2 className="text-3xl font-semibold text-white text-center">Upload Successful!</h2>
            <p className="mt-4 text-center text-slate-300">
              Thank you for submitting your documents. Your request has been sent successfully and you can stay on this page.
            </p>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}