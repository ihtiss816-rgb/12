import { AlertTriangle, Phone, Mail } from 'lucide-react';

export default function AlertBar() {
  return (
    <div className="bg-brand-red text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
        <p className="flex items-start gap-2 leading-snug">
          <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span className="text-pretty">
            <span className="font-bold uppercase tracking-wide">Important:</span>{' '}
            Wazir Trading LLC does <span className="font-bold underline">NOT</span> accept payments to
            personal bank accounts. Our bank account is only in Japan. Contact us immediately if any
            agent requests payment elsewhere.
          </span>
        </p>
        <div className="flex items-center gap-4 lg:ml-auto flex-shrink-0 pl-6 lg:pl-0">
          <a
            href="tel:+818089227375"
            className="flex items-center gap-1.5 font-semibold hover:text-white/80 transition-colors whitespace-nowrap"
          >
            <Phone size={14} aria-hidden="true" />
            +81 80-8922-7375
          </a>
          <a
            href="mailto:wazirtrading-pc@outlook.jp"
            className="flex items-center gap-1.5 font-semibold hover:text-white/80 transition-colors whitespace-nowrap"
          >
            <Mail size={14} aria-hidden="true" />
            wazirtrading-pc@outlook.jp
          </a>
        </div>
      </div>
    </div>
  );
}
