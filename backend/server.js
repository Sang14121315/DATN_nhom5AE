// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const { Server } = require('socket.io');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', require('./routes/index'));
app.use('/api/admin', require('./routes/admin'));

// Error Handler Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server running at: http://localhost:${PORT}/`)
);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // chỉnh theo frontend nếu khác
    methods: ['GET', 'POST']
  }
});

// Handle Socket connections
io.on('connection', (socket) => {
  socket.on('join', (userId) => {
    socket.join(userId);
  });
});

// Make io accessible in controllers via req.app.get('io')
app.set('io', io);
