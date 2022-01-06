import { Meal } from "../../entity/Meal";
import moment, { Moment } from "moment";

interface IStatsMeal {
  id: string;
  start: Moment;
  end: Moment;
}

// this function get meal for stats
// RETURN :
// @meal : Promise<Meal>

export const checkStatsMeal = async () => {
  const meals = await Meal.find();
  const mealsTime = meals.map((meal) => ({
    id: meal.id,
    start: moment(meal.start, "hh:mm:ss a"),
    end: moment(meal.end, "hh:mm:ss a"),
  }));

  let now = new Date().toLocaleTimeString("en-EN", {
    timeZone: "Africa/Casablanca",
  });
  //const now = "1:00:00 pm";
  const _now = moment(now, "hh:mm:ss a");

  for (let m of mealsTime) {
    if (_now.isBetween(m.start, m.end)) {
      return m;
    }
  }

  // get previous meal
  let target: IStatsMeal | null = null;
  for (let meal of mealsTime) {
    if (meal.start.diff(_now) < 0) {
      if (target) {
        if (meal.start.diff(target.start) > 0) target = meal;
      } else target = meal;
    }
  }

  if (target) return target;

  // get closest meal if we past the last meal !
  for (let meal of mealsTime) {
    if (meal.start.subtract(1, "days").diff(_now) < 0) {
      if (target) {
        if (
          meal.start
            .subtract(1, "days")
            .diff(target.start.subtract(1, "days")) > 0
        )
          target = meal;
      } else target = meal;
    }
  }
  return target;
};
