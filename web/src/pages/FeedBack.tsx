import React from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { Reactions, Bars, Timer } from "../components";
import { useMealTimeQuery } from "../generated/graphql";
import moment from "moment";

export const FeedBack: React.FC = () => {
  const { data, loading, error } = useMealTimeQuery();

  const checkTime = () => {
    if (data!.mealTime!.is_tomorrow) {
      return moment(data!.mealTime!.meal.start, "hh:mm:ss a")
        .add(1, "days")
        .toISOString();
    }
    return moment(data!.mealTime!.meal.start, "hh:mm:ss a").toISOString();
  };

  if (loading)
    return (
      <Center h={"100vh"}>
        <Spinner />
      </Center>
    );
  return (
    <Box>
      {data!.mealTime!.is_current ? (
        <Reactions />
      ) : (
        <Timer time={checkTime()} label={data!.mealTime!.meal.start} />
      )}
      <Bars />
    </Box>
  );
};
