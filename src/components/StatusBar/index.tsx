import styled from "styled-components";
import StatusIndicator from "../StatusIndicator";
import React from "react";
import { fetchAPIStatus } from "../../api/homeassistant";
import { useGlobalState } from "../../providers/Global";

const Style = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  font-size: 12px;
  font-weight: bold;
  font-family: 'Sofia Sans', sans-serif
`;

const StatusBar = () => {
  const {config} = useGlobalState();
  const [isAPIActive, setIsAPIActive] = React.useState(false);

  React.useLayoutEffect(() => {
    const getAPIStatus = async () => {
      const response = await fetchAPIStatus();
      setIsAPIActive(response.message === "API running." ? true : false)
    }
    getAPIStatus();
  }, []);

  return (
    <Style>
      <StatusIndicator isActive={isAPIActive}></StatusIndicator> API
      <StatusIndicator isActive={config?.state === "RUNNING"} /> Home Assistant | v{config.version}
      <StatusIndicator isActive={config?.state === "RUNNING"} /> GlassUI | v1.1.3
      {/* <StatusIndicator isActive /> Hue
      <StatusIndicator isActive /> Lutron
      <StatusIndicator isActive /> Unraid */}
    </Style>
  );
};

export default StatusBar;
