import express from "express";
import User from "./src/user.js";
import List from "./src/list.js";
import LoggerMiddleware from "./middleware/logger.js";

const app = express();
app.use(express.json());
app.use(LoggerMiddleware);
app.use("/user", User);
app.use("/list", List);

// app.get("/get", (req, res) => {
//   console.log(req.query);
//   res.send("get");
// });

// app.post("/post", (req, res) => {
//   console.log(req.body);
//   res.send("post");
// });

// app.get("/get/:id", (req, res) => {
//   console.log(req.params);
//   res.send("动态参数");
// });

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
