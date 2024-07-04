import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

// 验证对象
export class UserDto {
  @IsNotEmpty({ message: "名字必填" })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsNotEmpty({ message: "邮箱必填" })
  @IsEmail({}, { message: "邮箱格式不对" })
  email: string;
}
