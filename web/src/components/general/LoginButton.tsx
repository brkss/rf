import React from "react";
import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

interface Props {
  label: string;
  clicked: () => void;
}

export const LoginButton: React.FC<Props> = ({ label, clicked }) => {
  return (
    <Box>
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
`;
