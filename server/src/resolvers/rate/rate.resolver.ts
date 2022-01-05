import { isUserAuth } from "../../utils/middlewares";
import { Resolver, Ctx, Mutation, UseMiddleware } from "type-graphql";
import { RateMealResponse } from "../../utils/responses/meal/RateMealResponse";
import { IContext } from "../../utils/types/Context";
import { User } from "../../entity/User";

@Resolver()
export class RateMealResolver {
  @UseMiddleware(isUserAuth)
  @Mutation(() => RateMealResponse)
  async rate(@Ctx() ctx: IContext): Promise<RateMealResponse> {
    //return "damn right !!";
    const user = await User.findOne({ where: { id: ctx.payload.usr_id } });
    if (!user) {
      return {
        status: false,
        message: "User not found wtf you fucking witch !",
      };
    }

    return {
      status: true,
      message: `USER ID : ${ctx.payload.usr_id}`,
    };
  }
}
