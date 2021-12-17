import React from "react";
import {
  Center,
  Box,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import CountDown from "react-countdown";

interface Props {
  time: string;
}

export const Timer: React.FC<Props> = ({ time }) => {
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    console.log("time : ", time);
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
            <CountDown date={time} renderer={renderer} />
          </CircularProgressLabel>
        </CircularProgress>
      </Center>
    </Box>
  );
};
