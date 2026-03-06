/**
 * Teddy Roosevelt cartoon avatar.
 * Uses the custom TR illustration PNG.
 */
export default function TeddyIcon({ size = 20 }) {
  return (
    <img
      src="/teddy-avatar.png"
      alt="Teddy"
      width={size}
      height={size}
      style={{ borderRadius: '50%', objectFit: 'cover' }}
    />
  );
}
