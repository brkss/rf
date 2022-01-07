import { Field, ObjectType } from "type-graphql";
import { Meal } from "../../../entity/Meal";

@ObjectType()
class MealBefore {
  @Field(() => Meal)
  meal: Meal;

  @Field()
  is_yesterday: boolean;
}

@ObjectType()
export class MealTimeResponse {
  @Field()
  is_current: boolean;

  @Field()
  is_tomorrow: boolean;

  @Field(() => Meal)
  meal: Meal;

  @Field(() => MealBefore)
  meal_before: MealBefore;
}
