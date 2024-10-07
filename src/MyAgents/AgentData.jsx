import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment/moment";
import DataTable from "react-data-table-component";
import debounce from "lodash.debounce";
import deleteIcon from "../assets/delete-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import eyeIcon from "../assets/eye.png";
import UploadLoader from "../Routes/UploadLoader";
import {
  agentData,
  agentDefaultData,
  createAgent,
  deleteAgent,
} from "../services/agentsApi";

const AgentData = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedAgentID, setSelectedAgentID] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (agentID) => {
    setShowModal(true);
    setSelectedAgentID(agentID);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (selectedAgentID) {
        const res = await deleteAgent(selectedAgentID);
        if (res.status === 200) {
          toast.success("Agent Deleted Successfully", { autoClose: 2000 });
          setData(data.filter((agent) => agent.agent_id !== selectedAgentID));
          setShowModal(false);
        } else {
          toast.error("Failed to delete agent");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (agentID) => {
    navigate(`/agents/${agentID}`);
  };

  const handleAgentIdClick = (agentIdNew) => {
    navigate(`/agentexecutions/${agentIdNew}`);
  };

  const columns = useMemo(
    () => [
      {
        name: "Agent Name",

        selector: (row) => (
          <button
            onClick={() => handleEdit(row.agent_id)}
            className="text-left"
          >
            {row.agent_config.agent_name}
          </button>
        ),
      },
      {
        name: "Created At",
        selector: (row) =>
          moment(row.agent_config.created_at).format("MMMM Do YYYY"),
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex gap-3">
            <button onClick={() => handleAgentIdClick(row.agent_id)}>
              <img src={eyeIcon} className="w-6" alt="View" />
            </button>
            <button onClick={() => handleEdit(row.agent_id)}>
              <img src={editIcon} className="w-5" alt="Edit" />
            </button>
            <button onClick={() => handleShowModal(row.agent_id)}>
              <img src={deleteIcon} className="w-5" alt="Delete" />
            </button>
          </div>
        ),
        width: "150px",
        style: {
          textAlign: "right",
        },
      },
    ],
    []
  );

  const fetchAgentsData = async () => {
    setLoading(true);
    try {
      const res = await agentData();
      if (res.status === 200) {
        if (res.data.length === 0) createDefaultAgent();
        setData(res.data);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to fetch agents");
    } finally {
      setLoading(false);
    }
  };

  const createDefaultAgent = async () => {
    try {
      setLoading(true);
      const getAgent = await agentDefaultData();
      if (getAgent.status === 200) {
        const { data } = getAgent;

        const defaultAgents = data.map((agent) => {
          const { agent_config } = agent;
          const { agent_prompts, ...restAgentConfig } = agent_config;
          delete restAgentConfig.default;
          delete restAgentConfig.user_id;
          return {
            agent_config: { ...restAgentConfig },
            agent_prompts: agent_prompts,
          };
        });
        await Promise.all(defaultAgents.map((agent) => createAgent(agent)));
        fetchAgentsData();
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to create default agents");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentsData();
    // createDefaultAgent();
  }, []);

  useEffect(() => {
    const debouncedFilter = debounce(() => {
      setFilteredData(
        data.filter(({ agent_config }) =>
          agent_config.agent_name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, 300);

    debouncedFilter();
    return () => {
      debouncedFilter.cancel();
    };
  }, [search, data]);

  const customTableStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#ccc",
      },
    },
  };

  return (
    <>
      {loading ? (
        <UploadLoader />
      ) : (
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          fixedHeader
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="w-25 form-control sm:w-full md:w-full"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
          subHeaderAlign="right"
          customStyles={customTableStyles}
        />
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this agent?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AgentData;
