import { Button, Text } from "@chakra-ui/react";
import { BsLightbulbOff, BsLightbulb } from "react-icons/bs";
import styled from "styled-components";
import { useSocketProvider } from "../../providers/Socket";
import { decodeJSON } from "../../utils";
import React from "react";
import { postStateChange } from "../../api/homeassistant";

const getOpacity = (isOn: "on" | "off") => (isOn === "on" ? 1 : 0.2);

const LightIcon = ({ isOn }: { isOn: "off" | "on" }) => {
  return (
    <>
      {isOn === "on" ? (
        <BsLightbulb fontSize="24px" />
      ) : (
        <BsLightbulbOff opacity={getOpacity(isOn)} fontSize="24px" />
      )}
    </>
  );
};

const StyledButton = styled(Button)`
  &:active {
    background-color: #ffffff00;
  }
`;

const LightButton = ({
  isOn,
  id,
  children,
}: {
  isOn: "off" | "on";
  id: string;
  children: string;
}) => {
  const socket = useSocketProvider();

  const [isLightOn, setIsLightOn] = React.useState(isOn);
  const buttonRef = React.useRef();

  socket.addEventListener("message", (e: any) => {
    const data = decodeJSON(e.data);

    if (id === data?.event?.data?.entity_id) {
      console.log(data);
      setIsLightOn(data?.event?.data?.new_state?.state);
    }
  });

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
        transform: "scale(1.05)",
      }}
      _active={{
        backgroundColor: "#ffffff4f",
        transform: "scale(0.98)",
      }}
      _focus={{
        backgroundColor: "#00000052",
      }}
      onClick={() => {
          postStateChange(isLightOn === "on" ? "turn_off" : "turn_on", id);

        // @ts-ignore
        buttonRef?.current?.blur();
      }}
    >
      <LightIcon isOn={isLightOn} />
      <Text
        paddingTop="10px"
        fontFamily="'Sofia Sans', sans-serif"
        fontSize="12px"
        opacity={getOpacity(isLightOn)}
      >
        {children}
      </Text>
    </StyledButton>
  );
};

export default LightButton;
