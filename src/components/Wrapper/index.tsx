import React from "react";

import styled from "styled-components";
import Jasper from "../../assets/nature/jasper.jpeg";
import LakeLouise from "../../assets/nature/lakeLouise.jpeg";
import MadieraSouth from "../../assets/nature/madeiraSouth.jpeg";
import MadeiraTop from "../../assets/nature/madeiraTop.jpeg";
import MadeiraWest from "../../assets/nature/madeiraWest.jpeg";
import Florida from "../../assets/nature/florida.jpeg";
import Glacier from "../../assets/nature/glacier.jpeg";
import Glacier2 from "../../assets/nature/glacier2.jpeg";
import Jasper2 from "../../assets/nature/jasper2.jpeg";
import LakeLouise2 from "../../assets/nature/lakeLouise2.jpeg";

import Space1 from "../../assets/space/space1.jpeg";
import Space2 from "../../assets/space/space2.jpeg";
import Space3 from "../../assets/space/space3.jpeg";
import Space4 from "../../assets/space/space4.jpeg";
import Space5 from "../../assets/space/space5.jpeg";
import { useGlobalState } from "../../providers/Global";

const backgroundsNature = [
  Jasper,
  LakeLouise,
  MadeiraWest,
  MadieraSouth,
  MadeiraTop,
  Florida,
  Glacier,
  Glacier2,
  Jasper2,
  LakeLouise2,
];

const backgroundsSpace = [
  Space1,
  Space2,
  Space3,
  Space4,
  Space5,
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

const getRandomBackground = ({theme}: {theme: "Space" | "Nature"}) => {
  if(theme === "Space"){
    return backgroundsSpace[Math.floor(Math.random() * backgroundsSpace.length)];
  }
  return backgroundsNature[Math.floor(Math.random() * backgroundsSpace.length)];
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useGlobalState();

  const [background, setBackground] = React.useState(getRandomBackground({theme}));

  React.useLayoutEffect(() => {
    setTimeout(() => {
      setBackground(getRandomBackground({theme}));
    }, 3600000);
  }, [background]);

  return (
    <Style minHeight="calc(100vh - 30px)" background={background}>
      {children}
    </Style>
  );
};

export default Wrapper;
