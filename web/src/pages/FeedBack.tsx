import React from "react";
import { Box } from "@chakra-ui/react";
import { Reactions, Bars } from "../components";

export const FeedBack: React.FC = () => {
  return (
    <Box>
      <Reactions />
      <Bars />
    </Box>
  );
};
