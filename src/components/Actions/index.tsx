import { Box, Center, Divider } from "@chakra-ui/react";
import { useGlobalState } from "../../providers/Global";
import { getEntity } from "../../utils";
import LightButton from "../LightButton";
import { lightsCollection } from "../../constants/lights";
import { FanButton } from "./FanButton";
import { Reload } from "./Reload";

const Actions = () => {
  const { entities } = useGlobalState();

  return (
    <Box
      marginLeft="10px"
      display="flex"
      flexDir="row"
      gap="10px"
      alignItems="flex-start"
      justifyContent="flex-start"
      overflowY="hidden"
    >
      <FanButton />
      {lightsCollection.map((light) => {
        const entity = getEntity(entities, light.id);

        return (
          <LightButton id={light.id} isOn={entity.state}>
            {light?.altName ?? entity.attributes.friendly_name}
          </LightButton>
        );
      })}
      <Center height="100px">
        <Divider orientation="vertical" />
      </Center>
      <Reload />
    </Box>
  );
};

export default Actions;
