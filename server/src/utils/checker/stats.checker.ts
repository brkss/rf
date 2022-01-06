import { Meal, Rate } from "../../entity";
import moment, { Moment } from "moment";
import { RATES } from "../types/Rate";

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
  //now = "20:10:00 pm";
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
          target = {
            id: meal.id,
            start: meal.start.subtract(1, "day"),
            end: meal.end.subtract(1, "day"),
          };
      } else
        target = {
          id: meal.id,
          start: meal.start.subtract(1, "day"),
          end: meal.end.subtract(1, "day"),
        };
    }
  }
  return target;
};

// Count every expression to get meal final stats !
export const generateStats = (recs: Rate[]) => {
  // collect stats
  let stats = RATES.map((r) => ({
    ident: r,
    count: recs.filter((rec) => rec.expression == r).length,
    percent: 0,
  }));

  let count = 0;
  stats.map((s) => {
    count += s.count;
  });

  stats = stats.map((s) => ({
    count: s.count,
    ident: s.ident,
    percent: (s.count * 100) / count,
  }));
  return stats;
};
