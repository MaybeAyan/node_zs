import {
  controller,
  httpGet as GetMapping,
  httpPost as PostMapping,
} from "inversify-express-utils";

import { UserService } from "./service";
import { inject } from "inversify";
import type { Request, Response } from "express";
import { JWT } from "../jwt";

@controller("/user")
export class User {
  constructor(@inject(UserService) private readonly UserService: UserService) {}

  // JWT.middleware()
  @GetMapping("/index")
  public async getIndex(req: Request, res: Response) {
    let result = await this.UserService.getList();
    res.send({
      code: 1,
      data: result,
    });
  }

  @PostMapping("/create")
  public async createUser(req: Request, res: Response) {
    console.log(req.body);
    let result = await this.UserService.createUser(req.body);
    res.send(result);
  }
}
