import React from "react";
import { Center, Box, Heading, Grid } from "@chakra-ui/react";

const data = [
  {
    emojis: "😡",
    bgColor: "#F47E7E",
  },
  {
    emojis: "😕",
    bgColor: "#F4D57E",
  },
  {
    emojis: "😶",
    bgColor: "#C9DAC6",
  },
  {
    emojis: "😁",
    bgColor: "#8EF47E",
  },
  {
    emojis: "😍",
    bgColor: "#FFB3C8",
  },
];

export const Reactions: React.FC = () => {
  const [selected, SetSelected] = React.useState(-1);
  return (
    <Box
      h={"100vh"}
      bg={data[selected]?.bgColor || "#FFFFFF"}
      transition={".3s"}
    >
      <Center h={"100%"}>
        <Grid
          h={10}
          w={{ base: "90%", md: "600px" }}
          templateColumns="repeat(5, 1fr)"
          gap={6}
        >
          {data.map((rec, key) => (
            <Box
              w="100%"
              h="10"
              key={key}
              cursor={"pointer"}
              textAlign="center"
              onClick={() => {
                SetSelected(key);
              }}
              opacity={selected == -1 ? 1 : selected != key ? 0.5 : 1}
            >
              <Heading fontSize={"44px"}>{rec.emojis}</Heading>
            </Box>
          ))}
        </Grid>
      </Center>
    </Box>
  );
};
