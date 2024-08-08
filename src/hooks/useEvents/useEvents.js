import { useEffect } from "react";
import { storageBase } from "./storage";

const useEvents = (
  isRegistered = { entry: false, data: false, found: false, notFound: false }
) => {
  useEffect(() => {
    alt.on("event", (event, ...data) => {
      isRegistered.entry && console.log("[F] Entry event", event);
      isRegistered.data && console.log("[F] Entry data", JSON.stringify(data));

      if (storageBase[event] !== undefined) {
        isRegistered.found && console.log("[F] Event found! IN STORAGE", event);
        storageBase[event](...data);
      } else {
        isRegistered.notFound &&
          console.log("[F] Event not found! IN STORAGE", event);
      }
    });

    // eslint-disable-next-line
  }, []);

  return null;
};

export default useEvents;
