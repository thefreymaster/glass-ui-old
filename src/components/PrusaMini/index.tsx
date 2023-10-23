import { useState } from "react";
import Glass from "../../common/GlassCard";
import { useGlobalState } from "../../providers/Global";
import { useSocketProvider } from "../../providers/Socket";
import { capitalizeFirstLetter, decodeJSON, getEntity } from "../../utils";
import { Box, useDisclosure, Image } from "@chakra-ui/react";

const PrusaMiniCore = ({ variant }: { variant: "modal" | "page" }) => {
  const { entities } = useGlobalState();
  const socket = useSocketProvider();

  const prusaMiniEntity = getEntity(entities, "sensor.prusamini");
  const prusaMiniProgressEntity = getEntity(
    entities,
    "sensor.prusamini_progress"
  );
  const prusaMiniFinishDateEntity = getEntity(
    entities,
    "sensor.prusamini_print_finish"
  );
  const prusaMiniMaterialEntity = getEntity(
    entities,
    "sensor.prusamini_material"
  );
  const prusaMiniImageEntity = getEntity(
    entities,
    "camera.prusamini_job_preview"
  );

  const [prusaMini, setPrusaMini] = useState(prusaMiniEntity);
  const [prusaMiniImage, setPrusaMiniImage] = useState(prusaMiniImageEntity);
  const [prusaMiniProgress, setPrusaMiniProgress] = useState(
    prusaMiniProgressEntity
  );
  const [prusaMiniFinishDate, setPrusaMiniFinishDate] = useState(
    prusaMiniFinishDateEntity
  );
  const [prusaMiniMaterial, setPrusaMiniMaterial] = useState(
    prusaMiniMaterialEntity
  );

  const prusaMiniFinishTime = new Date(
    prusaMiniFinishDate?.state
  ).toLocaleTimeString("en", { timeStyle: "short" });

  socket.addEventListener("message", (e: any) => {
    const data = decodeJSON(e.data);

    if ("sensor.prusamini_progress" === data?.event?.data?.entity_id) {
      setPrusaMiniProgress(data?.event?.data?.new_state);
    }
    if ("sensor.prusamini_print_finish" === data?.event?.data?.entity_id) {
      setPrusaMiniFinishDate(data?.event?.data?.new_state);
    }
    if ("sensor.prusamini" === data?.event?.data?.entity_id) {
      setPrusaMini(data?.event?.data?.new_state);
    }
    if ("sensor.prusamini_material" === data?.event?.data?.entity_id) {
      setPrusaMiniMaterial(data?.event?.data?.new_state);
    }
    if ("camera.prusamini_job_preview" === data?.event?.data?.entity_id) {
      setPrusaMiniImage(data?.event?.data?.new_state);
    }
  });

  console.log(prusaMiniImage);

  return (
    <Box display="flex" flexDir="column">
      <Box display="flex" flexDir="row">
        <Box display="flex" flexDir="column">
          <Glass.CardHeader>Prusa Mini+</Glass.CardHeader>
          <Glass.CardMetric
            fontSize={variant === "modal" ? "48px" : "24px"}
            style={{ lineHeight: variant === "modal" ? "48px" : "24px" }}
          >
            {prusaMini?.state === "printing"
              ? `${Number(prusaMiniProgress?.state)?.toFixed(0)}%`
              : capitalizeFirstLetter(prusaMini?.state)}
          </Glass.CardMetric>
          {prusaMini?.state === "printing" && (
            <Glass.CardHeader>
              Finishes at: {prusaMiniFinishTime}
            </Glass.CardHeader>
          )}
        </Box>
        <Box flexGrow="1" />
        {prusaMini?.state === "printing" && (
          <Box display="flex" alignItems="center">
            <Glass.CardMetric fontSize="24px" style={{ lineHeight: "24px" }}>
              {prusaMiniMaterial?.state}
            </Glass.CardMetric>
          </Box>
        )}
      </Box>
      {variant === "modal" && prusaMini?.state === "printing" && (
        <Box display="flex" alignItems="center">
          <Image
            minW="100%"
            borderRadius="10px"
            src={`http://homeassistant.local:8123${prusaMiniImage?.attributes?.entity_picture}`}
          />
        </Box>
      )}
    </Box>
  );
};

const PrusaMini = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Glass.CardModal isOpen={isOpen} onClose={onClose}>
        {isOpen && <PrusaMiniCore variant="modal" />}
      </Glass.CardModal>
      <Glass.Card onClick={onOpen}>
        <PrusaMiniCore variant="page" />
      </Glass.Card>
    </>
  );
};

export default PrusaMini;
