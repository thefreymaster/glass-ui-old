import Glass from "../GlassCard";
import { useGlobalState } from "../../providers/Global";
import { calculateAverage, decodeJSON, getEntity } from "../../utils";
import { useSocketProvider } from "../../providers/Socket";
import React from "react";

const GenericEntityCard = ({entityId, name}: {entityId: string, name: string}) => {

  const { entities } = useGlobalState();
  const entityOnce = getEntity(entities, entityId);
  const [entity, setEntity] = React.useState(entityOnce);

  const socket = useSocketProvider();


  socket.addEventListener("message", (e: any) => {
    const data = decodeJSON(e.data);

    if (entityId === data?.event?.data?.entity_id) {
      setEntity(data?.event?.data?.new_state);
    }
  });

  return (
    <Glass.Card>
      <Glass.CardHeader>{name}</Glass.CardHeader>
      <Glass.CardMetric>{entity.state}°</Glass.CardMetric>
    </Glass.Card>
  );
};

export default GenericEntityCard;
