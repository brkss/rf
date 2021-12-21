import React from "react";
import { Box, Center } from "@chakra-ui/react";
import { LoginButton } from "../../components";
import { getAccessToken } from "../../utils/token/token";
import { Redirect, useHistory } from "react-router-dom";
import { useAuthMutation } from "../../generated/graphql";
import queryString from "querystring";

export const Login: React.FC<any> = (props) => {
  const history = useHistory();
  const [auth] = useAuthMutation();

  const parseParams = () => {
    const params = queryString.parse(props.location.search);
    //if (!params.code) history.push("/login");
    if (params.code) {
      auth({
        variables: {
          code: params.code as string,
        },
        onCompleted: (res) => {
          if (res.auth.status) {
            history.push("/feedback");
          } else {
            console.log("something went wrong ! ");
          }
        },
      });
    }
    console.log("code => ", params.code);
  };

  React.useEffect(() => {
    parseParams();
  }, []);

  const authorize = () => {
    window.open(
      "https://api.intra.42.fr/oauth/authorize?client_id=9fa33f88a4ea0fcf0bf5f7901e5cce3e3bf6c6e55178920d2d379d2d0440121d&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code"
    );
  };
  if (getAccessToken()) return <Redirect to="/feedback" />;

  return (
    <Box h={"100vh"}>
      <Center h={"100%"}>
        <LoginButton label={"Login With Intra"} clicked={() => authorize()} />
      </Center>
    </Box>
  );
};
