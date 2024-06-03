import express from "express";

const app = express();
const whiteList = ["localhost"]; // 白名单

const preventHotLingking = (req, res, next) => {
  // 获取referrer
  const referer = req.get("referer");
  console.log(referer);

  if (referer) {
    const { hostname } = new URL(referer);
    if (!whiteList.includes(hostname)) {
      res.status(403).send("禁止访问");
      return;
    }
  }

  next();
};
app.use(preventHotLingking);

app.use("/asset", express.static("static"));

app.listen(3000, () => {
  console.log("listen localhost:3000");
});
