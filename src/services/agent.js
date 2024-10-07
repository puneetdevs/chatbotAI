import { VITE_APP_AGENT_API } from "../utils/constants";
import api from "./api";
const getModels = () => {
  return api.get(VITE_APP_AGENT_API + "/llm_models");
};
const getVoices = () => {
  return api.get(VITE_APP_AGENT_API + "/voices");
};
const getTranscriberData=()=>{
   return api.get(VITE_APP_AGENT_API+"/transcriber");
};

export { getModels, getVoices ,getTranscriberData};
