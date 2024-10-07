import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useAuth } from "@clerk/clerk-react";
import { getAllAgents } from "../../services/agentsApi";
import api from "../../services/api";

const GetAllAgents = ({
  onAgentChange,
  loading,
  setLoading,
  initialAgentId,
}) => {
  const [agentId, setAgentId] = useState("");
  const [data, setData] = useState([]);
  const { getToken } = useAuth();

  useEffect(() => {
    if (initialAgentId) {
      setAgentId(initialAgentId);
    }
  }, [initialAgentId]);

  const handleChange = (e) => {
    const selectedAgentId = e.target.value;
    const selectedAgentName =
      e.target.options[e.target.selectedIndex].getAttribute("data-name");
    setAgentId(selectedAgentId);
    onAgentChange(selectedAgentId, selectedAgentName);
  };

  const fetchAgentsData = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await getAllAgents();
      if (res.status === 200) {
        const sortedData=res?.data.sort((a,b)=>a?.agent_config?.agent_name.localeCompare(b?.agent_config?.agent_name));
        setData(sortedData);
      }
    } catch (error) {
      console.error("Error fetching agent data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentsData();
  }, []);

  useEffect(() => {
    fetchAgentsData();
  }, [agentId]);

  return (
    <>
      <Form.Select
        aria-label="Default select example"
        onChange={handleChange}
        value={agentId}
        className="focus:outline-none focus:shadow-none focus:border-transparent w-1/2 border border-gray-300"
      >
        <option value="">Select Agent</option>
        {data?.map((agent, index) => (
          <option
            key={index}
            value={agent.agent_id}
            data-name={agent.agent_config.agent_name}
          >
            {agent.agent_config.agent_name}
          </option>
        ))}
      </Form.Select>
    </>
  );
};

export default GetAllAgents;
