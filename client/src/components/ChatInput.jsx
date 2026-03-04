import { useState } from 'react';

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 p-3 flex-shrink-0"
      style={{ borderTop: '1px solid #E8E8E4', backgroundColor: '#FFFFFF' }}
    >
      <textarea
        rows={1}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          e.target.style.height = 'auto';
          e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px';
        }}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Type a message…"
        className="flex-1 resize-none px-3 py-2 text-sm outline-none disabled:opacity-50 leading-relaxed"
        style={{
          maxHeight: '96px',
          overflowY: 'auto',
          border: '1.5px solid #E8E8E4',
          borderRadius: '10px',
          color: '#00003A',
          fontFamily: "'Inter', sans-serif",
          backgroundColor: '#FAFAFA',
        }}
        onFocus={(e) => { e.target.style.borderColor = '#FF4B00'; }}
        onBlur={(e)  => { e.target.style.borderColor = '#E8E8E4'; }}
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="flex-shrink-0 w-9 h-9 flex items-center justify-center transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
        style={{ backgroundColor: '#FF4B00', borderRadius: '10px' }}
        onMouseEnter={(e) => {
          if (!disabled && value.trim()) e.currentTarget.style.backgroundColor = '#e04300';
        }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FF4B00'; }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </button>
    </form>
  );
}
