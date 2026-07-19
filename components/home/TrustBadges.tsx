import { BadgeCheck, FileCheck, ShieldCheck, PackageCheck } from 'lucide-react';
import Reveal from '@/components/Reveal';

const badges = [
  { Icon: BadgeCheck, title: 'JUMVEA Member', desc: 'Registered used-vehicle exporter association' },
  { Icon: FileCheck, title: 'Japan Export License', desc: 'Fully licensed & compliant exporter' },
  { Icon: ShieldCheck, title: 'Secure Bank Transfer', desc: 'Payments only to our Japan bank account' },
  { Icon: PackageCheck, title: '100% Insured Delivery', desc: 'Every shipment fully insured to port' },
];

export default function TrustBadges() {
  return (
    <section className="py-16 bg-brand-dark-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <div className="glass-card rounded-lg p-6 flex items-start gap-4 h-full">
                <span className="w-11 h-11 rounded-sm bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center flex-shrink-0">
                  <b.Icon size={22} className="text-brand-gold" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">{b.title}</h3>
                  <p className="text-brand-gray text-xs leading-relaxed">{b.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
