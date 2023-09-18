import React from "react";
import { fetchConfig, fetchEntities } from "../../api/homeassistant";
// import mockEntities from "../../../mock.json";
import { Detector } from "react-detect-offline";

const GlobalContext = React.createContext<{ entities: any[]; config: any, isOnline: boolean }>({
  entities: [],
  config: null,
  isOnline: true,
});

export const useGlobalState = () => React.useContext(GlobalContext);

export const GlobalStateProvider = ({
  children,
}: {
  children: React.ReactNode;
  value?: any;
}) => {
  const [entities, setEntities] = React.useState();
  const [config, setConfig] = React.useState();

  React.useEffect(() => {
    const getEntities = async () => {
      const entities = await fetchEntities();
      setEntities(entities.data);
    };

    const getConfig = async () => {
      const config = await fetchConfig();
      setConfig(config);
    };
    getEntities();
    getConfig();
  }, []);

  return (
    <Detector
      render={({ online }) => (
        <GlobalContext.Provider
          value={{
            // @ts-ignore
            // entities: mockEntities,
            entities,
            config,
            isOnline: online,
          }}
        >
          {entities && children}
        </GlobalContext.Provider>
      )}
    />
  );
};
