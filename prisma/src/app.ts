import dotenv from "dotenv";
import express from "express";
import { PrismaClient } from "@prisma/client";

dotenv.config();
console.log("DATABASE_URL:", process.env.DATABASE_URL);
const prisma = new PrismaClient();
const app = express();
const port = 3000;
app.use(express.json());

// 新增
app.post("/api/create", async (req, res) => {
  const { name, email } = req.body;
  const data = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: [
          {
            title: "小余Node系列第一章-概述",
            content:
              "nodejs 并不是JavaScript应用，也不是编程语言，因为编程语言使用的JavaScript,Nodejs是JavaScript的运行时。",
          },
          {
            title: "小余Node系列第二章-安装",
            content:
              "通常点击这里之后，Node官网会直接根据你的电脑环境，自动选择最适合你的版本，当然你也可以点击左上角的Download选项去下载你想要的其他版本",
          },
        ],
      },
    },
  });
  res.json(data);
});

app.get("/", async (req, res) => {
  const data = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  res.send(data);
});

app.post("/update", async (req, res) => {
  const { name, email, id } = req.body;
  await prisma.user.update({
    data: {
      name,
      email,
      id,
    },
    where: {
      id,
    },
  });
});

app.post("/delete", async (req, res) => {
  await prisma.post.deleteMany({
    where: {
      authorId: req.body.id,
    },
  });

  await prisma.user.delete({
    where: {
      id: req.body.id,
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
