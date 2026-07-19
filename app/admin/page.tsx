'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { CarWithImages, Inquiry, ShippingRate, ExchangeRate } from '@/lib/types';
import { Lock, LogOut, Car, Mail, Ship, DollarSign, Plus, Pencil, Trash2, X, Check, AlertCircle } from 'lucide-react';

type Tab = 'cars' | 'inquiries' | 'shipping' | 'rates';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [tab, setTab] = useState<Tab>('cars');
  const [cars, setCars] = useState<CarWithImages[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [shipping, setShipping] = useState<ShippingRate[]>([]);
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Car editor
  const [editingCar, setEditingCar] = useState<any>(null);
  const [showCarModal, setShowCarModal] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setAuthed(true);
      setChecking(false);
    })();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
      setAuthLoading(false);
    } else {
      setAuthed(true);
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthed(false);
  };

  const loadData = async (which: Tab) => {
    setLoadingData(true);
    if (which === 'cars') {
      const { data } = await supabase.from('cars').select('*, car_images(*)').order('created_at', { ascending: false });
      setCars((data as CarWithImages[]) || []);
    } else if (which === 'inquiries') {
      const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      setInquiries((data as Inquiry[]) || []);
    } else if (which === 'shipping') {
      const { data } = await supabase.from('shipping_rates').select('*').order('destination_country');
      setShipping((data as ShippingRate[]) || []);
    } else if (which === 'rates') {
      const { data } = await supabase.from('exchange_rates').select('*').order('target_currency');
      setRates((data as ExchangeRate[]) || []);
    }
    setLoadingData(false);
  };

  useEffect(() => {
    if (authed) loadData(tab);
  }, [authed, tab]);

  // Car CRUD
  const saveCar = async () => {
    if (!editingCar) return;
    const { id, car_images, created_at, updated_at, ...fields } = editingCar as any;
    if (id) {
      await supabase.from('cars').update(fields).eq('id', id);
    } else {
      const { data } = await supabase.from('cars').insert({ ...fields, ref_number: fields.ref_number || `WT-${String(Date.now()).slice(-6)}` }).select().single();
      if (data && editingCar.car_images?.length) {
        for (const img of editingCar.car_images) {
          if (img.url) await supabase.from('car_images').insert({ car_id: data.id, url: img.url, is_primary: img.is_primary || false, display_order: img.display_order || 0 });
        }
      }
    }
    setShowCarModal(false);
    setEditingCar(null);
    loadData('cars');
  };

  const deleteCar = async (id: string) => {
    if (!confirm('Delete this car and all its images?')) return;
    await supabase.from('cars').delete().eq('id', id);
    loadData('cars');
  };

  const updateInquiryStatus = async (id: string, status: string) => {
    await supabase.from('inquiries').update({ status }).eq('id', id);
    loadData('inquiries');
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    await supabase.from('inquiries').delete().eq('id', id);
    loadData('inquiries');
  };

  if (checking) {
    return <div className="pt-32 text-center text-brand-gray">Loading...</div>;
  }

  if (!authed) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="glass-card rounded-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-sm bg-brand-red/10 border border-brand-red/30 flex items-center justify-center">
                <Lock size={28} className="text-brand-red" />
              </div>
            </div>
            <h1 className="text-white font-black text-2xl tracking-tight text-center mb-2">Admin Access</h1>
            <p className="text-brand-gray text-sm text-center mb-6">Sign in to manage your inventory.</p>
            {authError && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-sm p-3 mb-4">
                <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                <span className="text-red-400 text-xs">{authError}</span>
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin email"
                className="w-full bg-brand-dark-2 border border-white/10 focus:border-brand-red text-white px-4 py-3 rounded-sm text-sm outline-none"
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-brand-dark-2 border border-white/10 focus:border-brand-red text-white px-4 py-3 rounded-sm text-sm outline-none"
              />
              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-brand-red hover:bg-brand-red-light disabled:opacity-50 text-white px-6 py-3 rounded-sm font-semibold transition-colors"
              >
                {authLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'cars', label: 'Cars', icon: Car },
    { id: 'inquiries', label: 'Inquiries', icon: Mail },
    { id: 'shipping', label: 'Shipping', icon: Ship },
    { id: 'rates', label: 'Exchange Rates', icon: DollarSign },
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-brand-dark-2 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <div>
            <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-1">Admin Panel</div>
            <h1 className="text-white font-black text-2xl tracking-tight">Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-brand-gray hover:text-white text-sm transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-white/5 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab === t.id
                  ? 'text-white border-brand-red'
                  : 'text-brand-gray border-transparent hover:text-white'
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {loadingData ? (
          <div className="text-center py-20 text-brand-gray">Loading...</div>
        ) : tab === 'cars' ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-brand-gray text-sm">{cars.length} vehicle(s)</p>
              <button
                onClick={() => { setEditingCar({ status: 'Available', featured: false, condition: 'Used', steering: 'Right Hand Drive', port_of_loading: 'Yokohama' }); setShowCarModal(true); }}
                className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-light text-white px-4 py-2 rounded-sm text-sm font-semibold transition-colors"
              >
                <Plus size={16} /> Add Car
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-brand-gray-dark text-xs uppercase tracking-widest border-b border-white/5">
                    <th className="text-left py-3 px-2">Ref</th>
                    <th className="text-left py-3 px-2">Vehicle</th>
                    <th className="text-left py-3 px-2">Price</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-right py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((c) => (
                    <tr key={c.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-2 text-brand-gold font-mono text-xs">{c.ref_number}</td>
                      <td className="py-3 px-2 text-white">{c.year} {c.make} {c.model}</td>
                      <td className="py-3 px-2 text-white">${c.price_usd.toLocaleString()}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-0.5 rounded-sm text-xs font-semibold ${
                          c.status === 'Available' ? 'bg-green-500/20 text-green-400' :
                          c.status === 'Sold' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>{c.status}</span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button onClick={() => { setEditingCar(c); setShowCarModal(true); }} className="p-1.5 text-brand-gray hover:text-white"><Pencil size={14} /></button>
                        <button onClick={() => deleteCar(c.id)} className="p-1.5 text-brand-gray hover:text-red-500"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : tab === 'inquiries' ? (
          <div className="space-y-4">
            {inquiries.length === 0 ? (
              <p className="text-brand-gray text-center py-20">No inquiries yet.</p>
            ) : (
              inquiries.map((inq) => (
                <div key={inq.id} className="glass-card rounded-lg p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="text-white font-semibold">{inq.full_name}</div>
                      <div className="text-brand-gray text-xs">{inq.email} {inq.phone && `· ${inq.phone}`}</div>
                      {inq.country && <div className="text-brand-gray text-xs">{inq.country}</div>}
                    </div>
                    <div className="flex items-center gap-2">
                      {inq.car_ref && <span className="text-brand-gold text-xs font-mono">Ref: {inq.car_ref}</span>}
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                        className="bg-brand-dark-2 border border-white/10 text-white text-xs px-2 py-1 rounded-sm outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <button onClick={() => deleteInquiry(inq.id)} className="p-1.5 text-brand-gray hover:text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </div>
                  <p className="text-brand-gray text-sm leading-relaxed bg-brand-dark-2 rounded-sm p-3">{inq.message}</p>
                  <div className="text-brand-gray-dark text-xs mt-2">{new Date(inq.created_at).toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        ) : tab === 'shipping' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-brand-gray-dark text-xs uppercase tracking-widest border-b border-white/5">
                  <th className="text-left py-3 px-2">Country</th>
                  <th className="text-left py-3 px-2">Port</th>
                  <th className="text-left py-3 px-2">RORO</th>
                  <th className="text-left py-3 px-2">20ft</th>
                  <th className="text-left py-3 px-2">40ft</th>
                  <th className="text-left py-3 px-2">Days</th>
                </tr>
              </thead>
              <tbody>
                {shipping.map((s) => (
                  <tr key={s.id} className="border-b border-white/5">
                    <td className="py-3 px-2 text-white">{s.destination_country}</td>
                    <td className="py-3 px-2 text-brand-gray">{s.destination_port}</td>
                    <td className="py-3 px-2 text-brand-gold">${s.roro_price_usd?.toLocaleString() || '—'}</td>
                    <td className="py-3 px-2 text-brand-gray">${s.container_20ft_usd?.toLocaleString() || '—'}</td>
                    <td className="py-3 px-2 text-brand-gray">${s.container_40ft_usd?.toLocaleString() || '—'}</td>
                    <td className="py-3 px-2 text-brand-gray">{s.transit_days || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-brand-gray-dark text-xs uppercase tracking-widest border-b border-white/5">
                  <th className="text-left py-3 px-2">Base</th>
                  <th className="text-left py-3 px-2">Target</th>
                  <th className="text-left py-3 px-2">Rate</th>
                  <th className="text-left py-3 px-2">Updated</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((r) => (
                  <tr key={r.id} className="border-b border-white/5">
                    <td className="py-3 px-2 text-white">{r.base_currency}</td>
                    <td className="py-3 px-2 text-white">{r.target_currency}</td>
                    <td className="py-3 px-2 text-brand-gold">{r.rate}</td>
                    <td className="py-3 px-2 text-brand-gray">{new Date(r.updated_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Car Edit Modal */}
      {showCarModal && editingCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowCarModal(false)}>
          <div className="bg-brand-dark-2 border border-white/10 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-lg">{editingCar.id ? 'Edit Car' : 'Add New Car'}</h2>
              <button onClick={() => setShowCarModal(false)} className="text-brand-gray hover:text-white"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'ref_number', label: 'Ref Number', type: 'text' },
                { key: 'make', label: 'Make', type: 'text' },
                { key: 'model', label: 'Model', type: 'text' },
                { key: 'year', label: 'Year', type: 'number' },
                { key: 'price_usd', label: 'Price (USD)', type: 'number' },
                { key: 'mileage', label: 'Mileage (km)', type: 'number' },
                { key: 'engine_cc', label: 'Engine (cc)', type: 'number' },
                { key: 'color', label: 'Color', type: 'text' },
                { key: 'body_type', label: 'Body Type', type: 'text' },
                { key: 'doors', label: 'Doors', type: 'number' },
                { key: 'seats', label: 'Seats', type: 'number' },
                { key: 'grade', label: 'Grade', type: 'text' },
                { key: 'chassis_number', label: 'Chassis No.', type: 'text' },
                { key: 'engine_number', label: 'Engine No.', type: 'text' },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-brand-gray text-xs uppercase tracking-widest mb-1 block">{f.label}</label>
                  <input
                    type={f.type}
                    value={(editingCar as any)[f.key] ?? ''}
                    onChange={(e) => setEditingCar({ ...editingCar, [f.key]: f.type === 'number' ? (e.target.value ? Number(e.target.value) : null) : e.target.value })}
                    className="w-full bg-brand-dark border border-white/10 focus:border-brand-red text-white px-3 py-2 rounded-sm text-sm outline-none"
                  />
                </div>
              ))}
              <div>
                <label className="text-brand-gray text-xs uppercase tracking-widest mb-1 block">Transmission</label>
                <select
                  value={editingCar.transmission || ''}
                  onChange={(e) => setEditingCar({ ...editingCar, transmission: e.target.value || null })}
                  className="w-full bg-brand-dark border border-white/10 text-white px-3 py-2 rounded-sm text-sm outline-none"
                >
                  <option value="">—</option>
                  <option>Automatic</option><option>Manual</option><option>CVT</option>
                </select>
              </div>
              <div>
                <label className="text-brand-gray text-xs uppercase tracking-widest mb-1 block">Fuel Type</label>
                <select
                  value={editingCar.fuel_type || ''}
                  onChange={(e) => setEditingCar({ ...editingCar, fuel_type: e.target.value || null })}
                  className="w-full bg-brand-dark border border-white/10 text-white px-3 py-2 rounded-sm text-sm outline-none"
                >
                  <option value="">—</option>
                  <option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option>
                </select>
              </div>
              <div>
                <label className="text-brand-gray text-xs uppercase tracking-widest mb-1 block">Drive Type</label>
                <select
                  value={editingCar.drive_type || ''}
                  onChange={(e) => setEditingCar({ ...editingCar, drive_type: e.target.value || null })}
                  className="w-full bg-brand-dark border border-white/10 text-white px-3 py-2 rounded-sm text-sm outline-none"
                >
                  <option value="">—</option>
                  <option>2WD</option><option>4WD</option><option>AWD</option>
                </select>
              </div>
              <div>
                <label className="text-brand-gray text-xs uppercase tracking-widest mb-1 block">Status</label>
                <select
                  value={editingCar.status || 'Available'}
                  onChange={(e) => setEditingCar({ ...editingCar, status: e.target.value })}
                  className="w-full bg-brand-dark border border-white/10 text-white px-3 py-2 rounded-sm text-sm outline-none"
                >
                  <option>Available</option><option>Sold</option><option>Reserved</option><option>Pending</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-brand-gray text-xs uppercase tracking-widest mb-1 block">Description</label>
                <textarea
                  rows={3}
                  value={editingCar.description || ''}
                  onChange={(e) => setEditingCar({ ...editingCar, description: e.target.value })}
                  className="w-full bg-brand-dark border border-white/10 focus:border-brand-red text-white px-3 py-2 rounded-sm text-sm outline-none resize-none"
                />
              </div>
              <div className="col-span-2">
                <label className="text-brand-gray text-xs uppercase tracking-widest mb-1 block">Features (comma separated)</label>
                <input
                  type="text"
                  value={(editingCar.features || []).join(', ')}
                  onChange={(e) => setEditingCar({ ...editingCar, features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                  className="w-full bg-brand-dark border border-white/10 focus:border-brand-red text-white px-3 py-2 rounded-sm text-sm outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="text-brand-gray text-xs uppercase tracking-widest mb-1 block">Image URLs (one per line)</label>
                <textarea
                  rows={3}
                  value={(editingCar.car_images || []).map((i: any) => i.url).join('\n')}
                  onChange={(e) => setEditingCar({ ...editingCar, car_images: e.target.value.split('\n').filter(Boolean).map((url: string, i: number) => ({ url, is_primary: i === 0, display_order: i, car_id: editingCar.id || '', id: '', created_at: '' })) })}
                  placeholder="https://..."
                  className="w-full bg-brand-dark border border-white/10 focus:border-brand-red text-white px-3 py-2 rounded-sm text-sm outline-none resize-none"
                />
              </div>
              <label className="col-span-2 flex items-center gap-2 text-white text-sm">
                <input type="checkbox" checked={editingCar.featured || false} onChange={(e) => setEditingCar({ ...editingCar, featured: e.target.checked })} className="accent-brand-red" />
                Featured vehicle
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={saveCar} className="flex-1 flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-light text-white px-4 py-3 rounded-sm text-sm font-semibold transition-colors">
                <Check size={16} /> Save
              </button>
              <button onClick={() => setShowCarModal(false)} className="px-4 py-3 text-brand-gray hover:text-white text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
