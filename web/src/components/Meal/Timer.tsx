import React from "react";
import {
  Center,
  Box,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

export const Timer: React.FC = () => {
  return (
    <Box bg={"gray.100"} h={"100vh"}>
      <Center h={"100%"}>
        <CircularProgress
          size={"2xs"}
          thickness={"5px"}
          value={40}
          color="green.400"
        >
          <CircularProgressLabel
            fontSize={"20px"}
            fontWeight={"bold"}
            opacity={0.8}
          >
            10:34:45
          </CircularProgressLabel>
        </CircularProgress>
        {/*
        <CircularProgress
          variant={"determinate"}
          aria-label={"60"}
          value={60}
          />*/}
      </Center>
    </Box>
  );
};
