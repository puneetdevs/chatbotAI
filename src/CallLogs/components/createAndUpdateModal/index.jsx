import React, { useState, useEffect } from "react";
import ModalComponent from "../../../components/Modal";
import GetAllAgents from "../../../components/AllAgentsDropdown";
import UploadLoader from "../../../Routes/UploadLoader";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import {
  createCallLog,
  getCallLog,
  editCallLogs,
} from "../../../services/agentsApi";
import "../../index.css";

const CreateUpdateModal = ({
  setShowModal,
  showModal,
  editId,
  setEditId,
  refreshCallLogs,
  userId,
  useremail,
}) => {
  const [loading, setLoading] = useState(false);
  const [agentId, setAgentId] = useState("");
  const [formData, setFormData] = useState({
    agentId: "",
    name: "",
    phone: "",
    Status: "",
  });

  // Fetch call log data when editId changes
  useEffect(() => {
    if (editId) {
      const fetchCallLogData = async () => {
        try {
          setLoading(true);
          const res = await getCallLog(editId);
          setFormData({
            agentId: res?.data?.fields?.agent_id || "",
            name: res?.data?.fields?.Name || "",
            phone: res?.data?.fields?.phone || "",
            Status: res?.data?.fields?.Status || "",
          });
          setAgentId(res?.data?.fields?.agent_id || "");
        } catch (error) {
          console.error("Error fetching call log:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCallLogData();
    }
  }, [editId]);

  useEffect(() => {
    if (agentId) {
      setFormData((prevData) => ({
        ...prevData,
        agentId: agentId,
      }));
    }
  }, [agentId]);

  const handleAgentChange = (selectedAgentId) => {
    setFormData((prevData) => ({
      ...prevData,
      agentId: selectedAgentId,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Status") {
      setFormData((prevData) => ({
        ...prevData,
        Status: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (editId) {
        const recordId = editId;
        const updateData = {
          fields: {
            agent_id: formData.agentId,
            Name: formData.name,
            phone: formData.phone,
            Status: formData.Status,
          },
        };
        const res = await editCallLogs(recordId, updateData);
        if (res?.status === 200) {
          toast.success("Call Log Updated", {
            autoClose: 3000,
            position: "top-right",
          });
          setFormData({
            agentId: "",
            name: "",
            phone: "",
          });
          refreshCallLogs();
          setShowModal(false);
        }
      } else {
        const postData = {
          records: [
            {
              fields: {
                agent_id: formData.agentId,
                Name: formData.name,
                user_id: userId,
                user_email: useremail,
                phone: formData.phone,
                Status: "Todo",
              },
            },
          ],
        };
        const res = await createCallLog(postData);
        if (res?.status === 200) {
          toast.success("Call Log Created", {
            autoClose: 3000,
            position: "top-right",
          });
          setFormData({
            agentId: "",
            name: "",
            phone: "",
          });
          refreshCallLogs(); // Refresh call logs after creation
          setShowModal(false);
        }
      }
      // Close modal after submission
      setShowModal(false);
    } catch (error) {
      console.log(error, "error in call log");
      toast.error("Error in Call Log", {
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const CloseModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({
      agentId: "",
      name: "",
      phone: "",
    });
    setAgentId("");
  };

  return (
    <>
      {loading && <UploadLoader />}
      <ModalComponent
        customClass="callLogsModal"
        handleClose={CloseModal}
        show={showModal}
        ModalHeading={editId ? "Edit Call Log" : "Create Call Log"}
        ModalBody={
          <div className="flex gap-2 flex-wrap Agentform">
            <div className="w-full">
              <label>Agent Id</label>
              <GetAllAgents
                selectedAgentId={formData.agentId}
                onAgentChange={handleAgentChange}
                loading={loading}
                setLoading={setLoading}
                initialAgentId={agentId}
              />
            </div>
            <div className="w-full">
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label>Phone</label>
              <PhoneInput
                country="us"
                inputProps={{
                  autoFocus: true,
                  placeholder: "Search for a country...",
                }}
                enableSearch
                value={formData.phone}
                onChange={(value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    phone: value,
                  }))
                }
              />
            </div>
            {editId && (
              <div className="w-full">
                <label>Status</label>
                <Form.Select
                  name="Status"
                  onChange={handleChange}
                  value={formData.Status}
                  aria-label="Default select example"
                  className="focus:outline-none focus:shadow-none focus:border-transparent w-1/2 border border-gray-300"
                >
                  <option value="">Select Status</option>
                  <option value="Todo">Todo</option>
                  <option value="In progress">In progress</option>
                  <option value="Done">Done</option>
                </Form.Select>
              </div>
            )}
            <button
              onClick={handleSubmit}
              style={{ backgroundColor: "rgb(76, 29, 149)" }}
              className="text-white colorPurple py-2 px-6 font-medium rounded-full border-0 btn btn-primary flex items-center gap-2.5 ml-auto mt-4"
            >
              Submit
            </button>
          </div>
        }
      />
    </>
  );
};

export default CreateUpdateModal;
