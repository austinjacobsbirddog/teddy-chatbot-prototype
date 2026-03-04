import './index.css';
import { createRoot } from 'react-dom/client';
import ChatWidget from './components/ChatWidget';

function mount() {
  // Avoid double-mounting if the script is loaded twice
  if (document.getElementById('teddy-widget-root')) return;

  const container = document.createElement('div');
  container.id = 'teddy-widget-root';
  document.body.appendChild(container);
  createRoot(container).render(<ChatWidget />);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
