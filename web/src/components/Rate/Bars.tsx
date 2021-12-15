import React from "react";
import { Center, Box, Grid, Text } from "@chakra-ui/react";
import { Bar } from "../Stats/Bar";
import { reactions } from "../../utils/data/reactions.data";

export const Bars: React.FC = () => {
  const getMaxRateExpression = () => {
    const rates = reactions.map((r) => parseInt(r.rate));
    const max = Math.max(...rates);
    return reactions[rates.indexOf(max)].expression;
  };

  return (
    <Box bg={"gray.50"} pos={"relative"} h={"100vh"}>
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
        <Text
          transition={".5s"}
          pos={"absolute"}
          bottom={"20%"}
          p={"5px 15px"}
          rounded={"50px"}
          bg={"#ffffff61"}
          fontWeight={"bold"}
        >
          {getMaxRateExpression() || "!"}
        </Text>
      </Center>
    </Box>
  );
};
