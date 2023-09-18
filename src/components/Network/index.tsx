// import React from "react";
import { Box, useTheme } from "@chakra-ui/react";
import Glass from "../../common/GlassCard";
// import { useDisclosure } from "@chakra-ui/react";
import { useGlobalState } from "../../providers/Global";
import React from "react";
import { formatTime } from "../../utils/time";

// update.u6_iw_third_floor

// const entityIds = [
//   "update.u6_kitchen",
//   "update.u6_iw_third_floor",
//   "update.uisp_plug",
//   "update.usw_flex_mini",
//   "update.udm_se",
// ];

// const NetworkCore = () => {
//     return <>Network Core</>
// }

export const Network = () => {
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  const [since, setSince] = React.useState<any>();
  const { isOnline } = useGlobalState();
  const theme = useTheme();

  React.useEffect(() => {
    if (!isOnline) {
      setSince(formatTime({ currentTime: new Date(), includeAMPM: true }));
    }

    // return () => {
    //   setSince(null);
    // };
  }, [isOnline]);

  return (
    <>
      {/* <Glass.CardModal isOpen={isOpen} onClose={onClose}>
        <NetworkCore />
      </Glass.CardModal> */}
      <Glass.Card backgroundColor={isOnline ? "" : theme.colors.red["900"]}>
        <Glass.CardHeader>Network</Glass.CardHeader>
        <Glass.CardMetric fontSize="24px" style={{ lineHeight: "20px" }}>
          {isOnline ? (
            <Box color="green.400">Online</Box>
          ) : (
            <Box color="red.500">Offline since {since}</Box>
          )}
        </Glass.CardMetric>
      </Glass.Card>
    </>
  );
};
