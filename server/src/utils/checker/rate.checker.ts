import { RATES } from "../types/Rate";
export const checkExpression = (exps: string): boolean => {
  if (RATES.includes(exps)) return true;
  return false;
};
