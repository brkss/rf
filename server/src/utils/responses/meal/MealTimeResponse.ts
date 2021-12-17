import { Field, ObjectType } from "type-graphql";
import { Meal } from "../../../entity/Meal";

@ObjectType()
export class MealTimeResponse {
  @Field()
  is_current: boolean;

  @Field()
  is_tommorow: boolean;

  @Field(() => Meal)
  meal: Meal;
}
