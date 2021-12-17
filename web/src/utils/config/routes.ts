import { IRoute } from "../types/Route";
import { Home, Login, Verification, FeedBack } from "../../pages";

export const routes: IRoute[] = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: Home,
    protected: false,
  },
  {
    name: "Login",
    path: "/login",
    exact: true,
    component: Login,
    protected: false,
  },
  {
    name: "Verification",
    path: "/verification",
    exact: true,
    component: Verification,
    protected: false,
  },
  {
    name: "Feedback",
    path: "/feedback",
    exact: true,
    component: FeedBack,
    protected: true,
  },
];
