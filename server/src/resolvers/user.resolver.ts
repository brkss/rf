import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { generateToken } from "../utils/token/generate";
import { AuthDefaultResponse } from "../utils/responses/auth";

@Resolver()
export class UserResolver {
  @Query(() => String)
  ping() {
    return "pong !";
  }

  @Mutation(() => AuthDefaultResponse)
  async auth(@Arg("code") code: string): Promise<AuthDefaultResponse> {
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
    return {
      status: true,
      message: "Loggin successfuly !",
      token: _access.token.access_token,
    };
  }
}
