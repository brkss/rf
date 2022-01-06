import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class StatsMealResponse {
  @Field()
  status: boolean;

  @Field({ nullable: true })
  message?: string;

  @Field(() => [Stats], { nullable: true })
  stats?: Stats[];

  // here goes more field about stats
}

@ObjectType()
class Stats {
  @Field()
  count: number;

  @Field()
  ident: string;

  @Field()
  percent: number;
}
