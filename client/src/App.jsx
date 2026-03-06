import { useState } from 'react';
import ChatWidget from './components/ChatWidget';

const MIDNIGHT = '#00003A';
const HUNTER_ORANGE = '#FF4B00';
const SAND = '#F3F3EF';

function App() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How much does the service cost?',
      a: '$50/acre, or $40/acre if paid within 14 days of receiving your report. No hidden fees.',
    },
    {
      q: 'How do I know if I qualify?',
      a: 'Generally, you need to own the land (not lease), have purchased within the last ~10 years, be in active ag production, and have 50+ acres in the US.',
    },
    {
      q: 'What kind of savings can I expect?',
      a: 'Average deductions range from $500–$1,500 per acre, with most landowners seeing $40,000+ in total value. Your soil test determines the exact amount.',
    },
    {
      q: 'Is this complicated?',
      a: 'Not for you. BirdDog handles the soil testing, analysis, and report generation. You just share it with your CPA.',
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: MIDNIGHT }}>

      {/* ── Nav Bar ─────────────────────────────────────── */}
      <nav style={{ backgroundColor: MIDNIGHT }} className="w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <img src="/birddog-logomark-white.png" alt="BirdDog" className="h-7 w-auto" style={{ mixBlendMode: 'screen' }} />
              <span className="text-white font-bold text-lg tracking-wider uppercase" style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}>BirdDog</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <span className="hover:text-white cursor-pointer transition-colors">Hunters</span>
              <span className="hover:text-white cursor-pointer transition-colors">Landowners</span>
              <span className="hover:text-white cursor-pointer transition-colors">Farmers & Ranchers</span>
              <span className="hover:text-white cursor-pointer transition-colors">About Us</span>
              <span className="hover:text-white cursor-pointer transition-colors" style={{ color: HUNTER_ORANGE }}>Contact</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm text-white">
            <span className="opacity-70 hover:opacity-100 cursor-pointer transition-opacity">Login</span>
            <span className="px-4 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: HUNTER_ORANGE }}>Sign Up</span>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section
        className="relative w-full flex items-center justify-center text-center px-6"
        style={{
          minHeight: '480px',
          background: `linear-gradient(135deg, ${MIDNIGHT} 0%, #001050 50%, #1a2744 100%)`,
        }}
      >
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-white"
            style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", letterSpacing: '0.02em', textTransform: 'uppercase' }}
          >
            Unlock Your Soil's Hidden Value with{' '}
            <span style={{ color: HUNTER_ORANGE }}>Residual Fertility</span>
          </h1>
          <p className="text-lg md:text-xl mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
            You Could Be Sitting on Thousands in Unrealized Value
          </p>
          <a
            href="#form"
            className="inline-block px-8 py-3 rounded-full font-semibold text-white text-base transition-all hover:brightness-110"
            style={{ backgroundColor: HUNTER_ORANGE }}
          >
            Request an Estimate
          </a>
        </div>
        {/* Subtle overlay pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      </section>

      {/* ── Value Prop ──────────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: HUNTER_ORANGE }}>IRS Section 180</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              Turn Soil into Savings
            </h2>
            <p className="text-lg mb-6" style={{ color: MIDNIGHT, opacity: 0.7, lineHeight: 1.7 }}>
              Over <strong style={{ color: HUNTER_ORANGE }}>$30M in value</strong> discovered for landowners. When you buy farmland, excess nutrients left in the soil from prior ownership — nitrogen, phosphorus, potassium — are a depreciable asset under IRS code. BirdDog identifies and quantifies that value.
            </p>
            <div className="flex gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold" style={{ color: HUNTER_ORANGE }}>$750–$2,000</div>
                <div className="text-sm mt-1" style={{ opacity: 0.6 }}>per acre potential</div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: HUNTER_ORANGE }}>$40K+</div>
                <div className="text-sm mt-1" style={{ opacity: 0.6 }}>average total value</div>
              </div>
            </div>
            <a href="#form" className="inline-block px-6 py-2.5 rounded-full font-semibold text-white text-sm" style={{ backgroundColor: HUNTER_ORANGE }}>
              Request an Estimate
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: SAND, height: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="text-center px-8">
              <div className="text-6xl mb-4">🌾</div>
              <p className="text-lg font-semibold" style={{ color: MIDNIGHT }}>Residual Fertility Tax Deduction</p>
              <p className="text-sm mt-2" style={{ color: MIDNIGHT, opacity: 0.5 }}>In the IRS code since 1954</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How BirdDog Helps ──────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: SAND }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            How BirdDog Helps
          </h2>
          <p className="mb-12 text-base" style={{ opacity: 0.6 }}>Five simple steps from discovery to deduction</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { step: '01', title: 'Discovery', icon: '🔍' },
              { step: '02', title: 'Qualify', icon: '✅' },
              { step: '03', title: 'Initiate', icon: '📋' },
              { step: '04', title: 'Compile', icon: '📊' },
              { step: '05', title: 'Deliver', icon: '📄' },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-3"
                  style={{ backgroundColor: '#FFFFFF', border: `2px solid ${HUNTER_ORANGE}` }}
                >
                  {s.icon}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: HUNTER_ORANGE }}>{s.step}</div>
                <div className="text-sm font-semibold">{s.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cost of Inaction ───────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: MIDNIGHT }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-white" style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", textTransform: 'uppercase' }}>
            The Cost of Unclaimed Tax Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Missed Deductions', desc: '$750–$2,000/acre in tax savings left on the table every year you wait.', icon: '💸' },
              { title: 'Complex Regulations', desc: 'IRS code is dense. Without expert guidance, qualifying deductions go unclaimed.', icon: '📚' },
              { title: 'Time-Intensive Process', desc: 'Soil testing, documentation, and CPA coordination take time you don\'t have.', icon: '⏳' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl p-6 text-left" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form Section ───────────────────────────────── */}
      <section id="form" className="py-20 px-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", textTransform: 'uppercase' }}>
            Find Out If You Qualify — <span style={{ color: HUNTER_ORANGE }}>For Free</span>
          </h2>
          <p style={{ opacity: 0.6 }}>Fill out the form below and a BirdDog advisor will be in touch.</p>
          <p className="mt-2 font-semibold" style={{ color: HUNTER_ORANGE }}>(979) 530-7582</p>
        </div>
        <form className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
          {[
            { label: 'First Name', type: 'text', placeholder: 'John' },
            { label: 'Last Name *', type: 'text', placeholder: 'Smith' },
            { label: 'Email *', type: 'email', placeholder: 'john@example.com' },
            { label: 'Phone *', type: 'tel', placeholder: '(555) 555-5555' },
          ].map((f) => (
            <div key={f.label}>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ opacity: 0.5 }}>{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                className="w-full px-3 py-2.5 rounded-lg border text-sm"
                style={{ borderColor: '#ddd', fontFamily: "'Inter', sans-serif" }}
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ opacity: 0.5 }}>Land Type</label>
            <select className="w-full px-3 py-2.5 rounded-lg border text-sm" style={{ borderColor: '#ddd' }}>
              <option>Cropland</option>
              <option>Rangeland</option>
              <option>Timberland</option>
              <option>Undeveloped</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ opacity: 0.5 }}>County</label>
            <input type="text" placeholder="Travis" className="w-full px-3 py-2.5 rounded-lg border text-sm" style={{ borderColor: '#ddd' }} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ opacity: 0.5 }}>Total Acreage *</label>
            <input type="number" placeholder="500" className="w-full px-3 py-2.5 rounded-lg border text-sm" style={{ borderColor: '#ddd' }} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ opacity: 0.5 }}>Purchase Date *</label>
            <input type="date" className="w-full px-3 py-2.5 rounded-lg border text-sm" style={{ borderColor: '#ddd' }} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ opacity: 0.5 }}>State</label>
            <select className="w-full px-3 py-2.5 rounded-lg border text-sm" style={{ borderColor: '#ddd' }}>
              {['Texas','Oklahoma','Arkansas','Missouri','Kansas','Louisiana','Mississippi','Alabama','Georgia','Tennessee','Kentucky','Illinois','Indiana','Ohio','Iowa','Nebraska','South Dakota','North Dakota','Minnesota','Wisconsin','Michigan','Montana','Wyoming','Colorado','New Mexico','Arizona','California','Oregon','Washington','Idaho','Utah','Nevada','Florida','South Carolina','North Carolina','Virginia','West Virginia','Pennsylvania','New York','New Jersey','Maryland','Delaware','Connecticut','Massachusetts','Rhode Island','Vermont','New Hampshire','Maine','Hawaii','Alaska'].map(s => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ opacity: 0.5 }}>Referred By</label>
            <input type="text" placeholder="Optional" className="w-full px-3 py-2.5 rounded-lg border text-sm" style={{ borderColor: '#ddd' }} />
          </div>
          <div className="sm:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full py-3 rounded-full font-semibold text-white text-base transition-all hover:brightness-110"
              style={{ backgroundColor: HUNTER_ORANGE }}
            >
              Request an Estimate
            </button>
          </div>
        </form>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: SAND }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center" style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", textTransform: 'uppercase' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-center mb-10" style={{ opacity: 0.5 }}>Everything you need to know about Section 180</p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E8E4' }}
              >
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <span className="text-lg ml-4" style={{ color: HUNTER_ORANGE }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm" style={{ opacity: 0.7, lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer style={{ backgroundColor: MIDNIGHT }} className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/birddog-logomark-white.png" alt="BirdDog" className="h-6 w-auto" style={{ mixBlendMode: 'screen' }} />
                <span className="text-white font-bold tracking-wider uppercase text-sm" style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}>BirdDog</span>
              </div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                The landowner intelligence platform that helps you understand, optimize, and monetize your property.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Explore</h4>
              <div className="space-y-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <div className="hover:text-white cursor-pointer">Platform</div>
                <div className="hover:text-white cursor-pointer">Leasing</div>
                <div className="hover:text-white cursor-pointer">Section 180</div>
                <div className="hover:text-white cursor-pointer">Hosting</div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Company</h4>
              <div className="space-y-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <div className="hover:text-white cursor-pointer">Our Story</div>
                <div className="hover:text-white cursor-pointer">Careers</div>
                <div className="hover:text-white cursor-pointer">Contact</div>
                <div className="hover:text-white cursor-pointer">Partners</div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Legal</h4>
              <div className="space-y-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <div className="hover:text-white cursor-pointer">Privacy Policy</div>
                <div className="hover:text-white cursor-pointer">Terms of Service</div>
              </div>
            </div>
          </div>
          <div className="border-t pt-6 flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>© 2026 BirdDog Adventures. All rights reserved.</p>
            <div className="flex gap-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {['Instagram', 'X', 'YouTube', 'LinkedIn'].map((s) => (
                <span key={s} className="text-xs hover:text-white cursor-pointer transition-colors">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Chat Widget (floats on top) ─────────────────── */}
      <ChatWidget />
    </div>
  );
}

export default App;
