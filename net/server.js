import net from "net";

const server = net.createServer((socket) => {
  setInterval(() => {
    socket.write("hello world");
  }, 1000);
});

server.listen(3000, () => {
  console.log("server listening on port 3000");
});
