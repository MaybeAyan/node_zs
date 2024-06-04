import express from "express";

const app = express();

app.use("*", (req, res, next) => {
  // *允许所有资源访问
  // 指定ip 或者网址
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5501");

  // Access-Control-Allow-Methods 默认只支持 get post head
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS,PATCH"
  );

  // 支持application/json
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// 预检请求 OPTIONS 请求，浏览器发起
// 满足以下条件才会发起
// 1.Content-type application/json
// 2.自定义请求头
// 3.非普通请求 patch put delete

app.post("/info", (req, res) => {});

app.get("/info", (req, res) => {
  res.set("xyx", 123456); // 自定义响应头
  res.setHeader("Access-Control-Expose-Headers", "xyx"); // 后端抛出自定义响应头
  res.json({
    code: 200,
    type: "GET",
  });
});

app.patch("/info", (req, res) => {
  res.json({
    code: 200,
    type: "PATCH",
  });
});

// websocket 实时通讯使用，前后端实时通信
// 全双工通讯
app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream"); //SSE

  setInterval(() => {
    res.write("event: test\n"); // 默认是 message
    res.write(`data: ${Date.now()}\n\n`);
  }, 1000);
});

app.listen(3000, () => {
  console.log("listen localhost:3000");
});
