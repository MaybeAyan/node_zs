import schedule from "node-schedule";
import request from "request";
import config from "./config.js";

schedule.scheduleJob("*/3 * * * * *", function () {
  request(
    config.check_url,
    {
      method: "POST",
      headers: {
        Referer: config.url,
        Cookie: config.cookie,
      },
    },
    function (err, res, body) {
      console.log(body);
    }
  );
});
