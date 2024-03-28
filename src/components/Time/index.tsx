import React from "react";
import Glass from "../../common/GlassCard";
import { useDisclosure } from "@chakra-ui/react";
import { isDesktop, isTablet } from "react-device-detect";

const TimeCore = ({
  includeSeconds,
  variant,
}: {
  includeSeconds?: boolean;
  variant: "modal" | "page";
}) => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useLayoutEffect(() => {
    setTimeout(() => {
      setCurrentTime(new Date());
    }, 1000);
  }, [currentTime]);

  const options = includeSeconds
    ? {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }
    : {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

  const currentTimeFormatted = includeSeconds
    ? // @ts-ignore
      currentTime.toLocaleTimeString("en", options)
    : // @ts-ignore
      currentTime.toLocaleTimeString("en", options).replace(/AM|PM/, "");

  return (
    <Glass.CardMetric
      fontSize={
        variant === "modal" && (isDesktop || isTablet) ? "140px" : "100px"
      }
      color="white"
      style={{
        lineHeight: "100px",
      }}
      justifyContent="center"
    >
      {currentTimeFormatted}
      {/* <AnimatedNumbers
        includeComma
        animateToNumber={3}
      /> */}
    </Glass.CardMetric>
  );
};

const Time = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Glass.CardModal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        bodyJustifyContent="center"
      >
        <TimeCore variant="modal" includeSeconds />
      </Glass.CardModal>
      <Glass.Card flex={0} onClick={onOpen}>
        <TimeCore variant="page" />
      </Glass.Card>
    </>
  );
};

export default Time;
