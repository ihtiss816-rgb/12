'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, AlertCircle, Clock, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Reveal from '@/components/Reveal';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '818089227375';

function ContactForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    country: '',
    car_ref: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const carRef = searchParams.get('car');
    if (carRef) {
      setForm((prev) => ({ ...prev, car_ref: carRef, message: `I'm interested in vehicle Ref: ${carRef}. Please provide more details and a shipping quote.` }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const { error } = await supabase.from('inquiries').insert({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone || null,
        country: form.country || null,
        car_ref: form.car_ref || null,
        message: form.message,
      });
      if (error) throw error;
      setStatus('success');
      setForm({ full_name: '', email: '', phone: '', country: '', car_ref: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4">Get in Touch</div>
            <h1 className="text-white font-black text-4xl sm:text-6xl tracking-tight mb-4">Contact Us</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Questions about a vehicle, shipping, or the export process? Reach out — we respond within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <Reveal>
                <div className="glass-card rounded-lg p-6">
                  <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                    <span className="w-5 h-0.5 bg-brand-red" />
                    Japan Office
                  </h3>
                  <div className="space-y-5">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-sm bg-brand-red/10 border border-brand-red/20 flex items-center justify-center flex-shrink-0">
                        <MapPin size={16} className="text-brand-red" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">Address</div>
                        <div className="text-brand-gray text-sm leading-relaxed">Heights Mizutani 1C, 158-1 Jizou, Kuwana-City, Mie-Pref, Japan</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-sm bg-brand-red/10 border border-brand-red/20 flex items-center justify-center flex-shrink-0">
                        <Phone size={16} className="text-brand-red" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">Phone</div>
                        <div className="text-brand-gray text-sm">+81-50-3740-8980</div>
                        <div className="text-brand-gray text-sm">+81-80-8922-7375</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-sm bg-brand-red/10 border border-brand-red/20 flex items-center justify-center flex-shrink-0">
                        <Mail size={16} className="text-brand-red" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">Email</div>
                        <a href="mailto:wazirtrading-pc@outlook.jp" className="text-brand-gray text-sm hover:text-white transition-colors">wazirtrading-pc@outlook.jp</a>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-sm bg-brand-red/10 border border-brand-red/20 flex items-center justify-center flex-shrink-0">
                        <Clock size={16} className="text-brand-red" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">Business Hours</div>
                        <div className="text-brand-gray text-sm">Mon-Fri: 9:00 - 18:00 (JST)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block glass-card rounded-lg p-6 hover:border-[#25D366]/40 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-sm bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center">
                      <MessageCircle size={22} className="text-[#25D366]" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-base">Chat on WhatsApp</div>
                      <div className="text-brand-gray text-sm">Fastest response · +81-80-8922-7375</div>
                    </div>
                  </div>
                </a>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="glass-card rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe size={16} className="text-brand-gold" />
                    <span className="text-white font-semibold text-sm">We Ship To</span>
                  </div>
                  <p className="text-brand-gray text-sm leading-relaxed">
                    Kenya, Tanzania, Uganda, Zimbabwe, Zambia, Ghana, Nigeria, South Africa, Mozambique, Guyana, Trinidad, Sri Lanka, Pakistan, Bangladesh, New Zealand and more.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <Reveal delay={0.1}>
                <div className="glass-card rounded-lg p-6 sm:p-8">
                  <h2 className="text-white font-black text-2xl tracking-tight mb-2">Send an Inquiry</h2>
                  <p className="text-brand-gray text-sm mb-6">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

                  {status === 'success' && (
                    <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/30 rounded-sm p-4 mb-6">
                      <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-white font-semibold text-sm">Inquiry sent successfully!</div>
                        <div className="text-brand-gray text-xs mt-1">We&apos;ll contact you shortly. For urgent matters, message us on WhatsApp.</div>
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
                        <label className="text-brand-gray text-xs uppercase tracking-widest mb-2 block">Full Name *</label>
                        <input
                          type="text"
                          name="full_name"
                          required
                          value={form.full_name}
                          onChange={handleChange}
                          className="w-full bg-brand-dark-2 border border-white/10 focus:border-brand-red text-white px-4 py-3 rounded-sm text-sm outline-none transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="text-brand-gray text-xs uppercase tracking-widest mb-2 block">Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          className="w-full bg-brand-dark-2 border border-white/10 focus:border-brand-red text-white px-4 py-3 rounded-sm text-sm outline-none transition-colors"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-brand-gray text-xs uppercase tracking-widest mb-2 block">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full bg-brand-dark-2 border border-white/10 focus:border-brand-red text-white px-4 py-3 rounded-sm text-sm outline-none transition-colors"
                          placeholder="+254..."
                        />
                      </div>
                      <div>
                        <label className="text-brand-gray text-xs uppercase tracking-widest mb-2 block">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          className="w-full bg-brand-dark-2 border border-white/10 focus:border-brand-red text-white px-4 py-3 rounded-sm text-sm outline-none transition-colors"
                          placeholder="Your country"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-brand-gray text-xs uppercase tracking-widest mb-2 block">Vehicle Reference (optional)</label>
                      <input
                        type="text"
                        name="car_ref"
                        value={form.car_ref}
                        onChange={handleChange}
                        className="w-full bg-brand-dark-2 border border-white/10 focus:border-brand-red text-white px-4 py-3 rounded-sm text-sm outline-none transition-colors"
                        placeholder="e.g. WT-0001"
                      />
                    </div>
                    <div>
                      <label className="text-brand-gray text-xs uppercase tracking-widest mb-2 block">Message *</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        className="w-full bg-brand-dark-2 border border-white/10 focus:border-brand-red text-white px-4 py-3 rounded-sm text-sm outline-none transition-colors resize-none"
                        placeholder="Tell us what you're looking for..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-light disabled:opacity-50 text-white px-6 py-4 rounded-sm font-semibold transition-all duration-200"
                    >
                      {status === 'submitting' ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Inquiry
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-brand-gray">Loading...</div>}>
      <ContactForm />
    </Suspense>
  );
}
