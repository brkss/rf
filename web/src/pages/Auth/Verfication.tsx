import React from "react";
import { Spinner, Center, Box } from "@chakra-ui/react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

export const Verification: React.FC<any> = (props) => {
  const history = useHistory();
  const parseParams = () => {
    const params = queryString.parse(props.location.search);
    if (!params.code) history.push("/login");

    console.log("code => ", params.code);
  };

  React.useEffect(() => {
    parseParams();
  }, []);

  return (
    <Box h={"100vh"}>
      <Center h={"100%"}>
        <Spinner />
      </Center>
    </Box>
  );
};
