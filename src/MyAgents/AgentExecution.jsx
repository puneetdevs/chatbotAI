import React, { useCallback, useEffect, useState } from "react";
import "../index.css";
import axios from "axios";
import { VITE_APP_AGENT_API } from "../utils/constants";
import UploadLoader from "../Routes/UploadLoader";
import { getVoices } from "../services/agent";

const AgentExecution = ({ runId }) => {
  const RunID = runId.replace("#", encodeURIComponent("#"));
  const [allVoices, setAllVoices] = useState([]);
  const [play, setPlay] = useState(null);
  const [loader, setLoader] = useState(false);
  const [response, setResponse] = useState(null);
  const [matchedVoice, setMatchedVoice] = useState(null);

  const fetchVoices = useCallback(async () => {
    const response = await getVoices();
    const voices =
      response &&
      response.data.map((voice) => ({
        label: `${voice.name} (${voice.languageCode} ${voice.accent})`,
        name: voice.name,
        value: voice.model,
        audio: voice.audio,
      }));
    setAllVoices(voices);
  }, []);

  const getAgentData = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `${VITE_APP_AGENT_API}/agent/executions/${RunID}`
      );
      if (res.status === 200) {
        const responseData = res?.data;
        setResponse(responseData);
        setPlay(responseData?.recording_path);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      return error;
    }
  };

  useEffect(() => {
    fetchVoices();
    getAgentData();
  }, [RunID, fetchVoices]);

  const formatKey = (key) => {
    let formattedKey = key.replace(/_/g, " ");
    formattedKey = formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1); // Capitalize first letter
    return formattedKey;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  function renderValue(value) {
    if (Array.isArray(value)) {
      return (
        <ul className="list-none ml-4">
          {value.map((item, index) => (
            <li key={index}>{renderValue(item)}</li>
          ))}
        </ul>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <ul className="list-none ml-4">
          {Object.entries(value).map(([nestedKey, nestedValue]) => (
            <li key={nestedKey}>
              <span className="font-medium text-sm">
                {formatKey(nestedKey)}:{" "}
              </span>
              {renderValue(nestedValue)}
            </li>
          ))}
        </ul>
      );
    }
    return <span>{value}</span>;
  }

  return (
    <>
      {loader && <UploadLoader />}
      <div className="dashboard-container items-center createAgent_header p-0 h-auto agentExecution_page">
        <div className="dark:bg-zinc-800">
          <div className="dark:bg-zinc-800 flex gap-4">

            <div className="w-full">
              <h2 className="mb-2 text-xl font-bold leading-11 text-[#230c4c]">
                Qualitative Details
              </h2>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Recording</h3>
                {play && (
                  <>
                    <audio key={play} controls className="w-full mt-3">
                      <source src={play} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                  </>
                )}
              </div>
              {response?.extracted_data != null && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Extraction</h3>
                  <ul className="list-none">
                    {Object.entries(response?.extracted_data).map(
                      ([key, value]) => (
                        <li
                          key={key}
                          className="text-gray-700 text-sm font-light mb-1"
                        >
                          <span className="font-medium text-base">
                            {formatKey(key)}:{" "}
                          </span>
                          {renderValue(value)}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Summary</h3>
                <p>{response?.summarised_data}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Transcript</h3>
                <ul
                  className="border border-gray-300 p-3 mt-3 overflow-y-auto"
                  style={{ maxHeight: "360px" }}
                >
                  {response?.messages?.slice(1).map((transcript, index) => (
                    <li
                      key={index}
                      className="mb-2 text-gray-700 text-base font-medium"
                    >
                      <strong className="capitalize">{transcript?.role}</strong>
                      {transcript?.content}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentExecution;
