"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedMeals = exports.dropMeals = void 0;
const Meal_1 = require("../../entity/Meal");
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
const dropMeals = async () => {
    const meals = await Meal_1.Meal.find();
    meals.map(async (meal) => {
        await meal.remove();
    });
};
exports.dropMeals = dropMeals;
const seedMeals = async () => {
    meal_data.map(async (m, _) => {
        const meal = Meal_1.Meal.create({
            name: m.name,
            start: m.start,
            end: m.end,
        });
        console.log(`✅ [${m.name}] CREATED SUCCESSFULY !`);
        await meal.save();
    });
};
exports.seedMeals = seedMeals;
//# sourceMappingURL=meals.js.map