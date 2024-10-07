import React, { useState, useEffect } from "react";
import {
  getAllCallLogs,
  deleteCallLog,
  getAllAgents,
} from "../services/agentsApi";
import UploadLoader from "../Routes/UploadLoader";
import DataTable from "react-data-table-component";
import CreateUpdateModal from "./components/createAndUpdateModal";
import deleteIcon from "../assets/delete-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import ModalComponent from "../components/Modal";
import { toast } from "react-toastify";
import LoggedIn from "../components/LoggedIn";
import api from "../services/api";
import { useAuth } from "@clerk/clerk-react";

const CallLogs = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [useremail, setUseremail] = useState("");
  const [userId, setUserId] = useState([]);
  const [data, setData] = useState([]);
  const { getToken } = useAuth();

  const handleUserEmail = (newemail) => {
    setUseremail(newemail);
  };
  const handleuserEmail = (userId) => {
    setUserId(userId);
  };

  const fetchAgentsData = async () => {
    try {
      const token = await getToken();
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await getAllAgents();
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Error fetching agent data:", error);
    }
  };

  const fetchCallLogs = async () => {
    if (!userId || !useremail) {
      console.warn("User ID or User Email is not set or empty.");
      return;
    }
    try {
      const res = await getAllCallLogs();
      let logs = res?.request.responseText
        ? JSON.parse(res?.request.responseText)?.records
        : [];
      logs = logs.filter((log) => log?.fields?.user_id === userId);
      setResponse(logs);
    } catch (error) {
      console.log("Error fetching call logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchAgentsData();
        if (userId) {
          await fetchCallLogs();
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    fetchData();
  }, [userId, useremail]);

  const refreshCallLogs = async () => {
    setLoading(true);
    await fetchCallLogs();
  };

  const customTableStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#ccc",
      },
    },
    cells: {
      style: {
        maxWidth: "100%", // Set a default max width for all cells
      },
    },
  };

  const editHandle = (id) => {
    setEditId(id);
    setShowModal(true);
  };

  const deleteModal = (id) => {
    setDeleteId(id);
    setDeleteShowModal(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteCallLog(deleteId);
      if (res?.status === 200) {
        toast.success("User Deleted", {
          autoClose: 3000,
          position: "top-right",
        });

        await fetchCallLogs();

        setDeleteShowModal(false);
        setEditId(null);
      }
    } catch (error) {
      console.error("Error deleting call log:", error);
      toast.error("Error Deleting Call Log", {
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const CloseModal = () => {
    setShowModal(false);
    setDeleteShowModal(false);
  };

  const columns = [
   
    {
      name: "Agent Name",
      selector: (row) => {
        const agent = data.find(
          (agent) => agent.agent_id === row?.fields?.agent_id
        );
        return agent ? agent.agent_config.agent_name : "-";
      },
    },
    {
      name: "Name",
      selector: (row) => row?.fields?.Name || "-",
    },
    {
      name: "Phone",
      selector: (row) => row?.fields?.phone || "-",
    },
    {
      name: "Created Date and Time",
      selector: (row) => {
        return row?.createdTime
          ? new Date(row.createdTime).toLocaleString()
          : "-";
      },
      sortable: true,
      sortFunction: (a, b) => {
        return new Date(b.createdTime) - new Date(a.createdTime);
      },
      defaultSortAsc: false,
    },
    {
      name: "Status",
      selector: (row) => row?.fields?.Status || "-",
    },
    {
      name: "Call Summary",
      selector: (row) => {
        return (
          <div className="tooltip1">
            {row.fields && row.fields.call_summary ? (
              row.fields.call_summary.length > 30 ? (
                <>
                  {`${row.fields.call_summary.substring(0, 30)}...`}
                  <span className="tooltiptext1">
                    {row.fields.call_summary}
                  </span>
                </>
              ) : (
                row.fields.call_summary
              )
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="flex gap-3">
          <button>
            <img
              src={editIcon}
              onClick={() => editHandle(row.id)}
              className="w-5"
              alt="Edit"
            />
          </button>
          <button>
            <img
              onClick={() => deleteModal(row.id)}
              src={deleteIcon}
              className="w-5"
              alt="Delete"
            />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading && <UploadLoader />}
      <div className="main flex-1">
        <LoggedIn onUseremail={handleUserEmail} onUserId={handleuserEmail} />
        <div className="dashboard-container items-center">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="fs-30 fw-600 dashboard-title mb-4 capitalize">
              Call Logs
            </h1>
            <button
              className="text-white colorPurple py-2 px-6 font-medium rounded-full border-0 btn btn-primary flex items-center gap-2.5"
              style={{ backgroundColor: "rgb(76, 29, 149)" }}
              onClick={() => setShowModal(true)}
            >
              Create Call Logs
            </button>
          </div>
          <div>
            <DataTable
              columns={columns}
              pagination
              paginationPerPage={15}
              fixedHeader
              highlightOnHover
              data={response}
              customStyles={customTableStyles}
              responsive={true}
              overflowY={true}
              noTableHead={false}
              defaultSortField="Created Date and Time"
            />
          </div>
        </div>
      </div>
      <CreateUpdateModal
        editId={editId}
        setEditId={setEditId}
        setShowModal={setShowModal}
        showModal={showModal}
        refreshCallLogs={refreshCallLogs}
        useremail={useremail}
        userId={userId}
      />
      <ModalComponent
        customClass="callLogDeleteModal"
        handleClose={CloseModal}
        show={deleteShowModal}
        ModalHeading=""
        ModalBody={
          <div>
            <h1 className="text-center text-2xl font-semibold my-2 md:my-8">
              Are you sure want to Delete
            </h1>
            <div className="flex gap-3 justify-content-center mt-4">
              <button
                onClick={handleDelete}
                style={{ backgroundColor: "rgb(76, 29, 149)" }}
                className="text-white colorPurple py-2 px-6 font-medium rounded-full border-0 btn btn-primary"
              >
                Delete
              </button>
              <button
                onClick={CloseModal}
                style={{ backgroundColor: "rgb(76, 29, 149)" }}
                className="text-white colorPurple py-2 px-6 font-medium rounded-full border-0 btn btn-primary"
              >
                Cancel
              </button>
            </div>
          </div>
        }
      />
    </>
  );
};

export default CallLogs;
