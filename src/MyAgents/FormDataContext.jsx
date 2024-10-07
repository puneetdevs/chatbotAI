import React from "react";
import { createContext, useState, useContext } from "react";
const FormDataContext = createContext();
export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    agent_config: {
      agent_name: "",
      agent_type: "Other",
      agent_welcome_message: "",
      tasks: [],
    },
    agent_prompts: {
      task_1: {
        system_prompt: "",
      },
    },
    AdvancedSettingData: {
      language: "en",
      voice: "aura-luna-en",
      modelName: "deepgram",
      model: "gpt-3.5-turbo-1106",
      max_tokens: "100",
      buffer_size: "100",
      transcriber_model: "nova-2",
      transcriber_provider: "deepgram",
      transcriber_sampling_rate: "16000",
      transcriber_encoding: "linear16",
      streaming_model: "deepgram",
      tts_provider: "deepgram",
      tts_voice_model: "Neural",
      tts_voice_engine: "neural",
      tts_voice_name: "Sonia",
      tts_voice_languageCode: "en-GB",
      temperature: "4",
      stream: true,
      endpointing: "400",
      keywords: "",
      linearDelay: "100",
      interruptWords: "3",
      hangupSeconds: "10",
      hangUpLogic: "Via Prompt",
      provider: "openai",
      ambient_noise: false,
      ambient_noise_track: "",
      call_terminate: 240,
      call_cancellation_prompt: null,
      call_mode_provider: "twilio",
    },
  });
  return (
    <>
      <FormDataContext.Provider value={{ formData, setFormData }}>
        {children}
      </FormDataContext.Provider>
    </>
  );
};

export const useFormData = () => useContext(FormDataContext);
