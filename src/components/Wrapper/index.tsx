import React from "react";

import styled from "styled-components";
import Jasper from "../../assets/jasper.jpeg";
import LakeLouise from "../../assets/lakeLouise.jpeg";
import MadieraSouth from "../../assets/madeiraSouth.jpeg";
import MadeiraTop from "../../assets/madeiraTop.jpeg";
import MadeiraWest from "../../assets/madeiraWest.jpeg";
// import Chipmunk from "../../assets/chipmunk.jpeg";
import Florida from "../../assets/florida.jpeg";
import Glacier from "../../assets/glacier.jpeg";
import Glacier2 from "../../assets/glacier2.jpeg";
import Jasper2 from "../../assets/jasper2.jpeg";
import LakeLouise2 from "../../assets/lakeLouise2.jpeg";
// import Ram from "../../assets/ram.jpeg";

const backgrounds = [
  Jasper,
  LakeLouise,
  MadeiraWest,
  MadieraSouth,
  MadeiraTop,
  // Chipmunk,
  Florida,
  Glacier,
  Glacier2,
  Jasper2,
  LakeLouise2,
  // Ram,
];

const Style = styled.div<{ background: string; minHeight: string }>`
  min-height: ${({ minHeight }) => minHeight};
  min-width: 100vw;
  background-image: ${({ background }) => `url(${background})`};
  backdrop-filter: blur(25px);
  display: flex;
  flex-direction: column;
  background-size: cover;
  width: 100%;
  height: 100%;
  transition: background-image 30s ease-in-out;
`;

const getRandomBackground = () => {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [background, setBackground] = React.useState(getRandomBackground());

  React.useLayoutEffect(() => {
    setTimeout(() => {
      setBackground(getRandomBackground());
    }, 3600000);
  }, [background]);

  return (
    <Style minHeight="calc(100vh - 30px)" background={background}>
      {children}
    </Style>
  );
};

export default Wrapper;
