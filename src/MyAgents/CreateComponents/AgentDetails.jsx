import React, { useEffect, useState } from "react";
import { useFormData } from "../FormDataContext";
import { useParams } from "react-router-dom";
import { VITE_APP_AGENT_API } from "../../utils/constants";
import { useAuth } from "@clerk/clerk-react";
import api from "../../services/api";
import UploadLoader from "../../Routes/UploadLoader";

const AgentDetails = ({ mode, updatedData }) => {
  const { formData, setFormData } = useFormData();
  const { agentID } = useParams();
  const { getToken } = useAuth();
  const [laoder, setLoader] = useState(false);
  const editAgentPayload = (data) => {
    let payload = {
      agent_config: {
        agent_name: data?.agent_name,
        agent_id: data?.agent_id,
        tasks: data?.tasks,
      },
      agent_prompts: data?.agent_prompts,
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
        endpointing: "1300",
        linearDelay: "300",
        interruptWords: "3",
        hangupSeconds: "4",
        hangUpLogic: "Via Prompt",
      },
    };
    if (data?.agent_welcome_message) {
      payload.agent_config.agent_welcome_message = data?.agent_welcome_message;
    }

    const conversationTask = data?.tasks?.find(
      (item) => item.task_type === "conversation"
    );
    if (conversationTask) {
      payload.AdvancedSettingData.language =
        conversationTask.tools_config.transcriber.language;
      payload.AdvancedSettingData.voice =
        conversationTask.tools_config.synthesizer.provider_config.voice;
      payload.AdvancedSettingData.modelName =
        conversationTask.tools_config.synthesizer.provider;
      payload.AdvancedSettingData.model =
        conversationTask.tools_config.llm_agent.model;
      payload.AdvancedSettingData.max_tokens =
        conversationTask.tools_config.llm_agent.max_tokens;
      payload.AdvancedSettingData.buffer_size =
        conversationTask.tools_config.synthesizer.buffer_size;
      payload.AdvancedSettingData.streaming_model =
        conversationTask.tools_config.synthesizer.provider;
      payload.AdvancedSettingData.temperature =
        conversationTask.tools_config.llm_agent.temperature;
      payload.AdvancedSettingData.stream =
        conversationTask.tools_config.synthesizer.stream;
      payload.AdvancedSettingData.endpointing =
        conversationTask.tools_config.transcriber.endpointing;
      payload.AdvancedSettingData.linearDelay =
        conversationTask.task_config.incremental_delay;
      payload.AdvancedSettingData.interruptWords =
        conversationTask.task_config.number_of_words_for_interruption;
      payload.AdvancedSettingData.hangupSeconds =
        conversationTask.task_config.hangup_after_silence;
      payload.AdvancedSettingData.ambient_noise =
        conversationTask.task_config.ambient_noise;
      payload.AdvancedSettingData.ambient_noise_track =
        conversationTask.task_config.ambient_noise_track;
      payload.AdvancedSettingData.call_terminate =
        conversationTask.task_config.call_terminate;
      payload.AdvancedSettingData.call_cancellation_prompt =
        conversationTask.task_config.call_cancellation_prompt;
      payload.AdvancedSettingData.provider =
        conversationTask.tools_config.llm_agent.provider;
      payload.AdvancedSettingData.tts_provider =
        conversationTask.tools_config.synthesizer.provider;
      payload.AdvancedSettingData.tts_voice_model =
        conversationTask.tools_config.synthesizer.provider_config.model;
      payload.AdvancedSettingData.tts_voice_languageCode =
        conversationTask.tools_config.synthesizer.provider_config.language;
      payload.AdvancedSettingData.tts_voice_engine =
        conversationTask.tools_config.synthesizer.provider_config.engine;
      payload.AdvancedSettingData.tts_voice_name =
        conversationTask.tools_config.synthesizer.provider_config.voice;
      payload.AdvancedSettingData.transcriber_model =
        conversationTask.tools_config.transcriber.model;
      payload.AdvancedSettingData.transcriber_provider =
        conversationTask.tools_config.transcriber.provider;
      payload.AdvancedSettingData.transcriber_sampling_rate =
        conversationTask.tools_config.transcriber.sampling_rate;
      payload.AdvancedSettingData.stream =
        conversationTask.tools_config.transcriber.stream;
      payload.AdvancedSettingData.keywords =
        conversationTask.tools_config.transcriber.keywords;
      payload.AdvancedSettingData.call_mode_provider =
        conversationTask.tools_config.input.provider;


    }
    payload.agent_config.tasks = data?.tasks?.filter(
      (item) => item.task_type !== "conversation"
    );
    return payload;
  };
  const getAgentData = async () => {
    setLoader(true);
    try {
      const token = await getToken();
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await api.get(`${VITE_APP_AGENT_API}/agent/${agentID}`);
      if (res.status === 200) {
        const { data } = res;
        const payload = editAgentPayload(data);
        setFormData(payload);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      return error;
    }
  };
  useEffect(() => {
    if (mode === "edit") {
      getAgentData();
    }
  }, []);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      agent_config: { ...formData?.agent_config, [name]: newValue },
    });
  };
  useEffect(() => {
    updatedData(formData);
  }, [formData]);
  return (
    <>
      {laoder && <UploadLoader />}
      <div className="Agentform ">
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <label className="" id="basic-addon1">
                Agent Name
              </label>
              <input
                type="text"
                name="agent_name"
                value={formData?.agent_config?.agent_name}
                onChange={handleInputChange}
                className="form-control"
                aria-label="AgentName"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="mb-3">
              <label className="" id="basic-addon4">
                Agent Welcome Message:
              </label>
              <textarea
                name="agent_welcome_message"
                value={formData?.agent_config?.agent_welcome_message}
                onChange={handleInputChange}
                className="form-control"
                rows={3}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentDetails;
