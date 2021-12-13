import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class AuthDefaultResponse {
  @Field()
  status: boolean;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  token?: string;
}
