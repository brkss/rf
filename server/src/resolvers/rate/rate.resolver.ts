import { isUserAuth } from "../../utils/middlewares";
import { Resolver, Ctx, Mutation, UseMiddleware, Arg } from "type-graphql";
import { RateMealResponse } from "../../utils/responses/meal/RateMealResponse";
import { IContext } from "../../utils/types/Context";
import { User, Rate } from "../../entity";
import moment from "moment";
import { MealResolver } from "../meal.resolver";
import { Between } from "typeorm";
import { RateType } from "../../utils/types/Rate";
import { checkExpression } from "../../utils/checker/rate.checker";

@Resolver()
export class RateMealResolver {
  @UseMiddleware(isUserAuth)
  @Mutation(() => RateMealResponse)
  async rate(
    @Arg("expression") expression: RateType,
    @Ctx() ctx: IContext
  ): Promise<RateMealResponse> {
    //return "damn right !!";
    if (!expression || !checkExpression(expression)) {
      return {
        status: false,
        message: "Invalid data !",
      };
    }
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
    // check if user already rated this meal !
    const mealStart = moment(mealTime.meal.start, "hh:mm:ss a");
    const mealEnd = moment(mealTime.meal.end, "hh:mm:ss a");
    const rateRecord = await Rate.find({
      where: {
        user: user,
        meal: mealTime.meal,
        created_at: Between(mealStart.toDate(), mealEnd.toDate()),
      },
    });
    if (rateRecord.length > 0) {
      return {
        status: false,
        message: "You already rated on this meal !",
      };
    }

    const rate = new Rate();
    rate.meal = mealTime.meal;
    rate.user = user;
    rate.expression = expression;
    await rate.save();

    return {
      status: true,
      message: "Thank you for rating !",
    };
  }
}
