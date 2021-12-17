import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import {
  generateToken,
  wrapAccessToken,
  wrapRefreshToken,
} from "../utils/token";
import { AuthDefaultResponse } from "../utils/responses/auth";
import { IContext } from "../utils/types/Context";
import { userData } from "../utils/42";
import { User } from "../entity/User";
import { isUserAuth } from "../utils/middlewares";

@Resolver()
export class UserResolver {
  @Query(() => String)
  ping() {
    return "pong !";
  }

  @Mutation(() => AuthDefaultResponse)
  async auth(
    @Arg("code") code: string,
    @Ctx() ctx: IContext
  ): Promise<AuthDefaultResponse> {
    if (!code) {
      return {
        status: false,
        message: "Invalid Code !",
      };
    }
    const _access = await generateToken(code);
    if (!_access) {
      return {
        status: false,
        message: "Unauthorized !",
      };
    }
    console.log("access info => ", _access);
    // check if user exist
    const user_data = await userData(_access.token.access_token);
    if (
      !user_data ||
      user_data.campus_id != 21 ||
      user_data.campus != "Benguerir"
    )
      return {
        status: false,
        message: "Invalid user !",
      };

    let user = await User.findOne({ where: { username: user_data.username } });
    if (!user) {
      user = new User();
      user.name = user_data.name;
      user.campus = user_data.campus;
      user.campus_id = user_data.campus_id;
      user.username = user_data.username;
      await user.save();
    }
    //console.log("user data => ", user_data);

    const _token = wrapAccessToken({
      token: _access.token.access_token,
      expire_in: _access.token.expires_in,
      created_at: _access.token.created_at,
      usr_id: user.id,
    });
    const _refreshToken = wrapRefreshToken({
      token: _access.token.refresh_token,
      usr_id: user.id,
    });
    ctx.res.cookie("uid", _refreshToken, {
      httpOnly: true,
    });
    return {
      status: true,
      message: "Loggin successfuly !",
      token: _token,
    };
  }

  @UseMiddleware(isUserAuth)
  @Query(() => User)
  async me(@Ctx() ctx: IContext): Promise<User> {
    console.log("payload : ", ctx.payload);
    const user = await User.findOne({ where: { id: ctx.payload.usr_id } });
    return user!;
  }
}
