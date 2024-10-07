import api from "./api";
import { API_URL } from "../utils/constants";

export const fetchSingle = () =>
  api(API_URL + "/document/single/").then((res) => res.data);
export const fetchMulti = (id) =>
  api(API_URL + `/document/multiple/${id}`).then((res) => res);
export const fetchSharedBot = () =>
  api(API_URL + "/document/sharebot/").then((res) => res.data);

export const deleteSavedShareBot = (id) =>
  api.delete(`${API_URL}/document/${id}/share/`).then((res) => res.data);

export const createShareBot = (documentId) =>
  api.get(`${API_URL}/document/${documentId}/share/`).then((res) => res.data);

export const createDocument = (body) =>
  api.post(`${API_URL}/document/`, body).then((res) => res.data);

export const getDocumentById = (documentId) => { 
  return api.get(`${API_URL}/document/${documentId}`).then((res) => res.data);
};

export const deleteDocumentById = (documentId) =>
  api.delete(`${API_URL}/document/${documentId}`).then((res) => res.data);

export const createWorkspace = (body) =>
  api.post(`${API_URL}/workspaces`, body).then((res) => res);

export const fetchWorkSpace = () =>
  api.get(`${API_URL}/workspaces`).then((res) => res.data);

export const deleteWorkspace = (id) =>
  api.delete(`${API_URL}/workspaces/${id}`).then((res) => res);

export const createWebsite = (body) =>
  api.post(`https://mybotdevapi.customerdemourl.com/crawl`, body).then((res) => res);
