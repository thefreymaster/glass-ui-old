export const formatTime = ({
  currentTime,
  includeAMPM,
}: {
  currentTime: Date;
  includeAMPM?: boolean;
}) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const currentTimeFormatted = includeAMPM
    ? // @ts-ignore
      currentTime.toLocaleTimeString("en", options)
    : // @ts-ignore
      currentTime.toLocaleTimeString("en", options).replace(/AM|PM/, "");

  return currentTimeFormatted;
};
