import api from '../api';


const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export default function Analytics({ links, onDelete }) {

  const handleDelete = async (slug) => {
    if (!window.confirm(`Delete /${slug}?`)) return;
    try {
      await api.deleteLink(slug);
      onDelete(slug);
    } catch {
      alert('Failed to delete');
    }
  };

  if (links.length === 0) {
    return (
      <p style={{ color: '#666', textAlign: 'center' }}>
        No links yet. Create one above!
      </p>
    );
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Your Links</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Short Link</th>
            <th style={styles.th}>Original URL</th>
            <th style={styles.th}>Clicks</th>
            <th style={styles.th}>Created</th>
            <th style={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.slug} style={styles.row}>
              <td style={styles.td}>
                <a
                  href={`${BASE}/${link.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.link}
                >
                  /{link.slug}
                </a>
              </td>
              <td style={styles.td}>
                <span style={styles.original}>
                  {(link.original ?? '').length > 40
                    ? link.original.slice(0, 40) + '...'
                    : (link.original ?? 'Missing original URL')}
                </span>
              </td>
              <td style={styles.td}>
                <span style={styles.clicks}>{link.clicks} clicks</span>
              </td>
              <td style={styles.td}>
                {new Date(link.created_at).toLocaleDateString()}
              </td>
              <td style={styles.td}>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(link.slug)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  card: { background: '#1a1a1a', padding: '2rem', borderRadius: '12px' },
  title: { marginBottom: '1.5rem', fontSize: '1.4rem' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid #333', color: '#888', fontSize: '0.85rem' },
  row: { borderBottom: '1px solid #1f1f1f' },
  td: { padding: '0.75rem', fontSize: '0.95rem' },
  link: { color: '#818cf8' },
  original: { color: '#9ca3af' },
  clicks: { color: '#34d399', fontWeight: 'bold' },
  deleteBtn: { background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '0.3rem 0.75rem', borderRadius: '6px', cursor: 'pointer' },
};
