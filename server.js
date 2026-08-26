const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// إخبار السيرفر بتقديم كل ملفات المشروع (HTML, CSS, JS, الصور، الصوت)
app.use(express.static(__dirname));

// صفحة الموقع الأساسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// صفحة الآدمن المخفية
app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// إدارة المحادثة الفورية
io.on('connection', (socket) => {
  console.log('مستخدم متصل بالدردشة');
  
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('مستخدم غادر');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`السيرفر يعمل الآن على البورت ${PORT}`);
});
