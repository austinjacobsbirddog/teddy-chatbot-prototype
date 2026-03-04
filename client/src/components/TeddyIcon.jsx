/**
 * Teddy Roosevelt icon — top hat, glasses, bold mustache.
 * Filled/solid style for legibility at small sizes.
 */
export default function TeddyIcon({ size = 20, color = 'white' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top hat brim */}
      <rect x="5" y="11" width="22" height="3" rx="1.5" fill={color} />

      {/* Top hat crown */}
      <rect x="9" y="3" width="14" height="9" rx="2" fill={color} />

      {/* Hat band accent */}
      <rect x="9" y="9.5" width="14" height="2" rx="0" fill="#FF4B00" />

      {/* Face */}
      <ellipse cx="16" cy="22" rx="8" ry="7" fill={color} />

      {/* Left eye / glasses lens */}
      <circle cx="12.5" cy="21" r="2.8" fill="none" stroke={color === 'white' ? '#00003A' : 'white'} strokeWidth="1.5" />
      <circle cx="12.5" cy="21" r="1.2" fill={color === 'white' ? '#00003A' : 'white'} />

      {/* Right eye / glasses lens */}
      <circle cx="19.5" cy="21" r="2.8" fill="none" stroke={color === 'white' ? '#00003A' : 'white'} strokeWidth="1.5" />
      <circle cx="19.5" cy="21" r="1.2" fill={color === 'white' ? '#00003A' : 'white'} />

      {/* Glasses bridge */}
      <line x1="15.3" y1="21" x2="16.7" y2="21" stroke={color === 'white' ? '#00003A' : 'white'} strokeWidth="1.2" />

      {/* Mustache */}
      <path
        d="M9.5 25.5 C11 23.5 13.5 24.5 16 25 C18.5 24.5 21 23.5 22.5 25.5 C21 26.8 18.5 26 16 26.5 C13.5 26 11 26.8 9.5 25.5Z"
        fill={color === 'white' ? '#00003A' : 'white'}
      />
    </svg>
  );
}
