import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Offline } from "react-detect-offline";

export const OfflineBanner = () => {
  return (
    <Offline>
      <Alert status="error" variant='solid' position="absolute" zIndex="1">
        <AlertIcon />
        <AlertTitle>Network outage!</AlertTitle>
        <AlertDescription>
            GlassUI cannot connect to the internet.  Please check your connection.
        </AlertDescription>
      </Alert>
    </Offline>
  );
};
