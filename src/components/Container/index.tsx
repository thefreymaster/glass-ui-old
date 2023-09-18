import { Box } from "@chakra-ui/react";
import styled from "styled-components";

const Container = styled(Box)`
  min-height: ${({minHeight}) => minHeight};
  display: flex;
  align-items: ${({alignItems}) => alignItems ?? 'flex-start'};
  justify-content: ${({justifyContent}) => justifyContent ?? 'flex-start'};
  flex-direction: ${({flexDirection}) => flexDirection ?? 'row'};
  min-width: ${({minWidth}) => minWidth};
  padding: ${({padding}) => padding};
  margin: ${({margin}) => margin};
  flex-wrap: ${({flexWrap}) => flexWrap};
  flex:  ${({flex}) => flex};
  overflow-x:  ${({overflow}) => overflow};
  scroll-behavior: smooth;
  gap: 10px;
`;

export default Container;
