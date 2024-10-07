import {
  VITE_APP_AGENT_API,
  VITE_APP_BATCH_UPLOAD,
  VITE_CALL_LOG_API,
} from "../utils/constants";
import api from "./api";

const airTable_BaseID = "appR0gxO6wnJ8QExP";
const airTable_TableID = "tblA4AmR48kuz2bno";
const airTable_token = "patouA1FjkKwfmIOJ.8501b592d61c4efc9c0759854c0012781bc65ba51aef5ce9de931e90c3fad532";

const getAllAgents = async () => {
  const response = await api.get(`${VITE_APP_AGENT_API}/agent/all`);
  return response;
};

const getAgentById = async (agentId) => {
  const response = await api.get(
    `${VITE_APP_AGENT_API}/agent/${agentId}/executions`
  );
  return response;
};

const batchUpload = async (formData) => {
  const response = await api.post(`${VITE_APP_BATCH_UPLOAD}/batches`, formData);
  return response;
};

const agentData = async () => {
  const response = await api.get(`${VITE_APP_AGENT_API}/agent/all`);
  return response;
};
const agentDefaultData = async () => {
  const response = await api.get(`${VITE_APP_AGENT_API}/agent/default_all`);
  return response;
};



const createAgent = async (createPayload) => {
  const response = await api.post(`${VITE_APP_AGENT_API}/agent`, createPayload);
  return response;
};

const agentUpdate = async (agentID, updateAgentPayload) => {
  const updateAgentResponse = await api.put(
    `${VITE_APP_AGENT_API}/agent/${agentID}`,
    updateAgentPayload
  );
  return updateAgentResponse;
};

const deleteAgent = async (selectedAgentID) => {
  const deleteAgentResponse = await api.delete(
    `${VITE_APP_AGENT_API}/agent/${selectedAgentID}`
  );
  return deleteAgentResponse;
};




const getAllCallLogs = async () => {
  const response = await api.get(
    `${VITE_CALL_LOG_API}/${airTable_BaseID}/${airTable_TableID}`,
    {
      headers: {
        Authorization: `Bearer ${airTable_token}`,
      },
    }
  );
  return response;
};

const createCallLog = async (postData) => {
  const response = await api.post(
    `${VITE_CALL_LOG_API}/${airTable_BaseID}/${airTable_TableID}`,
    postData,
    {
      headers: {
        Authorization: `Bearer ${airTable_token}`,
      },
    }
  );
  return response;
};


const editCallLogs = async (recordId, updateData) => {
  const response = await api.patch(
    `${VITE_CALL_LOG_API}/${airTable_BaseID}/${airTable_TableID}/${recordId}`,
    updateData,
    {
      headers: {
        Authorization: `Bearer ${airTable_token}`,
      },
    }
  );
  return response;
};


const getCallLog = async (recordId) => {
  const response = await api.get(
    `${VITE_CALL_LOG_API}/${airTable_BaseID}/${airTable_TableID}/${recordId}`,
    {
      headers: {
        Authorization: `Bearer ${airTable_token}`,
      },
    }
  );
  return response;
};
const deleteCallLog = async (recordId) => {
  const response = await api.delete(
    `${VITE_CALL_LOG_API}/${airTable_BaseID}/${airTable_TableID}/${recordId}`,
    {
      headers: {
        Authorization: `Bearer ${airTable_token}`,
      },
    }
  );
  return response;
};


const getBatchesList = async () => {
  const response = await api.get(`${VITE_APP_AGENT_API}/batches/`);
  return response;
}

const getDashBoardData=async ()=>{
  const response =await api.get(`${VITE_APP_AGENT_API}/dashboard`);
  return response;
};

export {
  getBatchesList,
  deleteCallLog,
  getCallLog,
  editCallLogs,
  createCallLog,
  getAllAgents,
  getAgentById,
  batchUpload,
  agentData,
  createAgent,
  agentUpdate,
  deleteAgent,
  agentDefaultData,
  getAllCallLogs,
  getDashBoardData
};
