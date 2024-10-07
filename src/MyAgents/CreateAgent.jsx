import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useNavigate } from "react-router-dom";
import AgentDetails from "./CreateComponents/AgentDetails";
import { ToastContainer, toast } from "react-toastify";
import PromptBuilder from "./CreateComponents/PromptBuilder";
import AdvancedSettings from "./CreateComponents/AdvancedSettings";
import FollowUp from "./CreateComponents/FollowUp";
import { FormDataProvider } from "./FormDataContext";
import UploadLoader from "../Routes/UploadLoader";
import { createAgent } from "../services/agentsApi";

const CreateAgent = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("Agent-Details");
  const [agentData, setAgentData] = useState();
  const [loader, setLoader] = useState(false);
  const handleSelect = (selectedKey) => {
    setKey(selectedKey);
  };
  const generateProviderConfig = (provider, voice, name, languageCode, engine) => {
    switch (provider) {
      case "azuretts":
        return {
          voice: name,
          language: languageCode,
          model: "Neural",
        };
      case "polly":
        return {
          voice: voice,
          engine: engine,
          language: languageCode,
        };
      case "deepgram":
        return {
          voice: voice,
          model: voice,
        };
      default:
        return {};
    }
  }

  const createAgentPayload = () => {
    const { agent_config, AdvancedSettingData, agent_prompts } = agentData;
    const { tasks } = agent_config;
    const extractionDetails = tasks.find(
      (task) => task.task_type === "extraction"
    )?.tools_config?.llm_agent?.extraction_details;
    const webhookURL = tasks.find((task) => task.task_type === "webhook")
      ?.tools_config?.api_tools?.tools_params?.webhook?.url;
    const newtasks = tasks.map((task) => {
      const { task_type } = task;
      if (task_type === "summarization") {
        return {
          task_type,
          task_config: {
            incremental_delay: Number(AdvancedSettingData?.linearDelay),
            number_of_words_for_interruption: Number(
              AdvancedSettingData?.interruptWords
            ),
            hangup_after_silence: Number(AdvancedSettingData?.hangupSeconds),
            hangup_after_LLMCall: false,
            interruption_backoff_period: 100,
            call_cancellation_prompt: null,
          },
          tools_config: {
            llm_agent: {
              max_tokens: Number(AdvancedSettingData?.max_tokens),
              family: "openai",
              request_json: true,
              model: AdvancedSettingData?.model,
            },
          },
          toolchain: {
            execution: "parallel",
            pipelines: [["llm"]],
          },
        };
      }
      if (task_type === "extraction") {
        return {
          task_type,
          task_config: {
            incremental_delay: Number(AdvancedSettingData?.linearDelay),
            number_of_words_for_interruption: Number(
              AdvancedSettingData?.interruptWords
            ),
            hangup_after_silence: Number(AdvancedSettingData?.hangupSeconds),
            hangup_after_LLMCall: false,
            interruption_backoff_period: 100,
            call_cancellation_prompt: null,
          },
          tools_config: {
            llm_agent: {
              max_tokens: Number(AdvancedSettingData?.max_tokens),
              family: "openai",
              request_json: true,
              model: AdvancedSettingData?.model,
              extraction_details:
                task_type === "extraction" ? extractionDetails : undefined,
            },
          },
          toolchain: {
            execution: "parallel",
            pipelines: [["llm"]],
          },
        };
      }
      if (task_type === "webhook") {
        return {
          task_type,
          task_config: {
            incremental_delay: Number(AdvancedSettingData?.linearDelay),
            number_of_words_for_interruption: Number(
              AdvancedSettingData?.interruptWords
            ),
            hangup_after_silence: Number(AdvancedSettingData?.hangupSeconds),
            hangup_after_LLMCall: false,
            interruption_backoff_period: 100,
            call_cancellation_prompt: null,
          },
          tools_config: {
            api_tools: {
              webhookURL: task_type === "webhook" ? webhookURL : undefined,
              tools: extractionDetails,
              tools_params: { webhook: { url: webhookURL } },
            },
          },
          toolchain: {
            execution: "parallel",
            pipelines: [["llm"]],
          },
        };
      }
    });
    const reOrderedtasks = [
      ...newtasks.filter((task) => task.task_type === "conversation"),
      ...newtasks.filter((task) => task.task_type === "summarization"),
      ...newtasks.filter((task) => task.task_type === "extraction"),
      ...newtasks.filter((task) => task.task_type === "webhook"),
      ...newtasks.filter(
        (task) =>
          !["conversation", "summarization", "extraction", "webhook"].includes(
            task.task_type
          )
      ),
    ];

    const createPayload = {
      agent_config: {
        ...agent_config,
        tasks: [
          {
            tools_config: {
              output: {
                format: "wav",
                provider: AdvancedSettingData?.call_mode_provider ?  AdvancedSettingData?.call_mode_provider : 'twilio',
              },
              input: {
                format: "wav",
                provider: AdvancedSettingData?.call_mode_provider ?  AdvancedSettingData?.call_mode_provider : 'twilio',
              },
              synthesizer: {
                audio_format: "wav",
                provider: AdvancedSettingData?.tts_provider,
                stream: AdvancedSettingData?.stream || true,
                provider_config: generateProviderConfig(
                  AdvancedSettingData?.tts_provider,
                  AdvancedSettingData?.voice,
                  AdvancedSettingData?.tts_voice_name,
                  AdvancedSettingData?.tts_voice_languageCode,
                  AdvancedSettingData?.tts_voice_engine,
                ),
                buffer_size: Number(AdvancedSettingData?.buffer_size),
              },
              llm_agent: {
                max_tokens: Number(AdvancedSettingData?.max_tokens),
                presence_penalty: 0,
                extraction_details: null,
                top_p: 0.9,
                model: AdvancedSettingData?.model,
                classification_model: AdvancedSettingData?.model,
                agent_flow_type: "streaming",
                use_fallback: true,
                request_json: false,
                min_p: 0.1,
                frequency_penalty: 0,
                stop: null,
                top_k: 0,
                temperature: Number(AdvancedSettingData?.temperature),
                family: AdvancedSettingData?.provider,
                provider: AdvancedSettingData?.provider,
                streaming_model: AdvancedSettingData?.model,
              },
              transcriber: {
                sampling_rate: Number(AdvancedSettingData?.transcriber_sampling_rate),
                endpointing: Number(AdvancedSettingData?.endpointing),
                keywords: AdvancedSettingData?.keywords
                  ? AdvancedSettingData?.keywords
                  : "",
                stream: AdvancedSettingData?.stream || true,
                model: AdvancedSettingData?.transcriber_model,
                provider: AdvancedSettingData?.transcriber_provider,
                task: "transcribe",
                language: AdvancedSettingData?.language,
                encoding: AdvancedSettingData?.transcriber_encoding,
              },
              api_tools: null,
            },
            task_type: "conversation",
            toolchain: {
              execution: "parallel",
              pipelines: [["transcriber", "llm", "synthesizer"]],
            },
            task_config: {
              hangup_after_silence: Number(AdvancedSettingData?.hangupSeconds),
              hangup_after_LLMCall: false,
              optimize_latency: true,
              interruption_backoff_period: 100,
              incremental_delay: Number(AdvancedSettingData?.linearDelay),
              number_of_words_for_interruption: Number(AdvancedSettingData?.interruptWords),
              ambient_noise: AdvancedSettingData?.ambient_noise,
              ambient_noise_track: AdvancedSettingData?.ambient_noise_track,
              call_cancellation_prompt: AdvancedSettingData?.call_cancellation_prompt !== "" ? AdvancedSettingData?.call_cancellation_prompt : null,
              call_terminate: Number(AdvancedSettingData?.call_terminate),
            },
          },
          ...reOrderedtasks,
        ],
      },
      agent_prompts: {
        task_1: {
          system_prompt: agent_prompts?.task_1?.system_prompt,
        },
      },
    };
    return createPayload;
  };
  const createAgents = async () => {
    setLoader(true);
    try {
      const createPayload = createAgentPayload();
      const createAgentResponse = await createAgent(createPayload);
      if (createAgentResponse.status === 200) {
        toast.success("Agent Created Successfully");
        setLoader(false);
        navigate(`/agents/${createAgentResponse?.data.agent_id}`);
      }
    } catch (error) {
      toast.error("Error creating agent");
      setLoader(false);
    }
  };

  const handleSubmit = () => {
    createAgents();
  };

  return (
    <>
      {loader && <UploadLoader />}
      <FormDataProvider>
        <div className="dashboard-container items-center createUpdate_container">
          <div className="flex justify-between items-center mb-10">
            <h1 className="fs-30 fw-600 dashboard-title ">Create Agent </h1>
            <button className="main-btn rounded-full" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <div className="flex gap-5">
            <div className="promptBOx w-1/2">
              <PromptBuilder
                mode={"create"}
                updatedData={(data) => {
                  setAgentData(data);
                }}
              />
            </div>
            <div className="tabs w-2/5 tabs_width">
            <div className="tabs">
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={handleSelect}
                className="mb-10 flex justify-between border-0 create_agent_tabs"
              >
                  <Tab eventKey="Agent-Details" title="Agent Details">
                  <AgentDetails
                    mode={"create"}
                    updatedData={(data) => {
                      setAgentData(data);
                    }}
                  />
                </Tab>

                <Tab eventKey="FollowUp" title="FollowUp-Tasks">
                <FollowUp
                    mode={"create"}
                    updatedData={(data) => {
                      setAgentData(data);
                    }}
                  />
                </Tab>

                <Tab eventKey="Advanced Settings" title="Advanced Settings">
                <AdvancedSettings
                    mode={"create"}
                    updatedData={(data) => {
                      setAgentData(data);
                    }}
                  />
                </Tab>
              </Tabs>
              </div>
            </div>
          </div>
        </div>
      </FormDataProvider>
    </>
  );
};

export default CreateAgent;
