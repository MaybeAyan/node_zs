import express from "express";
import Redis from "ioredis";
import fs from "node:fs";
import cors from "cors";

const lua = fs.readFileSync("./index.lua", "utf-8");
const redis = new Redis();

const app = express();

app.use(cors());

app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const KEY = "lottery"; // redis 存值
const TIME = 30; // 三十秒之内的操作
const LIMIT = 5; // 操作了五次

app.get("/lottery", (req, res) => {
  redis.eval(lua, 1, KEY, TIME, LIMIT, (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result === 1) {
      res.send("抽奖成功");
    } else {
      res.send("请稍后再试");
    }
  });
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
