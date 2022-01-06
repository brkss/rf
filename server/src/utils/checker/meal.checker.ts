import moment, { Moment } from "moment";
import { Meal } from "../../entity/Meal";

interface ITargetMeal {
  id: string;
  start: Moment;
  end: Moment;
}

export const checkTargetMeal = async (): Promise<ITargetMeal> => {
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
      return meal;
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
    return target;
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
  return target!;
};
