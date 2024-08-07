require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/usersRoutes');
const { sequelize } = require('./models');
const { handleSocket } = require('./sockets/chatSocket');
const swaggerSetup = require('./swagger');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Socket.io
handleSocket(io);

// Swagger
swaggerSetup(app);

//server the index.html file at the root URL

app.use(express.static(path.join(__dirname )));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});

// Start server
const PORT = process.env.PORT || 5100;
server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});