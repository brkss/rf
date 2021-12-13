import { IRoute } from "../types/Route";
import { Home } from "../../pages";

export const routes: IRoute[] = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: Home,
  },
];
