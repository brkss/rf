import React from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { Reactions, Bars, Timer } from "../components";
import { useMealTimeQuery } from "../generated/graphql";

export const FeedBack: React.FC = () => {
  const _mealTime = useMealTimeQuery();

  if (_mealTime.loading)
    return (
      <Center h={"100vh"}>
        <Spinner />
      </Center>
    );
  return (
    <Box>
      {_mealTime.data!.mealTime!.is_current ? <Reactions /> : <Timer />}
      <Bars />
    </Box>
  );
};
