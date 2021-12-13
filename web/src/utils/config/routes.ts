import { IRoute } from "../types/Route";
import { Home, Login, Verification } from "../../pages";

export const routes: IRoute[] = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: Home,
  },
  {
    name: "Login",
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    name: "Verification",
    path: "/verification",
    exact: true,
    component: Verification,
  },
];
