import { Calculator, FileText, Banknote, Ship } from 'lucide-react';
import Reveal from '@/components/Reveal';

const steps = [
  {
    num: '01',
    Icon: Calculator,
    title: 'Select & Estimate',
    desc: 'Choose a car and use our price calculator to estimate the total landed cost to your port.',
  },
  {
    num: '02',
    Icon: FileText,
    title: 'Get Proforma Invoice',
    desc: 'We send you an official invoice with our Japan bank details and full cost breakdown.',
  },
  {
    num: '03',
    Icon: Banknote,
    title: 'Telegraphic Transfer',
    desc: 'Wire your payment securely to our company bank account in Japan — never to personal accounts.',
  },
  {
    num: '04',
    Icon: Ship,
    title: 'Customs & Port Pickup',
    desc: 'We handle export documentation, ship the vehicle, and send you the Bill of Lading.',
  },
];

export default function HowToBuy() {
  return (
    <section className="py-16 bg-brand-dark-2 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-12">
          <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Simple Process
          </div>
          <h2 className="text-white font-black text-2xl sm:text-4xl tracking-tight text-balance">
            How to Buy Japanese Cars from Wazir Trading
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1}>
              <div className="relative group h-full">
                <div className="absolute -top-4 -left-2 text-7xl font-black text-white/5 group-hover:text-brand-red/10 transition-colors">
                  {step.num}
                </div>
                <div className="relative glass-card rounded-lg p-6 h-full hover:border-brand-red/30 transition-colors">
                  <div className="w-12 h-12 rounded-sm bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-5">
                    <step.Icon size={22} className="text-brand-red" aria-hidden="true" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
