import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps,
} from "react-router-dom";
import { routes } from "./utils/config/routes";

export const Application: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {routes.map((route, key) => (
            <Route
              path={route.path}
              key={key}
              exact={route.exact}
              render={(props: RouteComponentProps) => (
                <route.component {...route.name} {...route.props} {...props} />
              )}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </>
  );
};
