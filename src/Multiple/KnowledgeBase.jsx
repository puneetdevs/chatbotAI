import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Upload from "../components/Upload";
import { useQueryClient } from "react-query";
import uploadToS3 from "../utils/uploadToS3";
import { DOCUMENT_TYPE } from "../utils/constants";
import { toast } from "react-toastify";
import {
  createDocument,
  deleteDocumentById,
  fetchMulti,
} from "../services/document";
function KnowledgeBase(props) {
  const { show, handleClose, workspace } = props;
  const [documents, setDocuments] = useState([]);
  const queryClient = useQueryClient();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUplaoding] = useState(false);

  const fetchDocuments = async (id) => {
    const response = await fetchMulti(id);
    if (response.status === 200) {
      setDocuments(response.data.data);
    }
  };
  const onCreateClick = async (file) => {
    if (!file) {
      return;
    }
    setIsUplaoding(true);
    try {
      const path = await uploadToS3(file);
      const values = {
        name: file.name,
        path,
        type: DOCUMENT_TYPE.multiple,
        workspace_id: workspace.id,
      };

      const response = await createDocument(values);
      setIsUplaoding(false);
      setFile(null);
      queryClient.invalidateQueries("multiDocs");

      toast.success("Sharebot created Successfully");
    } catch (error) {
      toast.error("Error creating Sharebot");
    } finally {
      setIsUplaoding(false); // Reset uploading state unconditionally
      setFile(null);
    }
  };
  const onDocumentDelete = (id) => {
    if (!id) {
      return;
    }
    deleteDocumentById(id)
      .then((res) => {
        setDocuments(documents.filter((doc) => doc.id !== id));
        queryClient.invalidateQueries("multiDocs");
        toast.success("Document deleted Successfully");
      })
      .catch((e) => toast.error(e.message));
  };

  useEffect(() => {
    if (!workspace.id) return;
    fetchDocuments(workspace.id);
  }, [workspace, file]);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={true}
      centered
      className="sharebot-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {workspace.title1 !== ""
            ? `Manage ${workspace.title} Workspace`
            : "Knowledge Base"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <Upload
          uploaderCardWidth={"100%"}
          uploaderCardHeight={"600px"}
          uploadTitle={false}
          scrollMaxHeight={"150px"}
          documents={documents}
          onDocumentDelete={onDocumentDelete}
          onCreateClick={onCreateClick}
          file={file}
          setFile={setFile}
          uploading={isUploading}
          {...props}
        />
      </Modal.Body>
    </Modal>
  );
}

export default KnowledgeBase;
