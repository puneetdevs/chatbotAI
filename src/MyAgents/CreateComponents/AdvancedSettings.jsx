import React, { useEffect, useState, useCallback, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import { useFormData } from "../FormDataContext";
import { getModels, getVoices, getTranscriberData } from "../../services/agent";

const AdvancedSettings = ({ mode, updatedData, agentID }) => {
  const { formData, setFormData } = useFormData();
  const [play, setPlay] = useState(null);
  const audioRef = useRef(null);
  const { AdvancedSettingData } = formData;

  const languageArray = [
    { label: "hi", value: "hi" },
    { label: "fr", value: "fr" },
    { label: "en", value: "en" },
    { label: "it", value: "it" },
    { label: "pt-BR", value: "pt-BR" },
  ];

  const ambientNoise = [
    { label: "No ambient noise", value: ""},
    { label: "Office ambience", value: "office-ambience"},
    { label: "Call center", value: "call-center"},
  ];
  const streamArray = [
    { label: "True", value: true },
    { label: "False", value: false },
  ];
  const callModeArray = [
    { label: "Twilio", value:"twilio" },
    { label: "Plivo", value:"plivo" },
  ];
  const [allVoices, setAllVoices] = useState([]);
  const [streamingArray, setStreamingArray] = useState([]);
  const [transcriberArray, setTranscriberArray] = useState([]);
  const fetchVoices = useCallback(async () => {
    const response = await getVoices();
    const voices = response.data.map((voice) => ({
      label: `${voice.name} (${voice.languageCode} ${voice.accent})`,
      value: voice.provider === "azuretts" ? voice.name : voice.model,
      audio: voice.audio,
      provider: voice.provider,
      model: voice.model,
      engine: voice.engine,
      name: voice.name,
      languageCode: voice.languageCode,
    }));
    setAllVoices(voices);
  }, []);

  const fetchTranscriber = useCallback(async () => {
    const response = await getTranscriberData();
    const transcribers = response.data.map((transcriber) => ({
      label: `${transcriber.id}`,
      value: transcriber.model,
      model: transcriber.model,
      provider: transcriber.provider,
      endpointing: transcriber.endpointing,
      language: transcriber.language,
      stream: transcriber.stream,
      encoding: transcriber.encoding,
      keywords: transcriber.keywords,
      sampling_rate: transcriber.sampling_rate,

    }));
    setTranscriberArray(transcribers);
  }, []);


  const fetchModals = useCallback(async () => {
    try {
      const response = await getModels();
      const modals = response?.data.map((modal) => ({
        label: `${modal.display_name} (${modal.languages})`,
        value: modal.model,
        provider: modal.provider,

      }));
      setStreamingArray(modals);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  }, []);

  useEffect(() => {
    fetchModals();
    fetchVoices();
    fetchTranscriber();

  }, []);
  useEffect(() => {
    updatedData(formData);
    if (audioRef.current) {
      audioRef.current.load();
    }
    if (formData?.AdvancedSettingData?.voice) {
      const selectedVoice = allVoices.find((voice) => voice.value === formData?.AdvancedSettingData?.voice)
      setPlay(selectedVoice?.audio);
    }
  }, [formData, play]);

  const handleInputChange = (key, value) => {
    let updatedAdvancedSettingData = { ...formData.AdvancedSettingData, [key]: value };

    if (key === "model") {
      const selectedModel = streamingArray.find((model) => model.value === value);
      if (selectedModel) {
        updatedAdvancedSettingData.provider = selectedModel.provider;
      }
    } else if (key === "ambient_noise_track") {
      updatedAdvancedSettingData.ambient_noise = value !== "";
    } else if (key === "hangUpLogic" && value === "Static Time Based Hangup") {
      updatedAdvancedSettingData.call_cancellation_prompt = null;
    } else if (key === "voice") {
      const selectedVoice = allVoices.find((voice) => voice.value === value);
      if (selectedVoice) {
        updatedAdvancedSettingData.tts_provider = selectedVoice.provider;
        updatedAdvancedSettingData.tts_voice_model = selectedVoice.model;
        updatedAdvancedSettingData.tts_voice_engine = selectedVoice.engine;
        updatedAdvancedSettingData.tts_voice_name = selectedVoice.name;
        updatedAdvancedSettingData.tts_voice_languageCode = selectedVoice.languageCode;
        setPlay(selectedVoice.audio);
      }

    }
    else if (key === "transcriber_model") {
      const selectedTranscriberModel = transcriberArray.find((model) => model.value === value);
      if (selectedTranscriberModel) {
        updatedAdvancedSettingData.transcriber_model = selectedTranscriberModel.model;
        updatedAdvancedSettingData.transcriber_provider = selectedTranscriberModel.provider;
        updatedAdvancedSettingData.transcriber_encoding = selectedTranscriberModel.encoding;
        updatedAdvancedSettingData.transcriber_sampling_rate = selectedTranscriberModel.sampling_rate;
        updatedAdvancedSettingData.keywords = selectedTranscriberModel.keywords;
        updatedAdvancedSettingData.endpointing = selectedTranscriberModel.endpointing;
        updatedAdvancedSettingData.stream = selectedTranscriberModel.stream;
        updatedAdvancedSettingData.language = selectedTranscriberModel.language;
      }
    }

    setFormData((prev) => ({
      ...prev,
      AdvancedSettingData: updatedAdvancedSettingData,
    }));
  };



  return (
    <div className="Agentform ">
      <div className="row">
        <div className="col-md-12 flex flex-wrap gap-x-4">
          <div className="Advancesetting">
            <h2>Basic Settings:</h2>

            <div className="mb-3">
              <label htmlFor="model" className="form-label">
                Streaming Model:
              </label>
              <Form.Select
                id="model"
                aria-label="Select Streaming Model"
                className="form-control"
                value={formData?.AdvancedSettingData?.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
              >
                {streamingArray.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="mb-3">
              <label htmlFor="language" className="form-label">
                Language:
                {formData?.AdvancedSettingData?.language}
              </label>

              <Form.Select
                id="language"
                aria-label="Select Language"
                className="form-control"
                value={formData?.AdvancedSettingData?.language}
                onChange={(e) => handleInputChange("language", e.target.value)}
              >
                {languageArray.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="mb-3">
              <label htmlFor="voice" className="form-label">
                Voice:
              </label>
              <div className="gap-1.5">
                <Form.Select
                  id="voice"
                  aria-label="Select voice"
                  className="form-control"
                  value={formData?.AdvancedSettingData?.voice}
                  onChange={(e) => handleInputChange("voice", e.target.value)}
                >
                  {allVoices.map((option, index) => {
                    return (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </Form.Select>
                {play && (
                  <audio key={play} controls className="w-full mt-3" ref={audioRef}>
                    <source src={`https://app.voagents.ai${play}`} type="audio/x-wav" />
                    {/* <source src={`/src${play}`} type="audio/x-wav" /> */}
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="ambient_noise_track" className="form-label">
                Ambient-Noise:
              </label>
              <div className="gap-1.5">
                <Form.Select
                  id="ambient_noise_track"
                  aria-label="Select Ambient Noise"
                  className="form-control"
                  value={formData?.AdvancedSettingData?.ambient_noise_track}
                  onChange={(e) => handleInputChange("ambient_noise_track", e.target.value)}
                >
                  {ambientNoise.map((option, index) => {
                    return (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
            </div>
          </div>

          <div className="Advancesetting">
            <h2>LLM Settings:</h2>
            <div className="mb-3">
              <label htmlFor="maxtoken" className="form-label">
                Max Token:
              </label>
              <div className="firstsetting">
                <Form.Control
                  type="number"
                  value={formData?.AdvancedSettingData?.max_tokens}
                  placeholder="Max Token"
                  className="form-control mb-3"
                  onChange={(e) =>
                    handleInputChange("max_tokens", e.target.value)
                  }
                />
              </div>

              <h2 className="mt-5">TTS Settings:</h2>
              <div className="firstsetting">
                <div className="mb-2">
                  <label htmlFor="Buffer" className="form-label">
                    Buffer-Size:
                  </label>
                  <Form.Control
                    type="number"
                    defaultValue={formData?.AdvancedSettingData?.buffer_size}
                    value={formData?.AdvancedSettingData?.buffer_size}
                    onChange={(e) =>
                      handleInputChange("buffer_size", e.target.value)
                    }
                  />
                </div>
              </div>

            </div>
            {/* //=================================================================================================================================== */}

            <div className="firstsetting">
              <label htmlFor="customRange3" className="form-label">
                Temperature:&nbsp;{formData?.AdvancedSettingData?.temperature}
              </label>
              <input
                type="range"
                className="form-range"
                min="0.1"
                max="10"
                step="0.1"
                id="customRange3"
                value={formData?.AdvancedSettingData?.temperature}
                onChange={(e) =>
                  handleInputChange("temperature", e.target.value)
                }
              />
            </div>
            <div className="mt-3">
              <label htmlFor="call_mode_provider" className="form-label">
                Call-Mode:
              </label>
              <Form.Select
                id="call_mode_provider"
                aria-label="Select call mode"
                className="form-control"
                value={formData?.AdvancedSettingData?.call_mode_provider}
                onChange={(e) => handleInputChange("call_mode_provider", e.target.value)}
              >
                {callModeArray.map((option, index) => {
                  return (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
          </div>



          <div className="Advancesetting mt-6">
            <h2>ASR Settings:</h2>
            <div className="firstsetting">
              <div className="mb-3">
                <label htmlFor="transcriber_model" className="form-label">
                  Model-Name:
                </label>

                <Form.Select
                  id="transcriber_model"
                  aria-label="Select Model Name"
                  className="form-control"
                  value={formData?.AdvancedSettingData?.transcriber_model}
                  onChange={(e) => handleInputChange("transcriber_model", e?.target.value)}
                >
                  {transcriberArray.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>

            <div className="mb-3" id="inputprompt2">
              <div>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  placeholder="What Could Be The Keyword"
                  value={formData?.AdvancedSettingData?.keywords}
                  onChange={(e) =>
                    handleInputChange("keywords", e.target.value)
                  }
                ></textarea>
              </div>
            </div>
            <div className="firstsetting">
              <div className="mb-3">
                <label htmlFor="stream" className="form-label">
                  Streaming:
                </label>

                <Form.Select
                  id="stream"
                  aria-label="Select stream"
                  className="form-control"
                  value={formData?.AdvancedSettingData?.stream || true}
                  onChange={(e) => handleInputChange("stream", e.target.value)}
                >
                  {streamArray.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
            {/* //========================================================================================================================================= */}

            <div className="firstsetting">
              <label htmlFor="customRange3" className="form-label">
                Endpointing: &nbsp;
                {formData?.AdvancedSettingData?.endpointing}
              </label>
              <input
                type="range"
                className="form-range"
                min="0"
                max="2500"
                step="50"
                id="customRange3"
                value={formData?.AdvancedSettingData?.endpointing}
                onChange={(e) =>
                  handleInputChange("endpointing", e.target.value)
                }
              />
            </div>
            <div className="firstsetting">
              <label htmlFor="customRange3" className="form-label">
                Call Termination:&nbsp;
                {formData?.AdvancedSettingData?.call_terminate}
              </label>
              <input
                type="range"
                className="form-range"
                min="0"
                max="480"
                step="10"
                id="customRange3"
                value={formData?.AdvancedSettingData?.call_terminate}
                onChange={(e) =>
                  handleInputChange("call_terminate", e.target.value)
                }
              />
            </div>
          </div>
          <div className="Advancesetting mt-6">
            <h2>Conversation Nuance:</h2>
            <div className="firstsetting">
              <label for="customRange3" className="form-label">
                Linear Delay: &nbsp;
                {formData?.AdvancedSettingData?.linearDelay}
                ms
              </label>
              <input
                type="range"
                className="form-range"
                min="0"
                max="2500"
                step="50"
                name="linearDelay"
                id="customRange3"
                value={formData?.AdvancedSettingData?.linearDelay}
                onChange={(e) =>
                  handleInputChange("linearDelay", e.target.value)
                }
              />
            </div>
            <div className="firstsetting">
              <label for="customRange3" className="form-label">
                Number of words to wait before interuppting : &nbsp;
                {formData?.AdvancedSettingData?.interruptWords || "3"}
                &nbsp; words
              </label>

              <input
                type="range"
                className="form-range"
                min="0"
                max="10"
                step="1"
                id="customRange3"
                defaultValue={formData?.AdvancedSettingData?.interruptWords}
                value={formData?.AdvancedSettingData?.interruptWords}
                onChange={(e) =>
                  handleInputChange("interruptWords", e.target.value)
                }
              />
            </div>
            <div className="firstsetting w-full">
              <label for="customRange3" className="form-label">
                Call HangUp Logic:
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value="Via Prompt"
                  checked={
                    formData?.AdvancedSettingData?.hangUpLogic === "Via Prompt"
                  }
                  onChange={(e) =>
                    handleInputChange("hangUpLogic", e.target.value)
                  }
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Via Prompt
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  value="Static Time Based Hangup"
                  checked={formData?.AdvancedSettingData?.hangUpLogic === "Static Time Based Hangup"}
                  onChange={(e) =>
                    handleInputChange("hangUpLogic", e.target.value)
                  }
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Static Time Based Hangup
                </label>
              </div>
            </div>
            {formData?.AdvancedSettingData?.hangUpLogic === "Via Prompt" && <div className="firstsetting">
              <textarea className="form-control"
                value={formData?.AdvancedSettingData?.call_cancellation_prompt}
                onChange={(e) => handleInputChange("call_cancellation_prompt", e.target.value)} rows="2"></textarea>
            </div>}
            <div className="firstsetting">
              <label for="customRange3" className="form-label">
                Seconds of Silence to wait before hanging up: &nbsp;

                {formData?.AdvancedSettingData?.hangupSeconds} &nbsp;
                Seconds
              </label>
              <input
                type="range"
                className="form-range"
                min="0"
                max="30"
                name="secondsOfSilence"
                step="1"
                id="customRange3"
                value={formData?.AdvancedSettingData?.hangupSeconds}
                onChange={(e) =>
                  handleInputChange("hangupSeconds", e.target.value)
                }
              />
            </div>

          </div>
        </div>
        <div className="col-12">
          <div className="flex justify-center gap-5 mt-10">
            {/* <button className="main-btn" onClick={handleSubmit}>
              {mode === "edit" ? "Update" : "Submit"}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;
