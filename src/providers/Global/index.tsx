import React from "react";
import { fetchConfig, fetchEntities } from "../../api/homeassistant";
// import mockEntities from "../../../mock.json";
import { Detector } from "react-detect-offline";
import { getEntity } from "../../utils";

const GlobalContext = React.createContext<{
  entities: any[];
  config: any;
  isOnline: boolean;
  theme: "Space" | "Nature";
}>({
  entities: [],
  config: null,
  isOnline: true,
  theme: "Space",
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
  const [theme, setTheme] = React.useState("Space");

  React.useEffect(() => {
    const getEntities = async () => {
      const entities = await fetchEntities();
      setEntities(entities?.data);
      const haTheme = getEntity(entities?.data, "input_select.glassuitheme");
      setTheme(haTheme?.state);
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
            entities,
            config,
            // @ts-ignore
            theme,
            isOnline: online,
          }}
        >
          {entities && children}
        </GlobalContext.Provider>
      )}
    />
  );
};
