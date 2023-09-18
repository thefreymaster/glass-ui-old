import { Button, Text } from "@chakra-ui/react";
import styled from "styled-components";
import React from "react";

const StyledButton = styled(Button)`
  &:active {
    background-color: #ffffff00;
  }
`;

const getOpacity = (isOn: "on" | "off") => (isOn === "on" ? 1 : 0.2);

const GlassButton = ({
  children,
  onClick,
  isOn
}: {
  children: React.ReactNode;
  onClick: () => void;
  isOn: "on" | "off"
}) => {
  const buttonRef = React.useRef();

  // @ts-ignore
  // const IconComp = () => <Icon fontSize="32px" />

  return (
    <StyledButton
      ref={buttonRef}
      backdropFilter="blur(25px)"
      backgroundColor="#ffffff00"
      display="flex"
      flexDir="column"
      height="100px"
      minWidth="100px"
      color="white"
      variant="ghost"
      transform="scale(1)"
      _hover={{
        backgroundColor: "#ffffff29",
        transform: "scale(1.08)",
      }}
      _active={{
        backgroundColor: "#ffffff4f",
        transform: "scale(0.98)",
      }}
      _focus={{
        backgroundColor: "#00000052",
      }}
      onClick={() => {
        onClick();

        // @ts-ignore
        buttonRef?.current?.blur();
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Text
        paddingTop="10px"
        fontFamily="'Sofia Sans', sans-serif"
        fontSize="12px"
        opacity={getOpacity(isOn)}
      >
        {children}
      </Text>
    </StyledButton>
  );
};

export default GlassButton;
