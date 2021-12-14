import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import {
  generateToken,
  wrapAccessToken,
  wrapRefreshToken,
} from "../utils/token";
import { AuthDefaultResponse } from "../utils/responses/auth";
import { IContext } from "../utils/types/Context";
import axios, { AxiosRequestConfig } from "axios";

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
    const _token = wrapAccessToken({
      token: _access.token.access_token,
      expire_in: _access.token.expires_in,
      created_at: _access.token.created_at,
    });
    const _refreshToken = wrapRefreshToken({
      token: _access.token.refresh_token,
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

  @Mutation(() => Boolean)
  async me(@Arg("at") at: string) {
    userData(at);
    return true;
  }
}

export const userData = async (access_token: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "https://api.intra.42.fr/v2/me",
    headers: { Authorization: `bearer ${access_token}` },
  };

  try {
    const res = await axios.request(config);
    console.log("campus : ", res.data.campus[0].name);
  } catch (e) {
    console.log("something went wrong ! ", e);
    return null;
  }
};
