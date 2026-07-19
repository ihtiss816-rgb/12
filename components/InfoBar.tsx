'use client';

import { useEffect, useState } from 'react';
import { Car, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

function useJapanClock() {
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

export default function InfoBar() {
  const jst = useJapanClock();
  const [stockCount, setStockCount] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const { count } = await supabase
        .from('cars')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Available');
      setStockCount(count ?? 0);
    })();
  }, []);

  return (
    <div className="bg-black text-white border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 font-semibold">
            <Car size={14} className="text-brand-red" aria-hidden="true" />
            <span>The Cars Exporting Expert</span>
          </div>

          <div className="flex items-center gap-2 font-medium tabular-nums">
            <Clock size={14} className="text-brand-gold" aria-hidden="true" />
            <span className="text-white/70">Japan Time (JST):</span>
            <span className="font-bold tracking-wider">{jst || '--:--:--'}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-medium">
              Total Cars in Stock:{' '}
              <span className="font-bold text-brand-red">
                {stockCount === null ? '…' : stockCount.toLocaleString()}
              </span>
            </span>
            <span className="font-bold text-brand-gold whitespace-nowrap">$1 = ¥145</span>
          </div>
        </div>
      </div>
    </div>
  );
}
