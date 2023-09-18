import axios from "axios";
import { decodeJSON } from "../utils";

const token = import.meta.env.VITE_HOMEASSISTANT_TOKEN;

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const fetchEntities = async () => {
  const response = await axios.get(
    "http://homeassistant.local:8123/api/states",
    config
  );
  return response;
};

export const fetchAPIStatus = async () => {
  const response = await axios.get(
    "http://homeassistant.local:8123/api/",
    config
  );
  return response?.data;
};

export const fetchConfig = async () => {
  const response = await axios.get(
    "http://homeassistant.local:8123/api/config",
    config
  );
  return response?.data;
};

export const postStateChange = async (service: string, entityId: string) => {
  await axios({
    method: "post",
    url: `http://homeassistant.local:8123/api/services/light/${service}`,
    headers: config.headers,
    data: { entity_id: entityId },
  });
};

export const subscribeToChange = (
  socket: any,
  id: string,
  setState: (state: any) => void
) => {
  socket.addEventListener("message", (e: any) => {
    const data = decodeJSON(e.data);

    if (id === data?.event?.data?.entity_id) {
      setState(data?.event?.data?.new_state);
    }
  });
};

export const postService = async ({domain, service, entityId, body}: {domain: string, service: string, entityId: string, body?: object}) => {
  await axios({
    method: "post",
    url: `http://homeassistant.local:8123/api/services/${domain}/${service}`,
    headers: config.headers,
    data: { entity_id: entityId, ...body },
  });
};

export const getImage = async ({url}: {url: string}) => {
  return await axios({
    method: "get",
    url: `http://homeassistant.local:8123${url}`,
    headers: config.headers,
  })
}


