import TeddyIcon from './TeddyIcon';

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 mb-3">
      <div
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
        style={{ backgroundColor: '#00003A' }}
      >
        <TeddyIcon size={16} color="white" />
      </div>
      <div
        className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1"
        style={{ backgroundColor: '#F3F3EF' }}
      >
        <span className="typing-dot w-2 h-2 rounded-full" style={{ backgroundColor: '#808285' }} />
        <span className="typing-dot w-2 h-2 rounded-full" style={{ backgroundColor: '#808285' }} />
        <span className="typing-dot w-2 h-2 rounded-full" style={{ backgroundColor: '#808285' }} />
      </div>
    </div>
  );
}
