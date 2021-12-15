import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const Bar: React.FC = () => {
  return (
    <Box textAlign={"center"}>
      <Text fontSize={"25px"}>😁</Text>
      <Box
        margin={"auto"}
        borderRadius={"50px"}
        w={"20px"}
        height={"50px"}
        bg={"#FFB3C8"}
      />
      <Text fontWeight={"bold"} fontSize={"15px"} marginTop={"7px"}>
        68%
      </Text>
    </Box>
  );
};
