const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// عرض كل الملفات (HTML, صور، صوت) الموجودة في نفس المجلد
app.use(express.static(path.join(__dirname, '/')));

// إدارة الدردشة الحية
io.on('connection', (socket) => {
  console.log('مستخدم جديد متصل');
  
  // استقبال الرسالة من أي طرف وإعادة إرسالها للطرفين في نفس اللحظة
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('مستخدم غادر');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`الخادم يعمل بنجاح على البورت ${PORT}`);
});
