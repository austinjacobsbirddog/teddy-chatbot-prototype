import ChatWidget from './components/ChatWidget';
import TeddyIcon from './components/TeddyIcon';

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F3F3EF' }}>
      {/* Demo landing page content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* BirdDog Logo area */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <img
              src="/birddog-logomark-orange.png"
              alt="BirdDog"
              className="h-10 w-auto"
            />
            <span
              className="text-2xl font-bold tracking-wider uppercase"
              style={{ color: '#00003A', fontFamily: "'Impact', 'Arial Black', sans-serif", letterSpacing: '0.08em' }}
            >
              BirdDog
            </span>
          </div>

          <h1
            className="text-4xl font-bold mb-4 leading-tight uppercase tracking-wide"
            style={{ color: '#00003A', fontFamily: "'Impact', 'Arial Black', sans-serif", letterSpacing: '0.04em' }}
          >
            Does your land qualify for a<br />
            <span style={{ color: '#FF4B00' }}>Section 180 tax deduction?</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-xl" style={{ color: '#00003A', opacity: 0.7, fontFamily: "'Inter', sans-serif" }}>
            Teddy, our AI land advisor, can tell you in about 2 minutes — with a straight answer either way.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {[
            {
              icon: '⏱',
              title: '~2 Minutes',
              desc: 'Quick qualification conversation',
            },
            {
              icon: '🌾',
              title: 'IRS Section 180',
              desc: 'Residual fertility deduction since 1954',
            },
            {
              icon: '💰',
              title: 'Avg. ~$1,000/acre',
              desc: 'Deduction pending soil testing',
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-xl p-5"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E8E4',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="font-semibold mb-1" style={{ color: '#00003A' }}>{f.title}</div>
              <div className="text-sm" style={{ color: '#00003A', opacity: 0.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        {/* CTA hint */}
        <div className="flex items-center gap-3 text-sm" style={{ color: '#00003A', opacity: 0.6, fontFamily: "'Inter', sans-serif" }}>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#00003A' }}
          >
            <TeddyIcon size={16} color="white" />
          </div>
          <span>
            Chat with Teddy using the button in the bottom-right corner →
          </span>
        </div>
      </div>

      {/* The widget */}
      <ChatWidget />
    </div>
  );
}

export default App;
