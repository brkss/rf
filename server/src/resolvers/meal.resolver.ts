import { Resolver, Query } from "type-graphql";
import { Meal } from "../entity/Meal";
import moment from "moment";
import { MealTimeResponse } from "../utils/responses/meal/MealTimeResponse";
import { checkTargetMeal } from "../utils/checker/meal.checker";

@Resolver()
export class MealResolver {
  @Query(() => String)
  tping() {
    return "tpong !";
  }

  // This function is not final
  // BIG MESS !!!
  @Query(() => MealTimeResponse, { nullable: true })
  async mealTime(): Promise<MealTimeResponse | null> {
    /*
    let now = new Date().toLocaleTimeString("en-EN", {
      timeZone: "Africa/Casablanca",
    });
    //now = "12:30:00 pm";
    //now = "1:00:00 am";
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
        return {
          meal: m as Meal,
          is_current: true,
          is_tomorrow: false,
        };
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
      return {
        meal: m as Meal,
        is_tomorrow: false,
        is_current: false,
      };
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
    */
    const target = await checkTargetMeal();
    console.log("target -> ", target.id);
    const m = await Meal.findOne({ where: { id: target } });
    return {
      meal: m as Meal,
      is_current: false,
      is_tomorrow: true,
    };
  }
}

/*
                                LUNCH                                     DINNER                       
00 -------------------- [12] ||||||||||| [15] -----[ NOW ]-------- [20] |||||||||| [22] ---------------- 00

 */
