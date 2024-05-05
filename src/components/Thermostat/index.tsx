// import { Box, Button } from "@chakra-ui/react";
// import React from "react";
import React from "react";
// import { subscribeToChange } from "../../api/homeassistant";
import Glass from "../../common/GlassCard";
import { useGlobalState } from "../../providers/Global";
import { useSocketProvider } from "../../providers/Socket";
import { capitalizeFirstLetter, decodeJSON, getEntity } from "../../utils";
import { Box, Button } from "@chakra-ui/react";
import {
  AiOutlinePoweroff,
  AiOutlineArrowUp,
} from "react-icons/ai";
// import { BsSnow } from "react-icons/bs";
import { postService } from "../../api/homeassistant";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

export const TempInformation = ({
  name,
  entityId,
}: {
  name: string;
  entityId: string;
}) => {
  const { entities } = useGlobalState();
  const socket = useSocketProvider();
  const temperatureEntity = getEntity(entities, entityId);

  const [temperature, setTemperature] = React.useState(temperatureEntity);

  socket.addEventListener("message", (e: any) => {
    const data = decodeJSON(e.data);

    if (entityId === data?.event?.data?.entity_id) {
      setTemperature(data?.event?.data?.new_state);
    }
  });

  return (
    <Glass.Card
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      flexDirection="column"
      padding="0px"
      backgroundColor="#0000002e"
    >
      <Box
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="center"
        minWidth="100%"
      >
        <Glass.CardMetric
          style={{
            opacity: 1,
            height: "120px",
            padding: "5px",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px 0px 0px 20px",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Glass.CardFooter style={{ lineHeight: 0 }}>{name}</Glass.CardFooter>
          {`${Number(temperature.state)?.toFixed(0)}°`}
        </Glass.CardMetric>
      </Box>
    </Glass.Card>
  );
};

const Thermostat = ({
  thermostatId,
  name,
}: {
  thermostatId: string;
  name: string;
}) => {
  const summerModeId = "input_boolean.summermode";
  const { entities } = useGlobalState();
  const socket = useSocketProvider();

  const thermostatEntity = getEntity(entities, thermostatId);
  const summerModeEntity = getEntity(entities, summerModeId);

  const [thermostat, setThermostat] = React.useState(thermostatEntity);
  const [summerMode, setSummerMode] = React.useState(summerModeEntity);

  socket.addEventListener("message", (e: any) => {
    const data = decodeJSON(e.data);

    if (thermostatId === data?.event?.data?.entity_id) {
      setThermostat(data?.event?.data?.new_state);
    }

    if (summerModeId === data?.event?.data?.entity_id) {
      setSummerMode(data?.event?.data?.new_state);
    }
  });

  const hvacAction = thermostat?.state;

  const handleTemperatureIncrease = async () => {
    postService({
      domain: "climate",
      service: "set_temperature",
      entityId: thermostatId,
      body: {
        temperature: thermostat?.attributes?.temperature + 1,
      },
    });
  };

  const handleTemperatureDecrease = async () => {
    postService({
      domain: "climate",
      service: "set_temperature",
      entityId: thermostatId,
      body: {
        temperature: thermostat?.attributes?.temperature - 1,
      },
    });
  };

  const handleThermostatToggle = async () => {
    postService({
      domain: "climate",
      service: "set_hvac_mode",
      entityId: thermostatId,
      body: {
        hvac_mode: hvacAction === "off" ? "auto" : "off",
        entity_id: thermostatId,
      },
    });
  };

  return (
    <Glass.Card
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      flexDirection="column"
      padding="0px"
      backgroundColor={hvacAction === "cooling" ? "#0a8dff" : "#0000002e"}
    >
      <Box
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="center"
        minWidth="100%"
      >
        <Box flexGrow="1" />
        <Glass.CardMetric
          style={{
            opacity:
              hvacAction === "cooling" ||
              hvacAction === "idle" ||
              summerMode?.state === "off"
                ? 1
                : 0.4,
            height: "120px",
            padding: "5px",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px 0px 0px 20px",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Glass.CardFooter style={{ lineHeight: 0 }}>{name}</Glass.CardFooter>
          {summerMode?.state === "on"
            ? `${thermostat?.attributes?.temperature?.toFixed(0)}°`
            : `${thermostat?.attributes?.current_temperature?.toFixed(0)}°`}

          <Glass.CardFooter style={{ lineHeight: 0 }}>
            {summerMode?.state === "on" &&
              `${thermostat?.attributes?.current_temperature?.toFixed(0)}°`}
            {summerMode?.state === "on" &&
              capitalizeFirstLetter(hvacAction)}
          </Glass.CardFooter>
        </Glass.CardMetric>
        <Box flexGrow="1" />

        {summerMode?.state === "on" && (
          <>
            <Box display="flex" flexDir="column">
              <Button
                size="lg"
                onClick={handleTemperatureIncrease}
                isDisabled={hvacAction === "off"}
                borderRadius="0px 10px 0px 0px"
                padding="0px 20px"
              >
                <TiArrowSortedUp />
              </Button>
              {/* <Divider /> */}
              <Button
                size="lg"
                onClick={handleThermostatToggle}
                borderRadius="0px 0px 0px 0px"
                padding="0px 20px"
              >
                <AiOutlinePoweroff />
                {/* <BsSnow /> */}
              </Button>
              {/* <Divider /> */}
              <Button
                size="lg"
                onClick={handleTemperatureDecrease}
                isDisabled={hvacAction === "off"}
                borderRadius="0px 0px 10px 0px"
                padding="0px 20px"
              >
                <TiArrowSortedDown />
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Glass.Card>
  );
};

export default Thermostat;
