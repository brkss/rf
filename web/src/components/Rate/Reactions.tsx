import React from "react";
import { Center, Box, Heading, Grid, Text } from "@chakra-ui/react";
import { reactions } from "../../utils/data/reactions.data";

interface Props {
  meal: string;
}

export const Reactions: React.FC<Props> = ({ meal }) => {
  const [selected, SetSelected] = React.useState(-1);
  const [preSelect, SetPreSelect] = React.useState(-1);

  return (
    <Box
      h={"100vh"}
      bg={
        reactions[selected]?.bgColor ||
        reactions[preSelect]?.bgColor ||
        "#FFFFFF"
      }
      transition={".5s"}
    >
      <Center h={"100%"} pos={"relative"}>
        <Grid
          h={10}
          w={{ base: "90%", md: "600px" }}
          templateColumns="repeat(5, 1fr)"
          gap={6}
        >
          <Heading
            fontSize={"23px"}
            left={0}
            width={"100%"}
            textAlign={"center"}
            pos={"absolute"}
            top={"10%"}
          >
            {" "}
            How Was You {meal} ?
          </Heading>
          {reactions.map((rec, key) => (
            <Box
              w="100%"
              h="10"
              key={key}
              cursor={"pointer"}
              textAlign="center"
              onClick={() => {
                SetSelected(key);
              }}
              onMouseOver={() => {
                SetPreSelect(key);
              }}
              onMouseLeave={() => {
                SetPreSelect(-1);
              }}
              opacity={selected == -1 ? 1 : selected != key ? 0.5 : 1}
            >
              <Heading fontSize={"44px"}>{rec.emojis}</Heading>
            </Box>
          ))}
        </Grid>
        <Text
          transition={".5s"}
          pos={"absolute"}
          bottom={"20%"}
          p={"5px 15px"}
          rounded={"50px"}
          bg={"#ffffff61"}
          opacity={preSelect == -1 && selected == -1 ? 0 : 1}
          fontWeight={"bold"}
          cursor={"pointer"}
          className={selected != -1 ? "fb-btn" : ""}
        >
          {reactions[preSelect]?.expression ||
            reactions[selected]?.expression ||
            "!"}
        </Text>
      </Center>
    </Box>
  );
};
