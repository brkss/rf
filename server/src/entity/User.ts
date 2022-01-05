import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Rate } from "./Rate";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column()
  campus_id: number;

  @Field()
  @Column()
  campus: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column({ default: 0 })
  version: number;

  @Field(() => [Rate])
  @OneToMany(() => Rate, (rate) => rate.user)
  rates: Rate[];
}
