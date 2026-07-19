import { BadgeCheck, FileCheck, ShieldCheck, PackageCheck } from 'lucide-react';
import Reveal from '@/components/Reveal';

const badges = [
  { icon: BadgeCheck, label: 'JUMVEA Member', sub: 'Registered exporter body' },
  { icon: FileCheck, label: 'Japan Export License', sub: 'Fully licensed & compliant' },
  { icon: ShieldCheck, label: 'Secure Bank Transfer', sub: 'Verified Japan account only' },
  { icon: PackageCheck, label: '100% Insured Delivery', sub: 'Covered port to port' },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-white/5 bg-brand-dark py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {badges.map((b, i) => (
            <Reveal key={b.label} delay={i * 0.08}>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-sm border border-brand-gold/20 bg-brand-gold/10">
                  <b.icon size={22} className="text-brand-gold" />
                </div>
                <div>
                  <div className="text-sm font-bold tracking-tight text-white">{b.label}</div>
                  <div className="text-xs text-brand-gray">{b.sub}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
