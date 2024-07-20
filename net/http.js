import net from "net";

const html = `<h1>TCP</h1>`;

const responseHeaders = [
  "HTTP/1.1 200 OK",
  "Content-Type: text/html",
  "Content-Length: ${html.length}",
  "",
  html,
];

const http = net.createServer((socket) => {
  socket.on("data", (e) => {
    console.log(e.toString());
  });
});

http.listen(80, () => {
  console.log("listening on *:80");
});
