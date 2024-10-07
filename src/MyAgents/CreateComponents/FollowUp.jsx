import React, { useState, useEffect } from "react";
import "../../index.css";
import { useFormData } from "../FormDataContext";
import webhookImage from '../../assets/internet.png';
import extractionImage from '../../assets/paper.png';


const FollowUp = ({ mode, updatedData }) => {
  const { formData, setFormData } = useFormData();
  const { tasks } = formData.agent_config;
  const [webhookURL, setWebhookURL] = useState("");
  const [extractionDetails, setExtractionDetails] = useState("");

  useEffect(() => {
    const webhookTask = tasks.find((task) => task.task_type === "webhook");
    const extractionDetailsTask = tasks.find((task) => task.task_type === "extraction");

    if (webhookTask && webhookTask?.tools_config?.api_tools?.tools_params?.webhook?.url) {
      setWebhookURL(webhookTask?.tools_config?.api_tools?.tools_params?.webhook?.url);
    }
    if (extractionDetailsTask && extractionDetailsTask?.tools_config?.llm_agent?.extraction_details) {
      setExtractionDetails(extractionDetailsTask?.tools_config?.llm_agent?.extraction_details)
    }

  }, [tasks]);

  const followupData = {
    summarization: {
      task_type: "summarization",
      task_config: {
        incremental_delay: 300,
        number_of_words_for_interruption: 3,
        hangup_after_silence: 4,
        hangup_after_LLMCall: false,
        interruption_backoff_period: 100,
        call_cancellation_prompt: null,
      },
      tools_config: {
        llm_agent: {
          max_tokens: 100,
          family: "openai",
          request_json: true,
          model: "gpt-3.5-turbo-16k",
        },
      },
      toolchain: {
        execution: "parallel",
        pipelines: [["llm"]],
      },
    },
    webhook: {
      task_type: "webhook",
      task_config: {
        incremental_delay: 300,
        number_of_words_for_interruption: 3,
        hangup_after_silence: 4,
        hangup_after_LLMCall: false,
        interruption_backoff_period: 100,
        call_cancellation_prompt: null,
      },
      tools_config: {
        api_tools: {
          webhookURL: webhookURL,
          tools: extractionDetails,
          tools_params: { webhook: { url: webhookURL } }

        },
      },
      toolchain: {
        execution: "parallel",
        pipelines: [["llm"]],
      },
    },
    extraction: {
      task_type: "extraction",
      task_config: {
        incremental_delay: 300,
        number_of_words_for_interruption: 3,
        hangup_after_silence: 4,
        hangup_after_LLMCall: false,
        interruption_backoff_period: 100,
        call_cancellation_prompt: null,
      },
      tools_config: {
        llm_agent: {
          max_tokens: 100,
          family: "openai",
          request_json: true,
          model: "gpt-3.5-turbo-16k",
          extraction_details: extractionDetails,
        },
      },
      toolchain: {
        execution: "parallel",
        pipelines: [["llm"]],
      },
    },
  };

  const handleSelect = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        agent_config: {
          ...formData.agent_config,
          tasks: [...tasks, followupData[value]],
        },
      });
    } else {
      setFormData({
        ...formData,
        agent_config: {
          ...formData.agent_config,
          tasks: tasks.filter((task) => task.task_type !== value),
        },
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "webhookURL") {
      setWebhookURL(value);
      const updatedTasks = tasks.map((task) => {
        if (task.task_type === "webhook") {
          return {
            ...task,
            tools_config: {
              ...task.tools_config,
              api_tools: {
                ...task.tools_config.api_tools,
                webhookURL: value,
                tools: extractionDetails,
                tools_params: {
                  ...task.tools_config.api_tools.tools_params,
                  webhook: {
                    ...task.tools_config.api_tools.tools_params.webhook,
                    url: value
                  }
                }
              },
            },
          };
        }
        return task;
      });
      setFormData({
        ...formData,
        agent_config: {
          ...formData.agent_config,
          tasks: updatedTasks,
        },
      });
    } else if (name === "extraction_details") {
      setExtractionDetails(value);
      const updatedTasks = tasks.map((task) => {
        if (task.task_type === "extraction") {
          return {
            ...task,
            tools_config: {
              ...task.tools_config,
              llm_agent: {
                ...task.tools_config.llm_agent,
                extraction_details: value,
              },
            },
          };
        }
        return task;
      })
      setFormData({
        ...formData,
        agent_config: {
          ...formData?.agent_config,
          tasks: updatedTasks,
        },
      });
    }
  };

  useEffect(() => {
    const updateData = () => {
      updatedData(formData);
    };

    updateData();
  }, [formData, updatedData]);

  return (
    <>
      <div className="followupradio">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="summarization"
            checked={formData?.agent_config?.tasks?.some(
              (task) => task.task_type === "summarization"
            )}
            onChange={handleSelect}
            name="summarization"
            id="flexCheckDefault1"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault1">
            Summarization
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="webhook"
            checked={formData?.agent_config?.tasks?.some(
              (task) => task.task_type === "webhook"
            )}
            onChange={handleSelect}
            name="webhook"
            id="flexCheckDefault2"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault2">
            WebHook
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="extraction"
            checked={formData?.agent_config?.tasks?.some(
              (task) => task.task_type === "extraction"
            )}
            onChange={handleSelect}
            name="extraction"
            id="flexCheckDefault3"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault3">
            Extraction
          </label>
        </div>
      </div>
      <div>
        {tasks.find((task) => task.task_type === "webhook") && (
          <>


            <div className="mb-3 mt-8  ">
              <div className="follow-image">
                <div className="img-para">
                <img src={webhookImage} alt="webhook-url" />
                <h4 className="follow-content">Webhook URL:-</h4>
                </div>
                <p className="follow-content1">Sends data from the AI voice agent interaction to an external server endpoint.</p>
              </div>
              <input
                type="text"
                name="webhookURL"
                value={webhookURL}
                placeholder="Webhook-URL"
                className="form-control"
                aria-label="Webhook-URL"
                aria-describedby="basic-addon4"
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
        {tasks.find((task) => task.task_type === "extraction") && (
          <div className="mb-3 mt-3">
            <div className="follow-image">
              <div className="img-para">
              <img src={extractionImage} alt="extraction-details" />
              <h4 className="follow-content" >Extraction-Details:-</h4>
              </div>
              <p className="follow-content1">Extract structured information from the conversation according to a custom prompt provided</p>
            </div>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              name="extraction_details"
              rows="3"
              value={extractionDetails}
              style={{ width: "100%" }}
              placeholder="Extraction Details"
              onChange={handleInputChange}
            ></textarea>

          </div>
        )}
      </div>

      <div className="headline">
        <h2 style={{ fontWeight: "bolder", fontSize: "x-large" }}>
          Helpful Tips
        </h2>
        <p>
          1. Kindly mention the details you'd like to extract from the
          transcript of conversation in a list and give examples for AI to
          understand. For example if you'd like to extract user intent then
          mention
        </p>
        <ol>
          <li>2. User intent - intent for the user to come back on app.</li>
          <li>
            3. User pulse - Whether the user believes India will win the world
            cup or not. Example Australia will win the cup, yields no, Rohit
            Sharma will finally get a world cup medal yields yes
          </li>
          <li style={{ fontWeight: "bold" }}>
            Imp: Webhook payload - If you've chosen webhook trigger as a
            followup task as well, make sure that your extraction prompt
            triggers the task. Explicitly mention the json keys required.
          </li>
        </ol>
      </div>
    </>
  );
};

export default FollowUp;
