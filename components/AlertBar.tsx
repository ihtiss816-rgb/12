import { AlertTriangle, Phone, Mail } from 'lucide-react';

export default function AlertBar() {
  return (
    <div className="bg-brand-red text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
          <p className="flex items-start gap-2 text-[11px] sm:text-xs leading-relaxed font-medium">
            <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              <span className="font-bold uppercase">Important:</span> Wazir Trading LLC does NOT accept
              payments to personal bank accounts. Our bank account is only in Japan. Contact us immediately
              if any agent requests payment elsewhere.
            </span>
          </p>
          <div className="flex items-center gap-4 flex-shrink-0 pl-7 lg:pl-0">
            <a
              href="tel:+818089227375"
              className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold hover:underline whitespace-nowrap"
            >
              <Phone size={13} aria-hidden="true" />
              +81 80-8922-7375
            </a>
            <a
              href="mailto:wazirtrading-pc@outlook.jp"
              className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold hover:underline whitespace-nowrap"
            >
              <Mail size={13} aria-hidden="true" />
              wazirtrading-pc@outlook.jp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
