import log4js from "log4js";
log4js.configure({
  appenders: {
    out: {
      type: "stdout",
      layout: {
        type: "colored",
      },
    },
    file: {
      filename: "logs/server.log",
      type: "file",
    },
  },
  categories: {
    default: {
      appenders: ["out", "file"],
      level: "debug",
    },
  },
});

const logger = log4js.getLogger("default");

/**
 * 每一个请求都会经过中间件
 * @param {*前端传参} req
 * @param {*返回数据} res
 * @param {*是否执行下一个中间件，不写就一直卡主} next
 */
const LoggerMiddleware = (req, res, next) => {
  logger.debug(`[${req.method} ${req.url}]`);
  next();
};

export default LoggerMiddleware;
