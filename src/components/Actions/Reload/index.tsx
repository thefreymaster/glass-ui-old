import GlassButton from "../../../common/GlassButton";
import { Box } from "@chakra-ui/react";
import { IoRefreshOutline } from "react-icons/io5";

export const Reload = () => {
  const handleRefresh = () => {
    location.reload();
  };

  return (
    <GlassButton onClick={handleRefresh} isOn="on">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingBottom="10px"
      >
        <IoRefreshOutline fontSize="30px" />
      </Box>
      Reload
    </GlassButton>
  );
};
