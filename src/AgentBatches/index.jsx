import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import BatchModal from "../components/BatchModal";
import GetAllAgents from "../components/AllAgentsDropdown";
import UploadLoader from "../Routes/UploadLoader";
import { getBatchesList } from "../services/agentsApi";

const AgentBatches = () => {
  const { id } = useParams();
  const [agentId, setAgentId] = useState(id || "");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);

  const handleAgentChange = (selectedAgentId) => {
    setAgentId(selectedAgentId);
  };

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await getBatchesList();
  //     setResponse(res.data);
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [agentId]);



  // Define table columns
  const columns = [
    {
      name: "Agent ID",
    },
    {
      name: "Run Duration (seconds)",
    },
    {
      name: "Run Date",
    },
  ];

  return (
    <>
      {loading && <UploadLoader />}
      <div className="main flex-1"> 
        <div className="dashboard-container items-center agentBatches_container">
          <div className="flex justify-between mb-3 flexWrap">
            <div className="w-1/2 wFull">
              <h1 className="fs-30 fw-600 dashboard-title mb-4 capitalize">
                Agent batches
              </h1>
              <GetAllAgents
                onAgentChange={handleAgentChange}
                loading={loading}
                setLoading={setLoading}
              />
            </div>
            {agentId && (
              <div className="flex gap-4 items-center w-1/2 wFull justify-end justifyStarts">
                <BatchModal agentId={agentId} />
              </div>
            )}
          </div>
          {agentId && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default AgentBatches;
