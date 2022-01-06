import React from "react";
import {
  Center,
  Box,
  Heading,
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import CountDown from "react-countdown";
import moment from "moment";

interface Props {
  time: string;
  label: string;
  mealName: string;
  mealBeforeEndTime: string;
  reload: () => void;
}

export const Timer: React.FC<Props> = ({
  time,
  label,
  mealName,
  reload,
  mealBeforeEndTime,
}) => {
  const [progress, SetProgress] = React.useState<number | null>(null);
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    const mbet = moment(mealBeforeEndTime);
    const start = moment(time);
    const diff = start.diff(mbet);
    const rest = start.diff(moment());
    const p = (rest * 100) / diff;
    // to not exceed maximum update depth
    if (!progress || p <= progress - 0.1) {
      console.log("changed !!!!!!");
      SetProgress(p);
    }
    console.log("Progress ", p, progress);
    if (completed) {
      reload();
    } else {
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
        <Heading
          textTransform="uppercase"
          pos={"absolute"}
          fontSize={"16px"}
          top={"10%"}
        >
          🥗 {mealName} will be in
        </Heading>
        <CircularProgress
          size={"2xs"}
          thickness={"5px"}
          value={progress || 100}
          color="green.400"
        >
          <CircularProgressLabel
            fontSize={"20px"}
            fontWeight={"bold"}
            opacity={0.8}
          >
            <CountDown date={time} renderer={renderer} />
            <Text fontSize={"12px"}>{label}</Text>
          </CircularProgressLabel>
        </CircularProgress>
      </Center>
    </Box>
  );
};
