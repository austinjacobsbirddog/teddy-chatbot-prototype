import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';
import CTAButton from './CTAButton';
import TeddyIcon from './TeddyIcon';

// Local dev: empty → Vite proxies /api/chat to :3001
// Production widget: VITE_API_URL set to Vercel URL at build time
const API_BASE = import.meta.env.VITE_API_URL || '';

// BirdDog brand colors
const MIDNIGHT = '#00003A';
const HUNTER_ORANGE = '#FF4B00';

const OPENING_MESSAGE = {
  role: 'assistant',
  content:
    "Hey, I'm Teddy — BirdDog's land advisor. I help landowners figure out if their property is eligible for residual fertility tax deductions. Are you already familiar with these deductions and shopping around for the right partner, or are you earlier in the process and want to learn more first?",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([OPENING_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [ctaAction, setCtaAction] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const sendMessage = async (text) => {
    const newUserMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const apiMessages = updatedMessages
        .filter((m, i) => !(i === 0 && m.role === 'assistant'))
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();

      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
      if (data.action) setCtaAction(data.action);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I ran into a connection issue. Give it a moment and try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([OPENING_MESSAGE]);
    setCtaAction(null);
  };

  return (
    <>
      {/* ── Chat Panel ──────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 sm:right-6 z-50 flex flex-col shadow-2xl overflow-hidden chat-panel-enter"
          style={{
            width: '380px',
            height: '520px',
            maxWidth: 'calc(100vw - 24px)',
            maxHeight: 'calc(100vh - 100px)',
            borderRadius: '16px',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{ backgroundColor: MIDNIGHT }}
          >
            <div className="flex items-center gap-3">
              {/* Teddy Roosevelt avatar */}
              <div
                className="rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: HUNTER_ORANGE, width: 56, height: 56 }}
              >
                <TeddyIcon size={56} />
              </div>
              <div>
                <div
                  className="font-bold text-base leading-tight tracking-wide"
                  style={{
                    color: 'white',
                    fontFamily: "'Obviously Wide', 'Impact', 'Arial Black', sans-serif",
                    letterSpacing: '0.03em',
                  }}
                >
                  TEDDY
                </div>
                <div
                  className="text-xs font-medium leading-tight"
                  style={{ color: HUNTER_ORANGE }}
                >
                  BirdDog Land Advisor
                </div>
              </div>
            </div>

            {/* BirdDog logomark + controls */}
            <div className="flex items-center gap-2">
              <img
                src="/birddog-logomark-white.png"
                alt="BirdDog"
                className="h-6 w-auto opacity-80"
                style={{ mixBlendMode: 'screen' }}
              />
              <button
                onClick={() => window.open('/admin', '_blank')}
                className="text-white/40 hover:text-white transition-colors p-1 rounded"
                title="Admin"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button
                onClick={handleReset}
                className="text-white/40 hover:text-white transition-colors p-1 rounded"
                title="Start over"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors p-1 rounded"
                title="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 pt-4 pb-2 chat-messages"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            {ctaAction && !isLoading && <CTAButton action={ctaAction} />}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSend={sendMessage} disabled={isLoading || !!ctaAction} />
        </div>
      )}

      {/* ── Floating Pill Button ─────────────────────────────────── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-4 right-4 sm:right-6 z-50 flex items-center gap-2.5 pl-2.5 pr-5 py-2.5 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95"
        style={{ backgroundColor: MIDNIGHT }}
        aria-label={isOpen ? 'Close chat' : 'Does my land qualify?'}
      >
        <div
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: HUNTER_ORANGE, width: 49, height: 49 }}
        >
          <TeddyIcon size={49} />
        </div>
        <span
          className="font-semibold text-sm whitespace-nowrap"
          style={{ color: 'white', fontFamily: "'Inter', sans-serif" }}
        >
          {isOpen ? 'Close' : 'Does my land qualify?'}
        </span>
      </button>
    </>
  );
}
