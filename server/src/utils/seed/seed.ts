import { seedMeals, dropMeals } from "./meals";
import { createConnection } from "typeorm";

(async () => {
  await createConnection();
  await dropMeals();
  await seedMeals();
})();
