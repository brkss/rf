import { Meal } from "../../entity/Meal";

const meal_data = [
  {
    name: "Lunch",
    start: "12:00:00 PM",
    end: "03:00:00 PM",
  },
  {
    name: "Dinner",
    start: "20:00:00 PM",
    end: "22:00:00 PM",
  },
];

export const dropMeals = async () => {
  const meals = await Meal.find();
  meals.map(async (meal) => {
    await meal.remove();
  });
};

export const seedMeals = async () => {
  meal_data.map(async (m, _) => {
    const meal = Meal.create({
      name: m.name,
      start: m.start,
      end: m.end,
    });
    console.log(`✅ [${m.name}] CREATED SUCCESSFULY !`);
    await meal.save();
  });
};
