import Glass from "../../common/GlassCard";
import styled from "styled-components";
import { Box, Text, useColorMode, useDisclosure } from "@chakra-ui/react";
import { useGlobalState } from "../../providers/Global";
import {
  getEntity,
  getDayOfWeek,
  decodeJSON,
  getWeatherCondition,
  getWeatherConditionIcon,
  getDegToCompass,
  getWindFontWeight,
} from "../../utils";
import * as WeatherIcons from "react-icons/wi";
import { useSocketProvider } from "../../providers/Socket";
import React from "react";
import { isDesktop, isTablet } from "react-device-detect";

const getCurrentConditions = (weather: any) => {
  if(weather?.attributes?.forecast){
    return weather?.attributes?.forecast[0];
  }
  return null;
};

const WindDirection = styled(WeatherIcons.WiWindDeg)<{ rotate: number }>`
  transform: rotate(${({ rotate }) => rotate}deg);
  transition: rotate 3s ease-in-out;
  transition-delay: 1s;
`;

const Temperature = styled(Text)`
  font-size: 80px;
  font-family: "Sofia Sans", sans-serif;
  font-weight: 1000;
  display: flex;
  color: white;
  justify-content: center;
  align-items: flex-end;
`;

const WindSpeedMetric = styled(Text)`
  font-size: ${({ fontSize }) => fontSize ?? "80px"};
  font-family: "Sofia Sans", sans-serif;
  display: flex;
  color: white;
  justify-content: center;
  text-align: center;
`;

const WindSpeed = ({
  children,
  metric,
  fontSize,
}: {
  children: React.ReactNode;
  metric: string;
  fontSize?: string;
}) => {
  return (
    <Box display="flex" flexDir="row">
      <WindSpeedMetric fontSize={fontSize}>{children}</WindSpeedMetric>
      <Text marginTop="20px" color="whiteAlpha.800">
        {metric}
      </Text>
    </Box>
  );
};

const Conditions = styled(Text)`
  font-size: ${({ fontSize }) => fontSize ?? "24px"};
  font-family: "Sofia Sans", sans-serif;
  font-weight: ${({ fontWeight }) => fontWeight ?? "500"};
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Wind = ({
  windSpeed,
  windBearing,
  fontSize,
}: {
  windSpeed: string;
  windBearing: number;
  fontSize?: string;
}) => {
  return (
    <Box display="flex" flexDir="row" justifyContent="center">
      <Box
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="center"
        paddingRight="10px"
      >
        <WindSpeedMetric
          fontWeight={getWindFontWeight(Number(windSpeed))}
          fontSize={fontSize}
        >
          {windSpeed}
        </WindSpeedMetric>
        <Text marginLeft="5px" color="whiteAlpha.800">
          mph
        </Text>
      </Box>
      <Box
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="center"
      >
        <Conditions>{getDegToCompass(windBearing)}</Conditions>
        <Conditions>
          <WindDirection rotate={windBearing} />
        </Conditions>
      </Box>
    </Box>
  );
};

const Forecast = ({
  forecast,
}: {
  forecast: {
    condition: string;
    temperature: string;
    templow: string;
    datetime: string;
    wind_speed: string;
    wind_bearing: number;
  };
}) => {
  // @ts-ignore
  const windSpeed = forecast?.wind_speed?.toFixed(0);

  return (
    <Box
      display="flex"
      flexDir="column"
      width="50%"
      textAlign="center"
      marginTop="40px"
      color="white"
    >
      <Box>{getDayOfWeek(forecast?.datetime)}</Box>
      <Box fontSize="20px">{getWeatherCondition(forecast?.condition)}</Box>

      <Conditions fontSize="72px">
        <ForcastIcon weatherState={forecast?.condition} />
      </Conditions>

      <Box fontSize="16px">
        {forecast?.templow}° / {forecast?.temperature}°
      </Box>
      <Wind
        fontSize="24px"
        windSpeed={windSpeed}
        windBearing={forecast?.wind_bearing}
      />
    </Box>
  );
};

//@ts-ignore
const ForcastIcon = ({ weatherState }: { weatherState: string }) => {
  const { colorMode } = useColorMode();

  const iconNameTranslated = getWeatherConditionIcon(weatherState);
  const iconName = `Wi${
    colorMode === "light" ? "Day" : "Night"
    // @ts-ignore
  }${iconNameTranslated}`;
  // @ts-ignore
  const Icon = WeatherIcons?.[iconName] ?? WeatherIcons.WiAlien;

  return <Icon />;
};

const WeatherModal = () => {
  return <WeatherCore variant="modal" />;
};

const WeatherCore = ({ variant }: { variant: "modal" | "page" }) => {
  const { entities } = useGlobalState();
  const socket = useSocketProvider();

  const weatherEntity = getEntity(entities, "weather.forecast_home");
  const conditions = getCurrentConditions(weatherEntity);

  const [weather, setWeather] = React.useState(weatherEntity);

  socket.addEventListener("message", (e: any) => {
    const data = decodeJSON(e.data);

    if ("weather.forecast_home" === data?.event?.data?.entity_id) {
      setWeather(data?.event?.data?.new_state);
    }
  });

  if(!weather){
    return null;
  }

  return (
    <>
      <Box
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="center"
      >
        {variant === "modal" && (
          <>
            <Box flexGrow="1" />
            <Box display="flex" flexDir="column">
              <WindSpeed metric="mph">
                {weather?.attributes?.wind_speed?.toFixed(0)}
              </WindSpeed>
              <Conditions>
                {getDegToCompass(weather?.attributes?.wind_bearing)}
              </Conditions>
              <Conditions>
                <WindDirection rotate={weather?.attributes?.wind_bearing} />
              </Conditions>
            </Box>
          </>
        )}
        <Box flexGrow="1" />
        <Box display="flex" flexDir="column">
          <Temperature>
            {weather?.attributes?.temperature}°
          </Temperature>
          <Conditions>
            {conditions?.templow}° / {conditions?.temperature}°
          </Conditions>
          <Conditions>
            {conditions?.humidity}
            <WeatherIcons.WiHumidity />
          </Conditions>
        </Box>
        <Box flexGrow="1" />
        <Box display="flex" flexDir="column">
          <Conditions fontSize="110px">
            <ForcastIcon weatherState={weather?.state} />
          </Conditions>
          <Conditions>{getWeatherCondition(conditions?.condition)}</Conditions>
        </Box>
        <Box flexGrow="1" />
      </Box>

      <Box display="flex" flexDir="row" paddingBottom="20px">
        <Forecast forecast={weather?.attributes?.forecast?.[1]} />
        <Forecast forecast={weather?.attributes?.forecast?.[2]} />
        {variant === "modal" && (isDesktop || isTablet) && (
          <>
            <Forecast forecast={weather?.attributes?.forecast?.[3]} />
            <Forecast forecast={weather?.attributes?.forecast?.[4]} />
            <Forecast forecast={weather?.attributes?.forecast?.[5]} />
          </>
        )}
      </Box>
    </>
  );
};

const Weather = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Glass.Card onClick={onOpen}>
      <Glass.CardModal isOpen={isOpen} onClose={onClose}>
        <WeatherModal />
      </Glass.CardModal>
      <WeatherCore variant="page" />
    </Glass.Card>
  );
};

export default Weather;
