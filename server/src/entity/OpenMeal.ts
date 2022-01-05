import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Meal } from "./Meal";

@Entity("open_meals")
export class OpenMeal extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: true })
  is_open: boolean;

  @ManyToOne(() => Meal, (meal) => meal.openMeals, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  meal: Meal;
}
