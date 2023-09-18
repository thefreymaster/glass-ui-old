import React from "react";
import { encodeJSON } from "../../utils";

const SocketContext = React.createContext<any>({});

export const useSocketProvider = () => React.useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = new WebSocket(`ws://${import.meta.env.VITE_HOMEASSISTANT_IP}/api/websocket`);

  socket.addEventListener("open", async () => {
    await socket.send(
      encodeJSON({
        type: "auth",
        access_token: import.meta.env.VITE_HOMEASSISTANT_TOKEN,
      })
    );

    await socket.send(
      encodeJSON({
        id: 1,
        type: "subscribe_events",
      })
    );

    await socket.send(
      encodeJSON({
        id: 19,
        type: "get_states",
      })
    );
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
