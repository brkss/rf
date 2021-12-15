import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface Props {
  emojis: string;
  rate: string;
  color: string;
}

export const Bar: React.FC<Props> = ({ color, rate, emojis }) => {
  return (
    <Box h={"100%"} textAlign={"center"}>
      <Text fontSize={"25px"}>{emojis}</Text>
      <Box
        margin={"auto"}
        borderRadius={"50px"}
        w={"20px"}
        height={rate}
        bg={color}
      />
      <Text fontWeight={"bold"} fontSize={"15px"} marginTop={"7px"}>
        {rate}
      </Text>
    </Box>
  );
};
