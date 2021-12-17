import React from "react";
import { Route, useHistory, RouteComponentProps } from "react-router-dom";
import { IRoute } from "../../utils/types/Route";
import { getAccessToken } from "../../utils/token/token";

interface Props {
  route: IRoute;
}

export const GuardRoute: React.FC<Props> = ({ route }) => {
  const history = useHistory();

  if (getAccessToken() == "") history.push("/login");
  return (
    <Route
      exact={route.exact}
      path={route.path}
      render={(props: RouteComponentProps) => (
        <route.component {...route.name} {...route.props} {...props} />
      )}
    />
  );
};
