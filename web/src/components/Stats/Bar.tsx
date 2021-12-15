import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const Bar: React.FC = () => {
  return (
    <Box>
      <Text>👩‍🚒</Text>
      <Box w={"20px"} height={"50px"} bg={"#FFB3C8"} />
      <Text>68%</Text>
    </Box>
  );
};
