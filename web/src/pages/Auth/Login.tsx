import React from "react";
import { Box, Center, Heading } from "@chakra-ui/react";
import { LoginButton } from "../../components";

export const Login: React.FC = () => {
  const authorize = () => {
    window.open(
      "https://api.intra.42.fr/oauth/authorize?client_id=9fa33f88a4ea0fcf0bf5f7901e5cce3e3bf6c6e55178920d2d379d2d0440121d&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code"
    );
  };

  return (
    <Box h={"100vh"}>
      <Center h={"100%"}>
        <LoginButton label={"Login With Intra"} clicked={() => authorize()} />
      </Center>
    </Box>
  );
};
