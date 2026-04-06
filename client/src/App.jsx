import { useState, useEffect } from 'react';
import ShortenForm from './components/ShortenForm';
import Analytics from './components/Analytics';
import api from './api';

export default function App() {
  const [links, setLinks] = useState([]);

  // Load all links when app first opens
  useEffect(() => {
    api.getLinks()
      .then(res => setLinks(res.data))
      .catch(err => console.error('Failed to load links:', err));
  }, []);

  // Add new link to top of list instantly
  const handleNewLink = (newLink) => {
    setLinks(prev => [newLink, ...prev]);
  };

  // Remove deleted link from list instantly
  const handleDelete = (slug) => {
    setLinks(prev => prev.filter(l => l.slug !== slug));
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>⚡ Snip</h1>
        <p style={styles.tagline}>Shorten URLs. Track clicks.</p>
      </header>

      <ShortenForm onNewLink={handleNewLink} />
      <Analytics links={links} onDelete={handleDelete} />
    </div>
  );
}

const styles = {
  container: { maxWidth: '860px', margin: '0 auto', padding: '2rem 1rem' },
  header: { textAlign: 'center', marginBottom: '2.5rem' },
  logo: { fontSize: '2.5rem', marginBottom: '0.5rem' },
  tagline: { color: '#666' },
};