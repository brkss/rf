import React from "react";
import { Box, Center, Spinner, useToast } from "@chakra-ui/react";
import { Reactions, Bars, Timer } from "../components";
import { useMealTimeQuery } from "../generated/graphql";
import moment from "moment";

export const FeedBack: React.FC = () => {
  const { data, loading, error, refetch } = useMealTimeQuery();
  const toast = useToast();

  const checkTime = (
    time: string,
    is_tomorrow?: boolean,
    is_yersterday?: boolean
  ) => {
    if (is_tomorrow) {
      return moment(time, "hh:mm:ss a").add(1, "days").toISOString();
    } else if (is_yersterday) {
      return moment(time, "hh:mm:ss a").subtract(1, "days").toISOString();
    }
    return moment(time, "hh:mm:ss a").toISOString();
  };
  if (loading || !data || !data.mealTime)
    return (
      <Center h={"100vh"}>
        <Spinner />
      </Center>
    );
  return (
    <Box>
      {data!.mealTime!.is_current ? (
        <Reactions meal={data!.mealTime!.meal.name} />
      ) : (
        <Timer
          time={checkTime(
            data.mealTime.meal.start,
            data.mealTime.is_tomorrow,
            false
          )}
          label={data!.mealTime!.meal.start}
          mealName={data!.mealTime!.meal.name}
          mealBeforeEndTime={checkTime(
            data.mealTime.meal_before.meal.start,
            false,
            data.mealTime.meal_before.is_yesterday
          )}
          reload={() => refetch()}
        />
      )}
      <Bars />
    </Box>
  );
};
