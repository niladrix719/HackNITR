const express = require('express');
const http = require('http');
const connectDb = require('./mongoDB');
const { login, signup, authenticateJWT, userProfile } = require('./controller/userController');
const cors = require('cors');
const socketIO = require('socket.io');
const { createRoom, joinRoom } = require('./controller/roomController');

// Connect to MongoDB
connectDb();

// Create an Express application
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Create a Socket.IO instance attached to the server
const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});


// ------User controllers------
app.post('/api/users/login', login);
app.post('/api/users/signup', signup);
app.get('/create', authenticateJWT, createRoom);
app.post('/join', authenticateJWT, joinRoom);
// app.get('/profile', authenticateJWT, userProfile);
// app.get('/api/user', authenticateJWT, (req, res) => {
//   res.json({ message: 'Protected route accessed successfully!', user: req.user });
// });

io.on('connection', (socket) => {
  console.log('A user connected');

  socket?.on('create', (room_code) => {
    socket.join(room_code);
  });

  socket?.on('join', (room_code) => {
    console.log('Joining room', room_code);
    socket?.join(room_code);
    io.to(room_code).emit('joined', room_code);
  });

  socket?.on('win', (code) => {
    console.log('nice')
    io.emit('winX');
  });

  socket?.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
