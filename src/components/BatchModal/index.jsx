import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import ModalComponent from "../Modal";
import { batchUpload } from "../../services/agentsApi";
import PhoneInput from "react-phone-input-2";


const BatchModal = ({ agentId }) => {
  const [show, setShow] = useState(false);
  const [upload, setUpload] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    batchName: "",
    fromNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onDrop = (acceptedFiles) => {
    // Here, acceptedFiles is an array of File objects
    const file = acceptedFiles[0];
    if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      setUpload(file);
      setUploadedFileName(file.name); // Set uploaded file name
      setError(null); // Clear any previous error
    } else {
      setError("Upload only .csv files");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleConfirm = async () => {
    try {
      const formData = new FormData();
      formData.append("agent_id", agentId);
      formData.append("file", upload);
      formData.append("batch_name", data.batchName);
      formData.append("from_number", data.fromNumber);


      await postBatches(formData);
    } catch (error) {
      console.error("Error uploading batch:", error);
    } finally {
      setShow(false);
    }
  };

  const postBatches = async (formData) => {
    try {
      const res = await batchUpload(formData);
      if (res.status === 200) {
        toast.success("Batch Upload Successfully");
      }
    } catch (error) {
      toast.error("Error uploading Batch");
    }
  };

  const resetUpload = () => {
    setUpload(null);
    setUploadedFileName(null);
    setError(null);
  };

  const handleRemoveFile = (event) => {
    event.stopPropagation();
    resetUpload();
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShow(true)}
        className="main-btn rounded-full"
      >
        Upload Batch
      </Button>

      <ModalComponent
        handleClose={setShow}
        ModalHeading="Upload Batch"
        show={show}
        ModalBody={
          <div>
            <p className="mb-4 mt-3">
              Select a CSV file to upload.
              <br />
              Make sure the phone numbers are under contact_number header.
            </p>
            <div
              {...getRootProps()}
              className="dropzone border border-gray-300 p-4 rounded-lg pointer"
            >
              <input
                {...getInputProps({ onClick: (e) => e.stopPropagation() })}
              />
              {isDragActive ? (
                <p>Drop the file here...</p>
              ) : uploadedFileName ? (
                <div className="flex items-center">
                  <p>{uploadedFileName}</p>
                  <button
                    className="ml-2 text-red-600"
                    onClick={handleRemoveFile}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <p>Drag 'n' drop a .csv file here, or click to select file</p>
              )}
              {error && <p className="text-red-600">{error}</p>}
            </div>

            <div className="mt-3">
              <label>Batch Name</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={data.batchName}
                name="batchName" // Corrected: name should be "batchName"
              />
            </div>
            <div className="mt-3 callModal_body callModal_body1">
              <label>From Number</label>{" "}
              <PhoneInput
                country="us"
                inputProps={{
                  autoFocus: true,
                  placeholder: "Search for a country...",
                }}
                enableSearch
                value={data.fromNumber}
                onChange={(value) =>
                  setData((prevData) => ({
                    ...prevData,
                    fromNumber: value, // Update fromNumber with the formatted phone number
                  }))
                }
              />
            </div>

            <Button
              variant="primary"
              onClick={handleConfirm}
              className="main-btn rounded-full table ml-auto mt-6 w-fit"
              style={{ backgroundColor: "#4c1d95", borderColor: "#4c1d95" }}
              disabled={!upload || error} // Disable confirm button if no file is selected or there's an error
            >
              Confirm
            </Button>
          </div>
        }
      />

      {/* <Button
        variant="primary"
        onClick={handleShow}
        className="main-btn rounded-full"
      >
        {ModalLabel}
      </Button> */}

      {/* <Modal show={show} onHide={handleClose} className="batchModal">
        <Modal.Header closeButton>
          <Modal.Title>Upload Batch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-4 mt-3">
            Select a CSV file to upload.
            <br />
            Make sure the phone numbers are under contact_number header.
          </p>
          <div
            {...getRootProps()}
            className="dropzone border border-gray-300 p-4 rounded-lg pointer"
          >
            <input
              {...getInputProps({ onClick: (e) => e.stopPropagation() })}
            />
            {isDragActive ? (
              <p>Drop the file here...</p>
            ) : uploadedFileName ? (
              <div className="flex items-center">
                <p>{uploadedFileName}</p>
                <button
                  className="ml-2 text-red-600"
                  onClick={handleRemoveFile}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <p>Drag 'n' drop a .csv file here, or click to select file</p>
            )}
            {error && <p className="text-red-600">{error}</p>}
          </div>

          <Button
            variant="primary"
            onClick={handleConfirm}
            className="main-btn rounded-full"
            style={{ backgroundColor: "#4c1d95", borderColor: "#4c1d95" }}
            disabled={!upload || error} // Disable confirm button if no file is selected or there's an error
          >
            Confirm
          </Button>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal> */}
    </>
  );
};

export default BatchModal;
