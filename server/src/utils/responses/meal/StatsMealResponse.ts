import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class StatsMealResponse {
  @Field()
  status: boolean;

  @Field({ nullable: true })
  message?: string;

  // here goes more field about stats
}
