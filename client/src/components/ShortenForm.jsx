import { useState } from 'react';
import api from '../api';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function ShortenForm({ onNewLink }) {
  const [original, setOriginal] = useState('');
  const [alias, setAlias] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const res = await api.createLink(original, alias || undefined);
      setResult(res.data);
      onNewLink(res.data);
      setOriginal('');
      setAlias('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Shorten a URL</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="url"
          placeholder="https://your-long-url.com"
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Custom alias (optional)"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </form>

      {result && (
        <div style={styles.result}>
          <span>Short link created: </span>
          <a
            href={`${BASE}/${result.slug}`}
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            {BASE}/{result.slug}
          </a>
        </div>
      )}

      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
}

const styles = {
  card: { background: '#1a1a1a', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' },
  title: { marginBottom: '1.5rem', fontSize: '1.4rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #333', background: '#0f0f0f', color: '#f0f0f0', fontSize: '1rem' },
  button: { padding: '0.75rem', borderRadius: '8px', background: '#4f46e5', color: '#fff', border: 'none', fontSize: '1rem', cursor: 'pointer' },
  result: { marginTop: '1rem', padding: '0.75rem', background: '#1f2d1f', borderRadius: '8px' },
  link: { color: '#6ee7b7' },
  error: { marginTop: '1rem', padding: '0.75rem', background: '#2d1f1f', borderRadius: '8px', color: '#f87171' },
};