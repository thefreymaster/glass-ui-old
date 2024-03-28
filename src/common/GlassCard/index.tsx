import styled from "styled-components";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";

interface GlassCardProps {
  height?: string;
  width?: string;
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  flexDirection?: string;
  padding?: string;
  onClick?: () => void;
  flex?: number;
  backgroundColor?: string;
}

const Card = styled.div<GlassCardProps>`
  padding: ${({ padding }) => padding ?? "10px"};
  border-radius: 10px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
  height: ${({ height }) => height};
  width: ${({ width }) => width ?? "100%"};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  display: ${({ display }) => display};
  flex: ${({ flex }) => flex ?? 2};
  flex-direction: ${({ flexDirection }) => flexDirection};
  min-height: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor ?? "#0000002e"};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: background-color 500ms ease-in-out;

  &:hover {
    cursor: ${({ onClick }) => (onClick ? "pointer" : "auto")};
  }
`;

const CardHeader = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => {
  return (
    <Text
      fontSize="12px"
      fontWeight="medium"
      fontFamily="'Sofia Sans',sans-serif"
      color="white"
      {...style}
    >
      {children}
    </Text>
  );
};

const CardFooter = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => {
  return (
    <Text
      fontSize="12px"
      fontWeight="black"
      fontFamily="'Sofia Sans',sans-serif"
      color="white"
      {...style}
    >
      {children}
    </Text>
  );
};

const CardMetric = ({
  children,
  fontSize,
  color,
  style,
  justifyContent,
}: {
  children: React.ReactNode;
  fontSize?: string;
  color?: string;
  style?: any;
  justifyContent?: string;
}) => {
  return (
    <Text
      fontSize={fontSize ?? "54px"}
      fontWeight="black"
      fontFamily="'Sofia Sans',sans-serif"
      color={color ?? "whiteAlpha.800"}
      lineHeight="60px"
      transition="opacity 500ms ease-in-out, border-color 500ms ease-in-out"
      display="flex"
      justifyContent={justifyContent}
      alignItems="center"
      {...style}
    >
      {children}
    </Text>
  );
};

export const CardModal = ({
  isOpen,
  onClose,
  children,
  size,
  bodyJustifyContent,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: string;
  bodyJustifyContent?: string;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size ?? "full"}>
      <ModalOverlay />
      <ModalContent backgroundColor="#0000002b" backdropFilter="blur(20px)">
        <ModalCloseButton />
        <ModalBody display="flex" flexDir="column" justifyContent={bodyJustifyContent ?? "flex-start"}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Glass = {
  Card,
  CardHeader,
  CardMetric,
  CardFooter,
  CardModal,
};

export default Glass;
