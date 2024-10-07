import api from "./api";
import { API_URL } from "../utils/constants";
const CHAT_API_URL = API_URL + "/chatgpt";
const DOCUMENT_API_URL = API_URL + "/document";

export const sendMessage = ({
  conversationId,
  text,
  chatGPTType,
  workspace_Id,
}) =>
  api
    .post(`${CHAT_API_URL}/${conversationId}/conversation/chat/`, {
      text,
      type: 1,
      chatgptType: chatGPTType,
      workspace_Id,
    })
    .then((res) => res.data);

export const createConversation = (text) =>
  api
    .post(`${CHAT_API_URL}/conversation/`, {
      text,
      chatgpt: true,
    })
    .then((res) => res.data);

export const fetchChat = (conversationId) => {
  if (conversationId === null || conversationId === undefined) {
    // Return an empty array when conversation_id is null or undefined
    return Promise.resolve([]);
  }
  return api
    .get(`${CHAT_API_URL}/${conversationId}/conversation/chat/`)
    .then((res) => res.data);
};

export const fetchConversations = () =>
  api.get(`${CHAT_API_URL}/conversation/`).then((res) => res.data);

export const deleteConversation = (conversationId) =>
  api
    .delete(`${CHAT_API_URL}/${conversationId}/conversation/`)
    .then((res) => res.data);

export const sendDocumentBotMessage = ({ documentId, text }) =>
  api
    .post(`${DOCUMENT_API_URL}/${documentId}/sharechat/`, { text })
    .then((res) => res.data?.data);

//--------------------------------------Document conversation

export const createDocumentConversation = (documentId, text) =>
  api
    .post(`${DOCUMENT_API_URL}/${documentId}/conversation/`, {
      text,
      chatgpt: true,
    })
    .then((res) => res.data);

export const sendDocumentMessage = (documentId, conversationId, text) =>
  api
    .post(
      `${DOCUMENT_API_URL}/${documentId}/conversation/${conversationId}/chat/`,
      { text, type: 1 }
    )
    .then((res) => res.data);

export const fetchDocumentChat = ({ documentId, conversationId }) => {
  if (!documentId || !conversationId) {
    return Promise.resolve([]);
  }
  return api
    .get(`${DOCUMENT_API_URL}/${documentId}/conversation/${conversationId}/`)
    .then((res) => res.data);
};

export const fetchDocumentConversations = (documentId) =>
  api
    .get(`${DOCUMENT_API_URL}/${documentId}/conversation`)
    .then((res) => res.data);

export const deleteDocumentConversation = ({ documentId, conversationId }) =>
  api
    .delete(`${DOCUMENT_API_URL}/${documentId}/conversation/${conversationId}/`)
    .then((res) => res.data);
