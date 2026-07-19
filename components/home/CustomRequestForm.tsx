'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const WHATSAPP = '818089227375';

const countries = [
  'Pakistan', 'UAE', 'Guyana', 'UK', 'Russia', 'Germany', 'Jamaica', 'Kenya',
  'New Zealand', 'Papua New Guinea', 'Ghana', 'Tanzania', 'Nigeria', 'Other',
];

const empty = {
  customer_name: '',
  email: '',
  whatsapp: '',
  destination_country: '',
  vehicle: '',
  budget: '',
  requirements: '',
};

export default function CustomRequestForm() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const notifyWhatsApp = () => {
    const text = encodeURIComponent(
      `New Car Request from ${form.customer_name}\n` +
        `Email: ${form.email}\n` +
        `WhatsApp: ${form.whatsapp}\n` +
        `Destination: ${form.destination_country}\n` +
        `Vehicle: ${form.vehicle}\n` +
        `Budget (USD): ${form.budget}\n` +
        `Requirements: ${form.requirements}`,
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const { error } = await supabase.from('inquiries').insert({
        customer_name: form.customer_name,
        email: form.email,
        whatsapp: form.whatsapp || null,
        destination_country: form.destination_country || null,
        car_name: form.vehicle || null,
        offer_price: form.budget ? Number(form.budget) : null,
        message: form.requirements || null,
        inquiry_type: 'custom-request',
      });
      if (error) throw error;
      notifyWhatsApp();
      setStatus('success');
      setForm(empty);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const inputCls =
    'w-full bg-brand-dark border border-white/10 focus:border-brand-red text-white px-4 py-3 rounded-sm text-sm outline-none transition-colors';
  const labelCls = 'text-brand-gray text-xs uppercase tracking-widest mb-2 block';

  return (
    <section className="py-16 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-60" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-white font-black text-2xl sm:text-4xl tracking-tight mb-3">
            Can&apos;t Find Your Car?
          </h2>
          <p className="text-brand-gray text-lg text-pretty">
            Tell us what you need and we&apos;ll source it from Japanese auctions.
          </p>
        </div>

        <div className="glass-card rounded-xl p-6 sm:p-8">
          {status === 'success' && (
            <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/30 rounded-sm p-4 mb-6">
              <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white font-semibold text-sm">Request submitted!</div>
                <div className="text-brand-gray text-xs mt-1">
                  We&apos;ve opened WhatsApp so you can send us the details directly. Our team will
                  respond shortly.
                </div>
              </div>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-sm p-4 mb-6">
              <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white font-semibold text-sm">Something went wrong.</div>
                <div className="text-brand-gray text-xs mt-1">{errorMsg}</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cr-name" className={labelCls}>Name *</label>
                <input id="cr-name" name="customer_name" required value={form.customer_name} onChange={handleChange} className={inputCls} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="cr-email" className={labelCls}>Email *</label>
                <input id="cr-email" type="email" name="email" required value={form.email} onChange={handleChange} className={inputCls} placeholder="you@example.com" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cr-wa" className={labelCls}>WhatsApp</label>
                <input id="cr-wa" name="whatsapp" value={form.whatsapp} onChange={handleChange} className={inputCls} placeholder="+92..." />
              </div>
              <div>
                <label htmlFor="cr-country" className={labelCls}>Destination Country</label>
                <select id="cr-country" name="destination_country" value={form.destination_country} onChange={handleChange} className={`${inputCls} cursor-pointer`}>
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cr-vehicle" className={labelCls}>Vehicle Model / Year</label>
                <input id="cr-vehicle" name="vehicle" value={form.vehicle} onChange={handleChange} className={inputCls} placeholder="e.g. Toyota Prado 2018" />
              </div>
              <div>
                <label htmlFor="cr-budget" className={labelCls}>Budget (USD)</label>
                <input id="cr-budget" type="number" min="0" name="budget" value={form.budget} onChange={handleChange} className={inputCls} placeholder="e.g. 5000" />
              </div>
            </div>

            <div>
              <label htmlFor="cr-req" className={labelCls}>Requirements</label>
              <textarea id="cr-req" name="requirements" rows={4} value={form.requirements} onChange={handleChange} className={`${inputCls} resize-none`} placeholder="Color, grade, mileage, or any specific needs..." />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-light disabled:opacity-50 text-white px-6 py-4 rounded-sm font-semibold transition-all duration-200"
            >
              {status === 'submitting' ? (
                'Submitting...'
              ) : (
                <>
                  <Send size={16} />
                  Submit Request
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
