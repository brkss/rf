import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps,
  useHistory,
} from "react-router-dom";
import { routes } from "./utils/config/routes";
import { DEFAULT_API_URL } from "./utils/config/constants";
import { getAccessToken, setAccessToken } from "./utils/token/token";
import { Center, Spinner } from "@chakra-ui/react";
import { GuardRoute } from "./components";

export const Application: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch(`${DEFAULT_API_URL}/refresh_token`, {
      credentials: "include",
      method: "POST",
    }).then(async (res) => {
      const data = await res.json();
      if (data.status === true) {
        setAccessToken(data.token);
        console.log("access token", getAccessToken());
      }
      console.log("refresh token result => ", data);

      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <Center height="100vh">
        <Spinner size="md" />
      </Center>
    );

  return (
    <>
      <BrowserRouter>
        <Switch>
          {routes.map((route, key) =>
            route.protected ? (
              <GuardRoute route={route} key={key} />
            ) : (
              <Route
                path={route.path}
                key={key}
                exact={route.exact}
                render={(props: RouteComponentProps) => (
                  <route.component
                    {...route.name}
                    {...route.props}
                    {...props}
                  />
                )}
              />
            )
          )}
        </Switch>
      </BrowserRouter>
    </>
  );
};
