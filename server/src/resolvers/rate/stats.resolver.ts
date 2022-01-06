import { Between } from "typeorm";
import { Resolver, Query } from "type-graphql";
import { Meal, Rate } from "../../entity";
import { checkStatsMeal } from "../../utils/checker/stats.checker";
import { StatsMealResponse } from "../../utils/responses/meal/StatsMealResponse";
import { RATES } from "../../utils/types/Rate";

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
    gen(records);
    return {
      status: true,
    };
  }
}
// Count every expression to get meal final stats !
const gen = async (recs: Rate[]) => {
  // collect stats
  let stats = RATES.map((r) => ({
    ident: r,
    count: recs.filter((rec) => rec.expression == r).length,
  }));

  let count = 0;
  stats.map((s) => {
    count += s.count;
  });

  stats = stats.map((s) => ({
    count: s.count,
    ident: s.ident,
    percent: (s.count * 100) / count,
  }));

  console.log("count => ", count);
  console.log("generated stats : ", stats);
};
