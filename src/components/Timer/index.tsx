import React from "react";
import { useGlobalState } from "../../providers/Global";
import { useSocketProvider } from "../../providers/Socket";
import { decodeJSON, getEntity } from "../../utils";
import Glass from "../../common/GlassCard";

export const Timer = ({
  entityId,
  title,
}: {
  entityId: string;
  title: string;
}) => {
  const { entities } = useGlobalState();
  const socket = useSocketProvider();

  const timerEntity = getEntity(entities, entityId);

  const [timer, setTimer] = React.useState(timerEntity);

  socket.addEventListener("message", (e: any) => {
    const data = decodeJSON(e.data);

    if (entityId === data?.event?.data?.entity_id) {
      setTimer(data?.event?.data?.new_state);
    }
  });

  console.log({ timer });

  const finishesAt = () => {
    let finishTime;
    try {
      finishTime = new Date(timer?.attributes?.finishes_at).toLocaleTimeString(
        "en",
        {
          hour: "2-digit", // Display hours in two digits (e.g., "01", "02", ..., "12")
          minute: "2-digit", // Display minutes in two digits (e.g., "00", "01", ..., "59")
          hour12: true,
        }
      );
      return finishTime;
    } catch (error) {
      return "N/A";
    }
  };

  if (timer?.state === "idle") {
    return null;
  }

  return (
    <Glass.Card>
      <Glass.CardHeader>{title} Finish</Glass.CardHeader>
      <Glass.CardMetric fontSize="24px" style={{ lineHeight: "20px" }}>
        {finishesAt()}
      </Glass.CardMetric>
    </Glass.Card>
  );
};
