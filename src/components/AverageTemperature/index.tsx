import Glass from "../../common/GlassCard";
import { useGlobalState } from "../../providers/Global";
import { calculateAverage, getEntities } from "../../utils";

const ids = [
  "sensor.living_room_sensor_temperature",
  "sensor.basement_motion_sensor_temperature",
  "sensor.kitchen_motion_sensor_temperature",
  "sensor.theater_temperature",
  "sensor.workshop_temperature",
  "sensor.bedroom_temperature",
];

const AverageTemperature = () => {
  const { entities } = useGlobalState();

  const temperatureEntities = getEntities(entities, ids);

  const averageTemperature = calculateAverage(temperatureEntities);

  return (
    <Glass.Card>
      <Glass.CardHeader>Average Temperature</Glass.CardHeader>
      <Glass.CardMetric>{averageTemperature}°</Glass.CardMetric>
    </Glass.Card>
  );
};

export default AverageTemperature;
