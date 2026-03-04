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
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: HUNTER_ORANGE }}
              >
                <TeddyIcon size={24} color="white" />
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
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: HUNTER_ORANGE }}
        >
          <TeddyIcon size={22} color="white" />
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
