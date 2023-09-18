import React from "react";
import Glass from "../../common/GlassCard";
import { useGlobalState } from "../../providers/Global";
import { useSocketProvider } from "../../providers/Socket";
import { calculateAverage, decodeJSON, getEntities } from "../../utils";

const ids = [
  "sensor.living_room_sensor_humidity",
  "sensor.basement_motion_sensor_humidity",
  "sensor.kitchen_motion_sensor_humidity",
  "sensor.theater_humidity",
  "sensor.workshop_humidity",
  "sensor.bedroom_humidity",
];

const AverageHumidity = () => {
  const { entities } = useGlobalState();
  const socket = useSocketProvider();

  const humidityEntities = getEntities(entities, ids);

  const [humidity, setHumidity] = React.useState(
    calculateAverage(humidityEntities)
  );

  socket.addEventListener("message", (e: any) => {
    const data = decodeJSON(e.data);

    if (ids.includes(data?.event?.data?.entity_id)) {
      const newEntries = [...humidityEntities, ...data?.event?.data?.new_state];
      setHumidity(calculateAverage(newEntries));
    }
  });

  return (
    <Glass.Card>
      <Glass.CardHeader>Average Humidity</Glass.CardHeader>
      <Glass.CardMetric>{humidity}%</Glass.CardMetric>
    </Glass.Card>
  );
};

export default AverageHumidity;
