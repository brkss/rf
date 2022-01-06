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
    const targetResp = await checkTargetMeal();
    console.log("target -> ", targetResp.target.id);
    const m = await Meal.findOne({ where: { id: targetResp.target.id } });
    return {
      meal: m as Meal,
      is_current: targetResp.is_current,
      is_tomorrow: targetResp.is_tomorrow,
    };
  }
}

/*
                                LUNCH                                     DINNER                       
00 -------------------- [12] ||||||||||| [15] -----[ NOW ]-------- [20] |||||||||| [22] ---------------- 00

 */
