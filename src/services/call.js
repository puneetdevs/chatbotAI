import { VITE_APP_TWILLIO_AGENT_CALL, VITE_APP_PLIVO_AGENT_CALL } from "../utils/constants";
import api from "./api";

const endpoints = {
  twilio: `${VITE_APP_TWILLIO_AGENT_CALL}/call`,
  plivo: `${VITE_APP_PLIVO_AGENT_CALL}/call`,
};

const callAgent = async (payload, callMode) => {
  try {
    const endpoint = endpoints[callMode] || endpoints.twilio;
    const res = await api.post(endpoint, payload);
    return res;
  } catch (error) {
    throw error;
  }
};

export default callAgent;
