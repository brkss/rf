import { IRoute } from "../types/Route";
import { Home, Login, Verification, FeedBack } from "../../pages";

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
  {
    name: "Feedback",
    path: "/feedback",
    exact: true,
    component: FeedBack,
  },
];
