import React from "react";
import { Box } from "@chakra-ui/react";
import { Reactions, Bars, Timer } from "../components";

export const FeedBack: React.FC = () => {
  return (
    <Box>
      <Timer />
      <Reactions />
      <Bars />
    </Box>
  );
};
