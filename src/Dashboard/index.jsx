import React, { useState, useEffect } from "react";
import UploadLoader from "../Routes/UploadLoader";
import { getDashBoardData } from '../../src/services/agentsApi';
import { useAuth } from "@clerk/clerk-react";
import "./style.css";
import "../index.css";
import api from "../services/api";
import useUserAuth from "../hooks/useUserAuth";
import { createWorkspace } from "../services/document";
import { useQuery } from "react-query";
import { fetchWorkSpace } from "../services/document";
import DashboardComponent from "./dashboard";

function Dashboard() {
  const { user } = useUserAuth();
  const {getToken}=useAuth();
  const fullName = user?.fullName;
   
  const { data, refetch } = useQuery(["workspaces"], fetchWorkSpace, {
    retry: false,
  });

  const [workspaceCreated, setWorkspaceCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);

  const DashBoardData = async () => {
    setLoading(true)
    try {
      const token = await getToken();
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await getDashBoardData();
      if (res.status === 200) {
        setLoading(false)
        setResponse(res?.data)
      }
    } catch (error) {
      console.log("error from dashboard api--", error);
      setLoading(false);

    }
    finally{
      setLoading(false);
    }

  };


  const createTestWorkspace = () => {
    if (!workspaceCreated && data && (data.length == 0)) {
      // Set a timeout to delay the execution of the function
      setTimeout(async () => {
        try {
          const payload = {
            id: "",
            title: fullName ? fullName : "WorkSpace",
            description: "",
            message: "",
          };
          const workspaceResponse = createWorkspace(payload);
          setWorkspaceCreated(true);
          refetch();
        }
        catch (error) {
          console.error("Error creating workspace:", error);
        }
      }, 2000);
    }
  };

  useEffect(() => {
    createTestWorkspace();
    DashBoardData();
  }, [data]);

  return (
    <>
      {loading && <UploadLoader />}
      <div className="dashboard-container">
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="d-flex flex-column">
            <div className="fs-30 fw-600 dashboard-title">
              Welcome back, {fullName}
            </div>
            <div className="fs-16 fw-400 dashboard-sub-title">
              Take a Look on your awesome dashboard
            </div>
          </div>
        </div>
        <div className="mb-5">
          <DashboardComponent response={response}/>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
