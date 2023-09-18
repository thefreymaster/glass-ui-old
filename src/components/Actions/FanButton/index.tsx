import React from "react";
import { useGlobalState } from "../../../providers/Global";
import { useSocketProvider } from "../../../providers/Socket";
import { decodeJSON, getEntity } from "../../../utils";
import GlassButton from "../../../common/GlassButton";
import { PiFan } from "react-icons/pi";
import { postService } from "../../../api/homeassistant";
import { Box } from "@chakra-ui/react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360000deg);
  }
`;

const StyledFanIcon = styled(PiFan)`
  animation: 1000s ${spin} ease-out;
  animation-iteration-count: infinite;
  will-change: transform;
`;

export const FanButton = () => {
  const { entities } = useGlobalState();

  const socket = useSocketProvider();

  const fanEntity = getEntity(entities, "fan.living_room_ceiling_fan");

  const [fan, setFan] = React.useState(fanEntity);

  socket.addEventListener("message", (e: any) => {
    const data = decodeJSON(e.data);

    if ("fan.living_room_ceiling_fan" === data?.event?.data?.entity_id) {
      console.log(data);
      setFan(data?.event?.data?.new_state);
    }
  });
  return (
    <GlassButton
      onClick={async function () {
        await postService({
          domain: "fan",
          service: "set_percentage",
          entityId: "fan.living_room_ceiling_fan",
          body: {
            percentage: fan?.state === "on" ? 0 : 100,
          },
        });
      }}
      isOn={fan?.state}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingBottom="10px"
      >
        {fan?.state === "on" ? (
          <StyledFanIcon fontSize="30px" />
        ) : (
          <PiFan fontSize="30px" />
        )}
      </Box>
      Living Room Fan
    </GlassButton>
  );
};
