import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Meal } from "./Meal";
import { User } from "./User";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity("rates")
export class Rate extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  expression: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.rates, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;

  @Field(() => Meal)
  @ManyToOne(() => Meal, (meal) => meal.rates, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  meal: Meal;

  @Field()
  @CreateDateColumn()
  created_at: Date;
}
