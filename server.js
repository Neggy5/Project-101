const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store (replace with DB in production)
const recoveryRequests = [];

// API Routes
app.get('/api/requests', (req, res) => {
  res.json(recoveryRequests);
});

app.post('/api/requests', (req, res) => {
  const { platform, username, email, details } = req.body;
  if (!platform || !username || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const request = {
    id: `REQ-${Date.now()}`,
    platform,
    username,
    email,
    details: details || '',
    status: 'Pending',
    createdAt: new Date().toISOString()
  };
  recoveryRequests.push(request);
  res.status(201).json(request);
});

app.get('/api/requests/:id', (req, res) => {
  const request = recoveryRequests.find(r => r.id === req.params.id);
  if (!request) return res.status(404).json({ error: 'Request not found' });
  res.json(request);
});

app.get('/api/stats', (req, res) => {
  res.json({
    total: recoveryRequests.length,
    pending: recoveryRequests.filter(r => r.status === 'Pending').length,
    inProgress: recoveryRequests.filter(r => r.status === 'In Progress').length,
    resolved: recoveryRequests.filter(r => r.status === 'Resolved').length
  });
});

// Catch-all → SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Account Recovery server running on port ${PORT}`);
});
