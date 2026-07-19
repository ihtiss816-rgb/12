import { Calculator, FileText, Banknote, Ship } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from './SectionHeading';

const steps = [
  {
    num: '01',
    icon: Calculator,
    title: 'Select & Estimate',
    desc: 'Choose a car and use our price calculator to see the full landed cost to your port.',
  },
  {
    num: '02',
    icon: FileText,
    title: 'Get Proforma Invoice',
    desc: 'We send you an official invoice with our verified Japan bank details.',
  },
  {
    num: '03',
    icon: Banknote,
    title: 'Telegraphic Transfer',
    desc: 'Wire your payment securely to our company bank account in Japan.',
  },
  {
    num: '04',
    icon: Ship,
    title: 'Customs & Port Pickup',
    desc: 'We handle export shipping and send you the Bill of Lading for collection.',
  },
];

export default function HowToBuy() {
  return (
    <section className="section-padding relative overflow-hidden bg-brand-dark-2">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Simple Process"
            title="How to Buy Japanese Cars from Wazir Trading"
            center
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1}>
              <div className="group relative h-full">
                <div className="pointer-events-none absolute -left-2 -top-4 text-7xl font-black text-white/5 transition-colors duration-300 group-hover:text-brand-red/10">
                  {step.num}
                </div>
                <div className="glass-card relative h-full rounded-lg p-6 transition-colors duration-300 hover:border-brand-red/30">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-sm border border-brand-red/20 bg-brand-red/10">
                    <step.icon size={22} className="text-brand-red" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold tracking-tight text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-brand-gray">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
