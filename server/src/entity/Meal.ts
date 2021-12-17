import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

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
}
