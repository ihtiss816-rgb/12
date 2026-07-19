import Link from 'next/link';
import { ArrowRight, Shield, Award, Globe, Users, Target, Eye, Heart, MapPin, Phone, Mail } from 'lucide-react';
import Reveal from '@/components/Reveal';

const values = [
  { icon: Shield, title: 'Integrity', desc: 'We describe every vehicle honestly. No hidden defects, no inflated grades, no surprises on delivery.' },
  { icon: Award, title: 'Quality', desc: 'Every car is physically inspected by our team in Japan before it enters our inventory.' },
  { icon: Globe, title: 'Reliability', desc: 'We handle documentation, export clearance, and shipping with partners we trust.' },
  { icon: Heart, title: 'Customer Care', desc: 'Real people, real responses. We support you from first inquiry to port delivery.' },
];

const milestones = [
  { year: '2014', title: 'Founded in Japan', desc: 'Wazir Trading LLC established in Mie Prefecture, Japan.' },
  { year: '2016', title: 'First 100 Exports', desc: 'Reached our first hundred vehicles shipped to African ports.' },
  { year: '2019', title: 'Global Expansion', desc: 'Expanded operations to Caribbean, South Asia, and Oceania markets.' },
  { year: '2024', title: '500+ Vehicles', desc: 'Surpassed 500 vehicles exported to 50+ destinations worldwide.' },
];

export const metadata = { title: 'About Us — Wazir Trading LLC' };

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Japan car yard"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4">About Wazir Trading</div>
            <h1 className="text-white font-black text-4xl sm:text-6xl tracking-tight mb-6 max-w-3xl">
              A Japan-Based Exporter You Can Trust
            </h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              We are a Japanese vehicle export company headquartered in Mie Prefecture, Japan. Our team sources, inspects, and ships quality used vehicles to importers and individuals across the globe.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section-padding bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <div className="glass-card rounded-lg p-8 h-full">
                <div className="w-12 h-12 rounded-sm bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-5">
                  <Target size={22} className="text-brand-red" />
                </div>
                <h3 className="text-white font-black text-2xl tracking-tight mb-3">Our Mission</h3>
                <p className="text-brand-gray leading-relaxed">
                  To make Japanese vehicle ownership accessible worldwide by providing a transparent, reliable, and affordable export service. We bridge the gap between Japanese auctions and international buyers — handling every step so our customers receive exactly what they ordered.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass-card rounded-lg p-8 h-full">
                <div className="w-12 h-12 rounded-sm bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
                  <Eye size={22} className="text-brand-gold" />
                </div>
                <h3 className="text-white font-black text-2xl tracking-tight mb-3">Our Vision</h3>
                <p className="text-brand-gray leading-relaxed">
                  To become the most trusted Japanese vehicle export partner for emerging markets — known for honesty, quality, and the long-term relationships we build with every importer. We grow when our customers grow.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Story / Milestones */}
      <section className="section-padding bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-16">
            <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">Our Journey</div>
            <h2 className="text-white font-black text-3xl sm:text-5xl tracking-tight">A Decade of Exporting</h2>
          </Reveal>

          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-red via-brand-red/30 to-transparent" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.1}>
                  <div className={`relative flex items-center gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    <div className="hidden sm:block flex-1" />
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-red border-4 border-brand-dark z-10" />
                    <div className="flex-1 pl-12 sm:pl-0 sm:px-8">
                      <div className="glass-card rounded-lg p-6">
                        <div className="text-brand-gold font-black text-2xl mb-1">{m.year}</div>
                        <h3 className="text-white font-bold text-lg mb-2">{m.title}</h3>
                        <p className="text-brand-gray text-sm leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-16">
            <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">What We Stand For</div>
            <h2 className="text-white font-black text-3xl sm:text-5xl tracking-tight">Our Core Values</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="glass-card rounded-lg p-6 h-full hover:border-brand-red/30 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-sm bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-5">
                    <v.icon size={22} className="text-brand-red" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 tracking-tight">{v.title}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Office */}
      <section className="section-padding bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">Our Office</div>
              <h2 className="text-white font-black text-3xl sm:text-4xl tracking-tight mb-6">
                Based in Japan,
                <br />
                <span className="text-brand-gold">Shipping Worldwide</span>
              </h2>
              <p className="text-brand-gray leading-relaxed mb-8">
                Our office in Mie Prefecture gives us direct access to major Japanese auto auctions and dealership networks. From here, we coordinate inspections, documentation, and vessel bookings through Yokohama, Nagoya, and Kobe ports.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin size={18} className="text-brand-red flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold text-sm">Address</div>
                    <div className="text-brand-gray text-sm">Heights Mizutani 1C, 158-1 Jizou, Kuwana-City, Mie-Pref, Japan</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone size={18} className="text-brand-red flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold text-sm">Phone</div>
                    <div className="text-brand-gray text-sm">+81-50-3740-8980 · +81-80-8922-7375</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail size={18} className="text-brand-red flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold text-sm">Email</div>
                    <div className="text-brand-gray text-sm">wazirtrading-pc@outlook.jp</div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Japan office"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="text-brand-gold text-xs uppercase tracking-widest mb-1">Headquarters</div>
                  <div className="text-white font-bold text-xl">Kuwana, Mie · Japan</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <Users className="text-brand-red mx-auto mb-6" size={48} />
            <h2 className="text-white font-black text-3xl sm:text-4xl tracking-tight mb-4">
              Let&apos;s Build Something Together
            </h2>
            <p className="text-brand-gray text-lg mb-8">
              Whether you&apos;re a first-time importer or a seasoned dealer, we&apos;d love to work with you.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-light text-white px-8 py-4 rounded-sm font-semibold transition-all duration-200 hover:shadow-[0_0_30px_rgba(204,0,0,0.4)]"
            >
              Get in Touch
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
