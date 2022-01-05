import { isUserAuth } from "../../utils/middlewares";
import { Resolver, Query, Mutation, UseMiddleware } from "type-graphql";
import { RateMealResponse } from "../../utils/responses/meal/RateMealResponse";

@Resolver()
export class RateMealResolver {
  @UseMiddleware(isUserAuth)
  @Mutation(() => RateMealResponse)
  rate() {
    //return "damn right !!";
  }
}
