import http from 'node:http'
import { Server } from 'socket.io'

const server = http.createServer()

const io = new Server(server, {
  cors: true,
})

// 事件模型驱动
const groupMap = {}
io.on('connection', (socket) => {
  // 加入房间
  // 组装格式，前端渲染
  socket.on('join', ({ name, room }) => {
    socket.join(room)
    if (groupMap[name]) {
      groupMap[room].push({ name, room, id: socket.id })
    } else {
      groupMap[room] = [{ name, room, id: socket.id }]
    }

    socket.emit('groupMap', groupMap)
    socket.broadcast.emit('groupMap', groupMap)
    socket.broadcast.to(room).emit('message', {
      name: '管理员',
      message: `欢迎${name}进入聊天室`,
    })
  })

  socket.on('message', ({ name,message,room }) => {
    socket.broadcast.to(room).emit('message', { name , message })
  })
})

server.listen(3000, () => { 
  console.log('Server is running on port 3000')
})