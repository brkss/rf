import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class RateMealResponse {
  @Field()
  status: boolean;

  @Field({ nullable: true })
  message?: string;
}
