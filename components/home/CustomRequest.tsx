'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Reveal from '@/components/Reveal';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '818089227375';

const countries = [
  'Pakistan',
  'UAE',
  'Guyana',
  'UK',
  'Russia',
  'Germany',
  'Jamaica',
  'Kenya',
  'New Zealand',
  'Papua New Guinea',
  'Ghana',
  'Tanzania',
  'Nigeria',
  'Other',
];

const initial = {
  full_name: '',
  email: '',
  whatsapp: '',
  destination_country: '',
  vehicle_model: '',
  budget: '',
  message: '',
};

export default function CustomRequest() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase.from('inquiries').insert({
      inquiry_type: 'custom-request',
      full_name: form.full_name,
      email: form.email,
      whatsapp: form.whatsapp,
      destination_country: form.destination_country || null,
      vehicle_model: form.vehicle_model || null,
      budget: form.budget || null,
      message: form.message,
    });

    if (error) {
      console.log('[v0] custom-request insert error:', error.message);
      setStatus('error');
      return;
    }

    setStatus('success');

    // Open a WhatsApp notification to the sales line.
    const text = encodeURIComponent(
      `New car request from ${form.full_name}\n` +
        `Vehicle: ${form.vehicle_model || 'N/A'}\n` +
        `Budget: ${form.budget || 'N/A'}\n` +
        `Destination: ${form.destination_country || 'N/A'}\n` +
        `Details: ${form.message}`,
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, '_blank', 'noopener,noreferrer');
    setForm(initial);
  };

  const inputClass =
    'w-full rounded-sm border border-white/10 bg-brand-dark-3 px-4 py-3 text-sm text-white placeholder:text-brand-gray focus:border-brand-red/50 focus:outline-none focus:ring-1 focus:ring-brand-red/50';

  return (
    <section className="section-padding relative overflow-hidden bg-brand-dark">
      <div className="absolute inset-0 bg-hero-gradient opacity-50" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-10 text-center">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-red">
              Sourcing Service
            </div>
            <h2 className="text-balance text-3xl font-black tracking-tight text-white sm:text-4xl">
              Can&apos;t Find Your Car?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-brand-gray">
              Tell us what you need and we&apos;ll source it from Japanese auctions.
            </p>
          </div>
        </Reveal>

        <Reveal>
          {status === 'success' ? (
            <div className="glass-card rounded-2xl border-brand-red/20 p-10 text-center">
              <CheckCircle2 size={44} className="mx-auto mb-4 text-green-500" />
              <h3 className="mb-2 text-xl font-bold text-white">Request Received</h3>
              <p className="text-brand-gray">
                Thanks — our team will get back to you within 24 hours. A WhatsApp draft has opened so you can
                message us directly too.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-6 rounded-sm border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  value={form.full_name}
                  onChange={update('full_name')}
                  placeholder="Full Name *"
                  aria-label="Full Name"
                  className={inputClass}
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="Email *"
                  aria-label="Email"
                  className={inputClass}
                />
                <input
                  value={form.whatsapp}
                  onChange={update('whatsapp')}
                  placeholder="WhatsApp Number"
                  aria-label="WhatsApp Number"
                  className={inputClass}
                />
                <select
                  value={form.destination_country}
                  onChange={update('destination_country')}
                  aria-label="Destination Country"
                  className={inputClass}
                >
                  <option value="">Destination Country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  value={form.vehicle_model}
                  onChange={update('vehicle_model')}
                  placeholder="Vehicle Model / Year"
                  aria-label="Vehicle Model and Year"
                  className={inputClass}
                />
                <input
                  value={form.budget}
                  onChange={update('budget')}
                  placeholder="Budget (USD)"
                  aria-label="Budget in USD"
                  className={inputClass}
                />
              </div>
              <textarea
                required
                value={form.message}
                onChange={update('message')}
                placeholder="Requirements — tell us more about the vehicle you're looking for *"
                aria-label="Requirements"
                rows={4}
                className={`${inputClass} mt-4 resize-none`}
              />

              {status === 'error' && (
                <p className="mt-3 text-sm text-brand-red-light">
                  Something went wrong. Please try again or contact us on WhatsApp.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-brand-red px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-light disabled:opacity-60 sm:w-auto"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Request
                  </>
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
