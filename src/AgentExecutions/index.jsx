import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import CallAgent from "../MyAgents/CreateComponents/CallAgent";
import UploadLoader from "../Routes/UploadLoader";
import GetAllAgents from "../components/AllAgentsDropdown";
import { getAgentById } from "../services/agentsApi";
import AgentExecution from "../MyAgents/AgentExecution";
import ModalComponent from "../components/Modal";
import { getVoices } from "../services/agent";
import eyeIcon from "../assets/eye.png";

const AgentExecutions = () => {
  const { agentIdNew } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [agentId, setAgentId] = useState(agentIdNew || "");
  const [agentName, setAgentName] = useState("");
  const [apiStatus, setApiStatus] = useState(false);
  const [callModeProvider, setCallModeProvider] = useState("");
  const [response, setResponse] = useState([]);
  const [selectedRunId, setSelectedRunId] = useState(null);
  const [show, setShow] = useState(false);
  const [play, setPlay] = useState(null);
  const [allVoices, setAllVoices] = useState([]);

  const handleAgentChange = (selectedAgentId, selectedAgentName) => {
    setAgentName(selectedAgentName);
    setAgentId(selectedAgentId);
  };

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

  const urlHandler = () => {
    if (agentId !== "") {
      navigate(`/agentexecutions/${agentId}`);
    } else {
      navigate(`/agentexecutions`);
    }
  };

  useEffect(() => {
    urlHandler();
    fetchVoices();
  }, [agentId, fetchVoices]);

  const getAgentData = useCallback(async () => {
    if (agentId) {
      try {
        setLoading(true);
        const res = await getAgentById(agentId);
        if (res.status === 200) {
          setResponse(res?.data);
          setApiStatus(true);
        }
      } catch (error) {
        setApiStatus(false);
      } finally {
        setLoading(false);
      }
    }
  }, [agentId, apiStatus]);

  useEffect(() => {
    getAgentData();
  }, [getAgentData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const istDate = new Date(date);
    istDate.setHours(istDate.getHours() + 5);
    istDate.setMinutes(istDate.getMinutes() + 30);
    const hours = istDate.getHours();
    const minutes = istDate.getMinutes();
    const seconds = istDate.getSeconds();
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    return `${formattedDay}/${formattedMonth}/${year}  ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
  const formatTimeInMinutes = (timeInSeconds) => {
    const totalSeconds = parseFloat(timeInSeconds);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toFixed(2); // Keep two decimal places
    return `${minutes}min ${seconds}s`;
  };

  const handleEditClick = () => {
    navigate(`/agents/${agentId}`);
  };

  const columns = [
    {
      name: "Run Date/Time",
      selector: (row) => (
        <button
          className="whitespace-no-wrap overflow-hidden overflow-ellipsis w-full"
          onClick={() => {
            setSelectedRunId(row.run_id);
            setShow(true);
          }}
        >
          {formatDate(row?.created_at)}
        </button>
      ),
    },

    {
      name: "Run Duration (seconds)",
      selector: (row) => formatTimeInMinutes(row?.conversation_time),
    },
    {
      name: "Agent Voice Recording",
      cell: (row) => {
        setPlay(row?.recording_path);
        return (
          row?.recording_path && (
            <div className="w-full">
              <audio key={row?.recording_path} controls className="w-full py">
                <source src={row?.recording_path} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setSelectedRunId(row?.run_id);
              setShow(true);
            }}
          >
            <img src={eyeIcon} className="w-6" alt="View" />
          </button>
        </div>
      ),
      width: "150px",
      style: {
        textAlign: "right",
      },
    },
  ];

  return (
    <>
      {loading && <UploadLoader />}
      <div className="main flex-1 agentExecution_page">
        <div className="dashboard-container items-center">
          <div className="flex justify-between flexWrap">
            <div className="w-1/2 wFull">
              <h1 className="fs-30 fw-600 dashboard-title mb-4 capitalize">
                Agent Executions {agentName ? `, ${agentName}` : ""}
              </h1>

              <GetAllAgents
                onAgentChange={handleAgentChange}
                loading={loading}
                setLoading={setLoading}
                initialAgentId={agentId}
              />
            </div>
            {agentId && (
              <div className="flex gap-4 items-center w-1/2 justify-end wFull justifyStarts">
                <button
                  className="main-btn rounded-full"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
                <CallAgent agentID={agentId}
                />
              </div>
            )}
          </div>
          {agentId && apiStatus ? (
            <div className="tableData_execution mt-10">
              <DataTable
                columns={columns}
                data={response}
                customStyles={{
                  headCells: {
                    style: {
                      fontWeight: "bold",
                      fontSize: "14px",
                      backgroundColor: "#ccc",
                    },
                  },
                }}
              />
            </div>
          ) : (
            <p className="text-center mt-5">No agent executions found</p>
          )}
        </div>
        <ModalComponent
          customClass="agentExecution_page"
          handleClose={setShow}
          show={show}
          ModalHeading={agentName}
          ModalBody={<AgentExecution runId={selectedRunId} />}
        />
      </div>
    </>
  );
};

export default AgentExecutions;
