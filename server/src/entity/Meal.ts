import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { OpenMeal } from "./OpenMeal";

@ObjectType()
@Entity("meals")
export class Meal extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  start: string;

  @Field()
  @Column()
  end: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => OpenMeal, (openmeals) => openmeals.meal)
  openMeals: OpenMeal[];
}
