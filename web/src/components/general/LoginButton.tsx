import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import logo from "../../assets/logo.png";

interface Props {
  label: string;
  clicked: () => void;
}

export const LoginButton: React.FC<Props> = ({ label, clicked }) => {
  return (
    <Box
      onClick={() => clicked()}
      bg={"gray.100"}
      p={"10px"}
      rounded={"5px"}
      d={"flex"}
      justifyContent={"center"}
      cursor={"pointer"}
    >
      <Image w={"40px"} d={"inline-block"} src={logo} mr={"10px"} />
      <Text
        fontSize={"20px"}
        fontWeight={"bold"}
        mt={"-2px"}
        d={"inline-block"}
      >
        {label}
      </Text>
      <Button onClick={() => clicked()}>{label}</Button>
    </Box>
  );
};

const Button = styled.button`
  padding: 10px 19px;
  background: black;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  display: none;
`;
