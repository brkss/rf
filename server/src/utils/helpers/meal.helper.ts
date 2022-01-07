import moment, { Moment } from "moment";
import { Meal } from "../../entity/Meal";

interface ITargetMeal {
  id: string;
  start: Moment;
  end: Moment;
}

interface ITargetMealResponse {
  target: ITargetMeal;
  meal_before: Meal | undefined;
  is_tomorrow: boolean;
  is_current: boolean;
}

export const getTargetedMeal = async (): Promise<ITargetMealResponse> => {
  let now = new Date().toLocaleTimeString("en-EN", {
    timeZone: "Africa/Casablanca",
  });
  //now = "12:30:00 pm";
  //now = "1:00:00 am";
  const _now = moment(now, "hh:mm:ss a");
  const meals = await Meal.find();
  const mealsTime = meals.map((meal) => ({
    id: meal.id,
    start: moment(meal.start, "hh:mm:ss a"),
    end: moment(meal.end, "hh:mm:ss a"),
  }));

  let target: ITargetMeal | null = null;
  // check if we are in meal interval
  for (let meal of mealsTime) {
    if (_now.isBetween(meal.start, meal.end)) {
      return {
        target: meal,
        meal_before: await mealBefore(target!.start),
        is_current: true,
        is_tomorrow: false,
      };
    }
  }
  // get closest meal !
  for (let meal of mealsTime) {
    if (meal.start.diff(_now) > 0) {
      if (target) {
        if (meal.start.diff(target.start) < 0) target = meal;
      } else target = meal;
    }
  }

  if (target) {
    return {
      target: target,
      meal_before: await mealBefore(target!.start),
      is_tomorrow: false,
      is_current: false,
    };
  }
  // get closest meal if we past the last meal !
  for (let meal of mealsTime) {
    if (meal.start.add(1, "days").diff(_now) > 0) {
      if (target) {
        if (meal.start.add(1, "days").diff(target.start.add(1, "days")) < 0)
          target = meal;
      } else target = meal;
    }
  }
  return {
    target: target!,
    meal_before: await mealBefore(target!.start.add(1, "day")),
    is_current: false,
    is_tomorrow: true,
  };
};

export const mealBefore = async (start: Moment): Promise<Meal | undefined> => {
  const meals = await Meal.find();
  const mealsTime = meals!.map((meal) => ({
    id: meal.id,
    start: moment(meal.start, "hh:mm:ss a"),
    end: moment(meal.end, "hh:mm:ss a"),
  }));

  let target: any = null;
  for (let meal of mealsTime) {
    if (start.isAfter(meal.start)) {
      if (target) {
        if (target.start.isBefore(meal.start)) target = meal;
      } else target = meal;
    }
  }

  return await Meal.findOne({ where: { id: target.id } });
};
