// @ts-nocheck
export const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const DOCUMENT_TYPE = {
  single: "single",
  multiple: "multiple",
  sharebot: "sharebot",
};
export const VITE_APP_AGENT_API =   import.meta.env.VITE_APP_AGENT_API;
export const VITE_APP_CALL_API =   import.meta.env.VITE_APP_CALL_API;
export const VITE_APP_TWILLIO_AGENT_CALL = import.meta.env.VITE_APP_TWILLIO_AGENT_CALL;
export const VITE_APP_PLIVO_AGENT_CALL = import.meta.env.VITE_APP_PLIVO_AGENT_CALL;
export const VITE_APP_BATCH_UPLOAD = import.meta.env.VITE_APP_BATCH_UPLOAD;
export const VITE_CALL_LOG_API = import.meta.env.VITE_CALL_LOG_API;
export const REGION = "XXXXXXXXXXXXXX",
  AWS_ACCESS_KEY = "XXXXXXXXXXXXXX",
  AWS_SECRET_KEY = "XXXXXXXXXXXXXX",
  AWS_BUCKET = "XXXXXXXXXXXXXX",
  S3Path = `https://${AWS_BUCKET}.s3.${REGION}.amazonaws.com/`;

export const CHAT_TYPES = {
  CHATGPT: "CHATGPT",
  SINGLE: "SINGLE",
  MULTIPLE: "MULTIPLE",
};

export const CHATGPT_TYPES = {
  GPT3: "gpt-3.5-turbo",
  GPT4: "gpt-4",
}
export const STRIPE_TABLE_ID = import.meta.env.VITE_STRIPE_TABLE_ID;
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const getURL = (key) => S3Path + key;