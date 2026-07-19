'use client';

import { useEffect, useState } from 'react';
import { Car, Clock } from 'lucide-react';

function useJstClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const formatted = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date());
      setTime(formatted);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function InfoBar({ stockCount }: { stockCount: number }) {
  const time = useJstClock();

  return (
    <div className="bg-black text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-center md:justify-between gap-x-6 gap-y-1.5 text-xs sm:text-sm">
        <span className="flex items-center gap-2 font-medium">
          <Car size={15} className="text-brand-red" aria-hidden="true" />
          The Cars Exporting Expert
        </span>

        <span className="flex items-center gap-2 font-medium tabular-nums">
          <Clock size={15} className="text-brand-red" aria-hidden="true" />
          Japan Time (JST):{' '}
          <span className="font-mono font-semibold" suppressHydrationWarning>
            {time || '--:--:--'}
          </span>
        </span>

        <span className="font-medium">
          Total Cars in Stock:{' '}
          <span className="text-brand-red font-bold tabular-nums">{stockCount}</span>
        </span>

        <span className="font-medium">
          $1 = <span className="text-brand-gold font-bold">&yen;145</span>
        </span>
      </div>
    </div>
  );
}
