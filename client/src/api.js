import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = {
  // Create a new short link
  createLink: (original, alias) =>
    axios.post(`${BASE}/api/links`, { original, alias }),

  // Get all links for analytics
  getLinks: () =>
    axios.get(`${BASE}/api/links`),

  // Delete a link
  deleteLink: (slug) =>
    axios.delete(`${BASE}/api/links/${slug}`),
};

export default api;
