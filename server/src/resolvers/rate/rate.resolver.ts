import { isUserAuth } from "../../utils/middlewares";
import { Resolver, Ctx, Mutation, UseMiddleware } from "type-graphql";
import { RateMealResponse } from "../../utils/responses/meal/RateMealResponse";
import { IContext } from "../../utils/types/Context";
import { User, Meal, OpenMeal } from "../../entity";
import moment from "moment";
import { MealResolver } from "../meal.resolver";

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

    const mealResolver = new MealResolver();
    const mealTime = await mealResolver.mealTime();
    // check if we have a current meal ?
    if (!mealTime || !mealTime.is_current || !mealTime.meal) {
      return {
        status: false,
        message: "Not meal time !",
      };
    }
    // check if meal already exist
    //const openmeal = await OpenMeal.find({where: {meal: mealTime.meal, }})
    //console.log("meal time => ", mealTime);

    return {
      status: true,
      message: `USER ID : ${ctx.payload.usr_id}`,
    };
  }
}
