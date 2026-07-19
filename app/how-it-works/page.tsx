import Link from 'next/link';
import {
  Search,
  FileCheck,
  CreditCard,
  Ship,
  Car,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  Package,
  Globe,
  HelpCircle,
} from 'lucide-react';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'How It Works — Wazir Trading LLC' };

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Browse & Select',
    desc: 'Explore our verified inventory online. Use filters to find vehicles by make, year, price, transmission, fuel type, and body type. Each listing includes full specifications and real photos.',
    points: ['Filter by make, model, year, price', 'View detailed specs and photos', 'Check FOB price and availability'],
  },
  {
    icon: FileCheck,
    number: '02',
    title: 'Place an Inquiry',
    desc: 'Submit an inquiry through our website or message us directly on WhatsApp. Share the vehicle reference number and your destination port. We respond within 24 hours with a detailed quote.',
    points: ['Inquiry form or WhatsApp', 'Receive detailed invoice', 'Get shipping quote to your port'],
  },
  {
    icon: CreditCard,
    number: '03',
    title: 'Make Payment',
    desc: 'Once you approve the proforma invoice, make payment via bank transfer (TT). We confirm receipt and immediately begin the export process — booking the vehicle for the next available vessel.',
    points: ['Bank transfer (Telegraphic Transfer)', 'Invoice with full cost breakdown', 'Payment confirmation within 24h'],
  },
  {
    icon: Ship,
    number: '04',
    title: 'We Handle Export',
    desc: 'We manage all Japanese-side documentation: export certificate, deregistration, customs clearance, and vessel booking. Your vehicle is loaded at Yokohama, Nagoya, or Kobe port.',
    points: ['Export certificate & deregistration', 'Customs clearance handled', 'Vessel booking (RORO or container)'],
  },
  {
    icon: Package,
    number: '05',
    title: 'Track Your Shipment',
    desc: 'Receive your Bill of Lading and shipping documents by courier. Track your vessel online and get estimated arrival dates. We stay in contact throughout the voyage.',
    points: ['Bill of Lading issued', 'Documents couriered to you', 'Real-time vessel tracking'],
  },
  {
    icon: Car,
    number: '06',
    title: 'Receive at Port',
    desc: 'Your vehicle arrives at your destination port. Clear local customs with the documents we provided, and drive your new car home. We are available for any post-delivery support you need.',
    points: ['Arrival notification', 'Customs clearance at destination', 'Post-delivery support'],
  },
];

const faqs = [
  {
    q: 'What is FOB price?',
    a: 'FOB (Free On Board) is the price of the vehicle loaded onto the vessel at the Japanese port. It does not include shipping to your destination, marine insurance, or local customs duties — these are quoted separately based on your port.',
  },
  {
    q: 'What shipping methods do you offer?',
    a: 'We offer both RORO (Roll-on/Roll-off) and container shipping. RORO is typically more affordable for single vehicles, while containers are better for multiple vehicles or high-value cars needing extra protection.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Transit times vary by destination. East Africa (Mombasa, Dar es Salaam) takes about 28-35 days. South Asia (Karachi, Colombo) takes 16-20 days. Caribbean ports take 40-45 days. We provide exact estimates with your quote.',
  },
  {
    q: 'What documents will I receive?',
    a: 'You will receive the Export Certificate, Bill of Lading, commercial invoice, and any additional documents required by your destination country. These are couriered to you as soon as the vessel departs.',
  },
  {
    q: 'How do I pay?',
    a: 'Payment is via bank Telegraphic Transfer (TT) to our Japanese bank account. Full payment is required before the vehicle is booked for shipping. We provide a proforma invoice with all bank details.',
  },
  {
    q: 'Can I inspect a car before buying?',
    a: 'All vehicles in our inventory have been physically inspected by our team in Japan, with detailed photos and condition reports published on each listing. For auction-source vehicles, we can provide additional inspection sheets on request.',
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-hero-gradient" />
        <div className="absolute inset-0 z-0 opacity-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Shipping"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4">The Process</div>
            <h1 className="text-white font-black text-4xl sm:text-6xl tracking-tight mb-6">
              How It Works
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Six simple steps from browsing our inventory to receiving your vehicle at your destination port. Transparent, reliable, and fully supported at every stage.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-6">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.05}>
                <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
                  <div className="flex md:flex-col items-center md:items-start gap-4">
                    <div className="w-16 h-16 rounded-sm bg-brand-red flex items-center justify-center flex-shrink-0">
                      <step.icon size={26} className="text-white" />
                    </div>
                    <div className="text-6xl font-black text-white/5 hidden md:block">{step.number}</div>
                  </div>
                  <div className="glass-card rounded-lg p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Step {step.number}</span>
                      <span className="h-px flex-1 bg-white/10" />
                    </div>
                    <h3 className="text-white font-black text-2xl tracking-tight mb-3">{step.title}</h3>
                    <p className="text-brand-gray leading-relaxed mb-5">{step.desc}</p>
                    <div className="grid sm:grid-cols-3 gap-2">
                      {step.points.map((p) => (
                        <div key={p} className="flex items-center gap-2 text-white/80 text-sm">
                          <CheckCircle2 size={14} className="text-brand-red flex-shrink-0" />
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Summary */}
      <section className="section-padding bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-12">
            <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">What to Expect</div>
            <h2 className="text-white font-black text-3xl sm:text-4xl tracking-tight">Timeline at a Glance</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, label: 'Inquiry Response', value: '< 24 hours' },
              { icon: FileText, label: 'Documentation', value: '3-5 days' },
              { icon: Ship, label: 'Vessel Booking', value: '1-2 weeks' },
              { icon: Globe, label: 'Transit Time', value: '16-45 days' },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.1}>
                <div className="glass-card rounded-lg p-6 text-center h-full">
                  <item.icon size={28} className="text-brand-red mx-auto mb-4" />
                  <div className="text-white font-black text-2xl tracking-tight mb-1">{item.value}</div>
                  <div className="text-brand-gray text-xs uppercase tracking-widest">{item.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-12">
            <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">Questions?</div>
            <h2 className="text-white font-black text-3xl sm:text-4xl tracking-tight flex items-center justify-center gap-3">
              <HelpCircle className="text-brand-red" />
              Frequently Asked Questions
            </h2>
          </Reveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <details className="group glass-card rounded-lg overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                    <h3 className="text-white font-semibold text-base">{faq.q}</h3>
                    <span className="w-8 h-8 rounded-sm bg-brand-red/10 border border-brand-red/20 flex items-center justify-center flex-shrink-0 group-open:bg-brand-red group-open:rotate-45 transition-all duration-200">
                      <span className="text-brand-red group-open:text-white text-xl leading-none">+</span>
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-brand-gray leading-relaxed text-sm">{faq.a}</div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-dark-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <h2 className="text-white font-black text-3xl sm:text-4xl tracking-tight mb-4">
              Ready to Start?
            </h2>
            <p className="text-brand-gray text-lg mb-8">
              Browse our inventory or reach out with any questions. We&apos;re here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cars"
                className="group inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-light text-white px-8 py-4 rounded-sm font-semibold transition-all duration-200"
              >
                Browse Inventory
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white px-8 py-4 rounded-sm font-semibold transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
