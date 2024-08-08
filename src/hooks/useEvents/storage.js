export let storageBase = {};
const maizen = {
  on: (event, handler, isRegistered) => {
    isRegistered && console.log("STORAGE EVENT", event);
    isRegistered && console.log("STORAGE HANDLER", String(handler));
    storageBase = { ...storageBase, [event]: handler };
  },
};

export default maizen;
