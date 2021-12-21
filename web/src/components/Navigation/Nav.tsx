import React from "react";
import { Box, Center, Wrap, WrapItem } from "@chakra-ui/react";

export const Nav: React.FC = () => {
  return (
    <Box
      pos={"fixed"}
      zIndex={"999"}
      style={{ backdropFilter: "blur(5px)" }}
      w={"100%"}
      bg={"#e2e8f070"}
      padding={"12px"}
    >
      <Wrap>
        <WrapItem>
          <Center
            bg="gray.300"
            fontSize={"12px"}
            fontWeight={"bold"}
            rounded={"50px"}
            p={"3px 13px"}
          >
            bberkass
          </Center>
        </WrapItem>
      </Wrap>
    </Box>
  );
};
