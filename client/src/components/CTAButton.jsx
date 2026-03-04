export default function CTAButton({ action }) {
  if (!action) return null;

  const isQualified = action === 'QUALIFY';

  const href = isQualified
    ? 'https://teddy.birddogit.com/landowner'
    : 'https://www.birddogit.com/landowners';

  const label = isQualified
    ? 'Claim Your Land →'
    : 'See What BirdDog Can Do For You →';

  return (
    <div className="mt-4 mb-2">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center py-3 px-4 font-semibold text-sm transition-all duration-150 active:scale-95"
        style={
          isQualified
            ? {
                backgroundColor: '#FF4B00',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.01em',
              }
            : {
                backgroundColor: 'transparent',
                color: '#00003A',
                border: '2px solid #00003A',
                borderRadius: '8px',
                fontFamily: "'Inter', sans-serif",
              }
        }
        onMouseEnter={(e) => {
          if (isQualified) {
            e.currentTarget.style.backgroundColor = '#e04300';
          } else {
            e.currentTarget.style.backgroundColor = '#F3F3EF';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isQualified ? '#FF4B00' : 'transparent';
        }}
      >
        {label}
      </a>
    </div>
  );
}
