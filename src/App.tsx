import "./App.css";
import Actions from "./components/Actions";
import Container from "./components/Container";
import StatusBar from "./components/StatusBar";
import Wrapper from "./components/Wrapper";
import Weather from "./components/Weather";
import Time from "./components/Time";
import AverageTemperature from "./components/AverageTemperature";
import AverageHumidity from "./components/AverageHumidity";
import Thermostat, { TempInformation } from "./components/Thermostat";
import DateStamp from "./components/Date";
import PrusaMini from "./components/PrusaMini";
import { getDevice } from "./utils";
import { Camera } from "./components/Camera";
import { Timer } from "./components/Timer";
import { isDesktop, isTablet } from "react-device-detect";
import { Network } from "./components/Network";
import { OfflineBanner } from "./components/OfflineBanner";
import React from "react";
import GenericEntityCard from "./common/GenericEntityCard";

function App() {

  React.useEffect(() => {
    setTimeout(() => {
      window.location.reload();
    }, 3600000);
  }, []);

  return (
    <>
      <Wrapper>
        <OfflineBanner />
        <Container
          flexDirection={isDesktop || isTablet ? "row" : "column"}
          padding="10px"
          // height={isMobile ? "auto" : "calc(100vh - 140px)"}
          height={getDevice({
            desktop: "calc(100vh - 140px)",
            tablet: "calc(100vh - 140px)",
            mobile: "auto",
          })}
        >
          <Container
            minWidth={getDevice({
              desktop: "auto",
              tablet: "auto",
              mobile: "100%",
            })}
            flex={getDevice({ desktop: "1.5", tablet: "2", mobile: "1" })}
            flexDirection="column"
            minHeight="100%"
          >
            <Time />
            <DateStamp />
            {(isTablet || isDesktop) && <Weather />}
          </Container>
          <Container flex="2" flexWrap="wrap" flexDirection="column">
            <Container flex="0" flexWrap="wrap" minWidth="100%">
              <AverageTemperature />
              <AverageHumidity />
            </Container>
            {(isTablet || isDesktop) && (
              <Container
                flex="0"
                flexWrap="wrap"
                flexDirection="row"
                minWidth="calc(100%)"
              >
                <Camera />
              </Container>
            )}
          </Container>
          <Container
            minWidth={getDevice({
              desktop: "auto",
              tablet: "auto",
              mobile: "100%",
            })}
            flex="1"
            flexDirection="column"
            height="auto"
          >
            <GenericEntityCard
              entityId="sensor.basement_motion_sensor_temperature"
              name="Basement"
            />
            <Thermostat
              thermostatId="climate.first_floor_thermostat"
              name="First"
            />
            <Thermostat
              thermostatId="climate.second_floor_thermostat"
              name="Second"
            />
            <Thermostat
              thermostatId="climate.third_floor_thermostat"
              name="Third"
            />
            <PrusaMini />
            <Timer entityId="timer.washertimer" title="Washer" />
            <Timer entityId="timer.driertimer" title="Drier" />
            <Network />
            {!isDesktop && !isTablet && <Camera />}
          </Container>
        </Container>
        <Container
          overflow="scroll"
          height="100px"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Actions />
        </Container>
      </Wrapper>
      <StatusBar />
    </>
  );
}

export default App;
