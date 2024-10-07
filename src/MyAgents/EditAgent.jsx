import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { toast } from "react-toastify";
import AgentDetails from "./CreateComponents/AgentDetails";
import PromptBuilder from "./CreateComponents/PromptBuilder";
import AdvancedSettings from "./CreateComponents/AdvancedSettings";
import FollowUp from "./CreateComponents/FollowUp";
import { FormDataProvider } from "./FormDataContext";
import { useParams } from "react-router-dom";
import UploadLoader from "../Routes/UploadLoader";
import EyeIcon from "../assets/eye.png";
import CallAgent from "./CreateComponents/CallAgent";
import { agentUpdate } from "../services/agentsApi";
import PopUp from "./CreateComponents/PopUp";
import '../index.css'

const EditAgent = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("Agent-Details");
  const [callModeProvider, setCallModeProvider] = useState("");
  const [editData, setEditData] = useState({});
  const { agentID } = useParams();
  const [loader, setLoader] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelect = (selectedkey) => {
    setKey(selectedkey);
  }
  const createAgentPayload = () => {
    const { agent_config, AdvancedSettingData, agent_prompts } = editData;
    const { tasks } = agent_config;
    setCallModeProvider(AdvancedSettingData?.call_mode_provider);
    const extractionDetails = tasks.find(task => task.task_type === "extraction")?.tools_config?.llm_agent?.extraction_details;
    const webhookURL = tasks.find(task => task.task_type === "webhook")?.tools_config?.api_tools?.tools_params?.webhook?.url;
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
    };

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
              tools: extractionDetails !== undefined ? extractionDetails : "",
              tools_params: {
                webhook: {
                  url: task_type === "webhook" ? webhookURL : undefined,
                },
              },
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
        // ...agent_config,
        agent_name: agent_config?.agent_name,
        agent_type: "Other",
        agent_welcome_message: agent_config?.agent_welcome_message,
        tasks: [
          {
            // hangup_after_LLMCall: false,
            tools_config: {
              output: {
                format: "wav",
                provider: AdvancedSettingData?.call_mode_provider,
              },
              input: {
                format: "wav",
                provider: AdvancedSettingData?.call_mode_provider,
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
                  AdvancedSettingData?.tts_voice_engine
                ),
                buffer_size: Number(AdvancedSettingData?.buffer_size),
              },
              llm_agent: {
                max_tokens: Number(AdvancedSettingData?.max_tokens),
                presence_penalty: 0,
                extraction_details: null,
                top_p: 0.9,
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
                streaming_model: AdvancedSettingData?.model, //gpt turbo
                classification_model: AdvancedSettingData?.model,
                model: AdvancedSettingData?.model,
              },
              transcriber: {
                sampling_rate: Number(
                  AdvancedSettingData?.transcriber_sampling_rate
                ),
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
              hangup_after_LLMCall: AdvancedSettingData?.hangUpLogic==="Via Prompt"?true:false,
              optimize_latency: true,
              interruption_backoff_period: 100,
              incremental_delay: Number(AdvancedSettingData?.linearDelay),
              number_of_words_for_interruption: Number(
                AdvancedSettingData?.interruptWords
              ),
              ambient_noise: AdvancedSettingData?.ambient_noise,
              ambient_noise_track: AdvancedSettingData?.ambient_noise_track,
              call_cancellation_prompt:
                AdvancedSettingData?.call_cancellation_prompt !== ""
                  ? AdvancedSettingData?.call_cancellation_prompt
                  : null,
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

  const updateAgent = async () => {
    setLoader(true);
    const payload = createAgentPayload();
    const { agent_config, agent_prompts } = payload;
    const { tasks, agent_name, agent_welcome_message, agent_type } =
      agent_config;
    const updateAgentPayload = {
      // ...agent_config,
      agent_config: {
        agent_name,
        agent_type,
        agent_welcome_message,
        tasks,
      },
      agent_prompts,
    };

    try {
      const updateAgentResponse = await agentUpdate(
        agentID,
        updateAgentPayload
      );
      if (updateAgentResponse.status === 200) {
        toast.success("Agent Updated Successfully");
        setLoader(false);
      }
    } catch (error) {
      toast.error("Error updating agent");
      setLoader(false);
    }
  };

  const handleSubmit = () => {
    updateAgent();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(agentID);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 700);
  };

  const handleView = (agentId, agentName) => {
    navigate(`/agentexecutions/${agentId}`, {
      state: { agentName },
    });
  };

  return (
    <>
      {loader && <UploadLoader />}
      {/* <WebSocketComponent agentID={agentID}/> */}
      <FormDataProvider>
        <div className="dashboard-container items-center">
          <div className="flex justify-between items-center mb-10">
            {editData?.agent_config && (
              <div className="relative">
                <h1 className="fs-30 fw-600 dashboard-title mb-2 capitalize">
                  {editData?.agent_config?.agent_name}
                </h1>

                <p
                  className={`text-neutral-400 cursor-pointer agentId_clipboard ${copied ? "copied" : ""
                    }`}
                  onClick={handleCopy}
                >
                  {agentID}
                </p>
                {copied && <span className="tooltipBox">Copied</span>}
              </div>
            )}

            <div className="flex gap-2">
              <PopUp
                Title={"Set Inbound Agent"}
                Content={
                  "Please copy and paste this link in your Twilio to start answering your phone number by this agent."
                }
                agentID={agentID}
              />
              <button
                onClick={() =>
                  handleView(agentID, editData?.agent_config?.agent_name)
                }
                className="text-white py-2 px-6 font-medium rounded-full border-0 btn btn-primary flex items-center gap-2.5"
                style={{ backgroundColor: "#4c1d95" }}
              >
                View
                <img
                  src={EyeIcon}
                  style={{ filter: "brightness(0) invert(1)", width: "22px" }}
                  alt="eye"
                />
              </button>
              <CallAgent agentID={agentID}
                callMode={callModeProvider}
              />
              <button className="main-btn rounded-full" onClick={handleSubmit}>
                Update
              </button>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="promptBOx w-3/5">
              <PromptBuilder
                mode={"edit"}
                updatedData={(data) => setEditData(data)}
              />
            </div>
            <div className="tabs w-2/5">
              <div className="tabs">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={handleSelect}
                  className="mb-10 flex justify-between border-0 create_agent_tabs"
                >
                  <Tab eventKey="Agent-Details" title="Agent Details">
                    <AgentDetails
                      mode={"edit"}
                      updatedData={(data) => {
                        setEditData(data);
                      }}
                    />
                  </Tab>

                  <Tab eventKey="FollowUp" title="FollowUp-Tasks">
                    <FollowUp
                      mode={"edit"}
                      updatedData={(data) => {
                        setEditData(data);
                      }}
                    />
                  </Tab>
                  <Tab eventKey="Advanced Settings" title="Advanced Settings">
                    <AdvancedSettings
                      mode={"edit"}
                      updatedData={(data) => {
                        setEditData(data);
                      }}
                      agentID={agentID}
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

export default EditAgent;