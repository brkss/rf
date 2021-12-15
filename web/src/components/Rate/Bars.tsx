import React from "react";
import { Center, Box, Grid } from "@chakra-ui/react";
import { Bar } from "../Stats/Bar";
import { reactions } from "../../utils/data/reactions.data";

export const Bars: React.FC = () => {
  return (
    <Box bg={"gray.50"} h={"100vh"}>
      <Center h={"100%"}>
        <Grid
          h={"80%"}
          w={{ base: "90%", md: "600px" }}
          templateColumns="repeat(5, 1fr)"
          gap={6}
        >
          {reactions.map((rec, key) => (
            <Bar
              rate={rec.rate}
              color={rec.bgColor}
              emojis={rec.emojis}
              key={key}
            />
          ))}
        </Grid>
      </Center>
    </Box>
  );
};
