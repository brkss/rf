import { Between } from "typeorm";
import { Resolver, Query } from "type-graphql";
import { Meal, Rate } from "../../entity";
import { checkStatsMeal } from "../../utils/checker/stats.checker";
import { StatsMealResponse } from "../../utils/responses/meal/StatsMealResponse";

@Resolver()
export class StatsResolver {
  @Query(() => StatsMealResponse)
  async mealStats(): Promise<StatsMealResponse> {
    // get meal in range
    //const now = new Date().toLocaleTimeString(times);
    const target = await checkStatsMeal();
    if (!target) {
      return {
        status: false,
        message: "Something went wrong !",
      };
    }
    const start = target.start;
    const end = target.end;
    const meal = await Meal.findOne({ where: { id: target!.id } });
    const records = await Rate.find({
      where: {
        meal: meal,
        created_at: Between(start.toDate(), end.toDate()),
      },
    });
    console.log("records : ", records);
    return {
      status: true,
    };
  }
}
