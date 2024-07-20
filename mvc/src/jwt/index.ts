import { injectable } from "inversify";
import passport from "passport";
import jsonwebtoken from "jsonwebtoken";
import { Strategy, ExtractJwt } from "passport-jwt";

@injectable()
export class JWT {
  private secretKey = "your_secret_key"; // 请自行修改
  private jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: this.secretKey,
  };

  constructor() {
    this.strategy();
  }

  public strategy() {
    let str = new Strategy(this.jwtOptions, (payload, done) => {
      done(null, payload);
    });
    passport.use(str);
  }

  static middleware() {
    return passport.authenticate("jwt", { session: false });
  }

  /**生成Token */
  public createToken(data: object) {
    return jsonwebtoken.sign(data, this.secretKey, {
      expiresIn: "7d",
    });
  }

  /**关联express */
  public init() {
    return passport.initialize();
  }
}
