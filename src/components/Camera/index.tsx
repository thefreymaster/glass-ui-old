import React from "react";
import { useGlobalState } from "../../providers/Global";
import { useSocketProvider } from "../../providers/Socket";
import { decodeJSON, getEntity } from "../../utils";
import Glass from "../../common/GlassCard";
// import { getImage } from "../../api/homeassistant";
import { Image } from "@chakra-ui/react";
// import ReactPlayer from 'react-player'

export const Camera = () => {
  const { entities } = useGlobalState();
  const cameraEntity = getEntity(entities, "camera.front_porch_high");

  const socket = useSocketProvider();

  const [camera, setCamera] = React.useState(cameraEntity);

  socket.addEventListener("message", (e: any) => {
    const data = decodeJSON(e.data);

    if ("camera.front_porch_high" === data?.event?.data?.entity_id) {
      setCamera(data?.event?.data?.new_state);
    }
  });

  return (
    <Glass.Card>
      <Glass.CardHeader>{camera.attributes?.friendly_name}</Glass.CardHeader>
      <Glass.CardMetric>
        <Image
          borderRadius="10px"
          objectFit="cover"
          src={`http://homeassistant.local:8123${camera?.attributes?.entity_picture}`}
        />
      </Glass.CardMetric>
    </Glass.Card>
  );
};
