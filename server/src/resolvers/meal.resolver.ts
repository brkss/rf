import { Resolver, Query, Mutation } from "type-graphql";
import { Meal } from "../entity/Meal";
import moment from "moment";

@Resolver()
export class MealResolver {
  @Query(() => String)
  tping() {
    return "tpong !";
  }

  // This function is not final
  // BIG MESS !!!
  // this need some real recoding
  @Query(() => Meal, { nullable: true })
  async mealTime(): Promise<Meal | null> {
    const now = "11:00:01 pm";
    const _now = moment(now, "hh:mm:ss a");
    const meals = await Meal.find();
    const mealsTime = meals.map((meal) => ({
      id: meal.id,
      start: moment(meal.start, "hh:mm:ss a"),
      end: moment(meal.end, "hh:mm:ss a"),
    }));

    let target: any;
    // check if we are in meal interval
    for (let meal of mealsTime) {
      if (_now.isBetween(meal.start, meal.end)) {
        const m = await Meal.findOne({ where: { id: meal.id } });
        return m as Meal | null;
      }
    }
    // get closest meal !
    for (let meal of mealsTime) {
      if (meal.start.diff(_now) > 0) {
        if (target) {
          if (meal.start.diff(target.start) < 0) target = meal;
        } else target = meal;
      }
    }

    if (target) {
      const m = await Meal.findOne({ where: { id: target.id } });
      return (m as Meal) || null;
    }
    // get closest meal if we past the last meal !
    for (let meal of mealsTime) {
      if (meal.start.add(1, "days").diff(_now) > 0) {
        if (target) {
          if (meal.start.add(1, "days").diff(target.start.add(1, "days")) < 0)
            target = meal;
        } else target = meal;
      }
    }

    const m = await Meal.findOne({ where: { id: target.id } });
    return (m as Meal) || null;
  }
}

/*
                                LUNCH                                     DINNER                       
00 -------------------- [12] ||||||||||| [15] -----[ NOW ]-------- [20] |||||||||| [22] ---------------- 00

 */
