import TeddyIcon from './TeddyIcon';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-2 mb-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Teddy avatar — TR caricature on Midnight circle */}
      {!isUser && (
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
          style={{ backgroundColor: '#00003A' }}
        >
          <TeddyIcon size={16} color="white" />
        </div>
      )}

      {/* Bubble */}
      <div
        className="max-w-[78%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
        style={{
          backgroundColor: isUser ? '#FF4B00' : '#F3F3EF',
          color: isUser ? '#FFFFFF' : '#00003A',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {message.content}
      </div>
    </div>
  );
}
