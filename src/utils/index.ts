import { days } from "../constants/daysOfWeek";
import {
  possibleWeatherConditions,
  possibleWeatherConditionsIcons,
} from "../constants/weather";
import { isDesktop, isTablet } from "react-device-detect";

export const getEntity = (collection: any[], id: string) =>
  collection.find((item) => item.entity_id === id);

export const getEntities = (collection: any[], ids: string[]) =>
  collection.filter((item) => ids.includes(item.entity_id));

export const capitalizeFirstLetter = (string: string) => {
  try {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  } catch (error) {
    return string;
  }
};

export const getDayOfWeek = (date: string) => {
  return days[new Date(date).getDay()];
};

export const calculateAverage = (collection: any[]) => {
  const addedCollection = collection.reduce((previousValue, currentValue) => {
    if (currentValue?.state === "unavailable") {
      return previousValue;
    }
    previousValue = previousValue + Number(currentValue?.state);
    return previousValue;
  }, 0);
  const collectionAvailable = collection.filter(
    (item) => item?.state !== "unavailable"
  );

  return (addedCollection / collectionAvailable.length)?.toFixed(0);
};

export const decodeJSON = (data: string) => {
  return JSON.parse(data);
};

export const encodeJSON = (data: object) => {
  return JSON.stringify(data);
};

export const getWeatherCondition = (condition: string) => {
  // @ts-ignore
  return possibleWeatherConditions?.[condition];
};

export const getWeatherConditionIcon = (condition: string) => {
  // @ts-ignore
  return possibleWeatherConditionsIcons?.[condition];
};

export const getDevice = ({
  desktop,
  tablet,
  mobile,
}: {
  desktop: string;
  tablet: string;
  mobile: string;
}) => {
  if (isDesktop) {
    return desktop;
  }
  if (isTablet) {
    return tablet;
  }
  return mobile;
};

export const getDegToCompass = (num: number) => {
  var val = Math.floor(num / 22.5 + 0.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

export const getWindFontWeight = (wind: number) => {
  if (wind > 20) {
    return 900;
  }
  if (wind < 20 && wind > 10) {
    return 500;
  }
  return 300;
};
