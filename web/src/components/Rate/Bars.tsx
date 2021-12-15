import React from "react";
import { Center, Box } from "@chakra-ui/react";
import { Bar } from "../Stats/Bar";

export const Bars: React.FC = () => {
  return (
    <Box bg={"gray.50"} h={"100vh"}>
      <Center h={"100%"}>
        <Bar />
      </Center>
    </Box>
  );
};
