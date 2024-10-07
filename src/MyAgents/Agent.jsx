import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AgentData from "./AgentData";
import "../index.css";
import { Modal } from "react-bootstrap";
import { agentDefaultData, createAgent } from "../services/agentsApi";
import { useQuery } from "react-query";
import UploadLoader from "../Routes/UploadLoader";
import { toast } from "react-toastify";

const Agent = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { data: defaultAgent } = useQuery(["defaultAgent"], agentDefaultData, {
    retry: false,
  });

  const [agents, setAgents] = useState([]);
  const [agentName, setAgentName] = useState("");
  const [error, setError] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("Blank");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (defaultAgent) {
      const agentList = defaultAgent.data.map((agent) => {
        const { agent_config } = agent;
        const { agent_prompts, ...restAgentConfig } = agent_config;
        delete restAgentConfig.default;
        delete restAgentConfig.user_id;
        return {
          agent_config: { ...restAgentConfig },
          agent_prompts: agent_prompts,
        };
      });
      setAgents(agentList);
    }
  }, [defaultAgent]);

  const openCreateAgentModal = () => {
    setShow(true);
  };

  const handleClose = () => {
    setSelectedAgent(null);
    setAgentName("");
    setError("");
    setShow(false);
  };
  const createNewAgent = async (payload) => {
    const res = await createAgent(payload);
    if (res.status === 200) {
      setLoader(false);
      handleClose(); 
      navigate(`/agents/${res?.data.agent_id}`);
      toast.success("Agent created successfully");
    }
  };
  const createBlankTemplateAgent = async () => {
    const blankAgentPayload = {
      agent_config: {
        agent_name: agentName,
        tasks: [
          {
            tools_config: {
              output: { format: "wav", provider: "twilio" },
              input: { format: "wav", provider: "twilio" },
              synthesizer: {
                audio_format: "wav",
                provider: "deepgram",
                stream: true,
                provider_config: {
                  voice: "aura-luna-en",
                  model: "aura-luna-en",
                },
                buffer_size: 100,
              },
              llm_agent: {
                max_tokens: 100,
                presence_penalty: 0,
                extraction_details: null,
                top_p: 0.9,
                model: "gpt-3.5-turbo-1106",
                classification_model: "gpt-3.5-turbo-1106",
                agent_flow_type: "streaming",
                use_fallback: true,
                request_json: false,
                min_p: 0.1,
                frequency_penalty: 0,
                stop: null,
                top_k: 0,
                temperature: 4,
                family: "openai",
                provider:"openai",
                streaming_model: "gpt-3.5-turbo-1106",
              },
              transcriber: {
                sampling_rate: 16000,
                endpointing: 400,
                keywords: "",
                stream: true,
                model: "deepgram",
                language: "en",
                encoding: "linear16",
              },
              api_tools: null,
            },
            task_config: {
               hangup_after_silence: 10,
               ambient_noise:false,
               ambient_noise_track:"",
               call_cancellation_prompt:null,
               call_terminate:240,
            },
            hangup_after_LLMCall: false,
            interruption_backoff_period: 100,
            optimize_latency: true,
            incremental_delay: 100,
            call_cancellation_prompt: null,
            number_of_words_for_interruption: 3,
            task_type: "conversation",
            toolchain: {
              execution: "parallel",
              pipelines: [["transcriber", "llm", "synthesizer"]],
            },
          },
        ],
      },
      agent_prompts: { task_1: { system_prompt: "" } },
    };
    await createNewAgent(blankAgentPayload);
  };

  const handleSubmit = async () => {
    if (!agentName) return setError("Please enter agent name");
    setLoader(true);
    if (agentName && selectedAgent != "Blank") {
      let { agent_config, agent_prompts } = selectedAgent;
      agent_config.agent_name = agentName;
      const newPayload = { agent_config, agent_prompts };
      return await createNewAgent(newPayload);
    } else {
      return await createBlankTemplateAgent();
    }
  };

  return (
    <>
      {loader && <UploadLoader />}
      <div className="dashboard-container items-center createAgent_header">
        <div className="flex justify-between mb-10 agentHeader">
          <h1 className="fs-30 fw-600 dashboard-title">My Agents</h1>
          <button
            type="button"
            className="text-white py-2 px-6 font-medium rounded-full border-0 btn btn-primary flex items-center gap-2.5"
            style={{ backgroundColor: "#4c1d95" }}
            onClick={openCreateAgentModal}
          >
            Create Agent
          </button>
        </div>
        <AgentData />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form onSubmit={handleSubmit}> */}
          <div className="mb-3">
            <label htmlFor="agentName" className="form-label">
              Agent Name
            </label>
            <input
              type="text"
              onChange={(e) => {
                setAgentName(e.target.value);
                setError("");
              }}
              className="form-control"
              id="agentName"
              name="agentName"
            />
            {error && <span className="form-text text-danger">{error}</span>}
            {/* <div className="dividerModal">
              <span>OR</span>
            </div> */}
          </div>
          <div className="mb-3">
            <label className="form-label">Select Template</label>
            <div className="block templateSelect">
              <input
                type="radio"
                id="template_blank"
                name="Template"
                onChange={(e) => {
                  if (e.target.checked) setSelectedAgent("Blank");
                }}
                value="Blank"
              />
              <label htmlFor="template_blank">Blank Template</label>
              {agents?.map((agent, index) => {
                const { agent_config } = agent;
                return (
                  <>
                    <input
                      type="radio"
                      id={`template_${index}`}
                      name="Template"
                      onChange={(e) => {
                        if (e.target.checked) setSelectedAgent(agent);
                      }}
                      value={agent}
                    />
                    <label htmlFor={`template_${index}`}>
                      {agent_config?.agent_name}
                    </label>
                  </>
                );
              })}
            </div>
          </div>
          {/* </form> */}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Create
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Agent;
