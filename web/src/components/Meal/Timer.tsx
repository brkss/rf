import React from "react";
import {
  Center,
  Box,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import CountDown from "react-countdown";

export const Timer: React.FC = () => {
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a complete state
      return <p>Ready !</p>;
    } else {
      // Render a countdown
      return (
        <span>
          {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
        </span>
      );
    }
  };

  const formatTime = (time: number) => {
    if (time < 10) return `0${time}`;
    return time;
  };

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
            <CountDown date={Date.now() + 100000} renderer={renderer} />
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
