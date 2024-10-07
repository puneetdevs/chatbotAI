import React, { useState } from "react";
import MulitpleWorkspacePlaceHolder from "./MulitplePlaceHolder";
import MultipleWorkspace from "./MultipleWokspace";
import "./style.css";
import { useQuery } from "react-query";
import Workspace from "./WorkSpace";
import KnowledgeBase from "./KnowledgeBase";
import {
  createWorkspace,
  deleteWorkspace,
  fetchWorkSpace,
} from "../services/document";
import { toast } from "react-toastify";
import DeleteWorkspace from "./DelWorkSpace";

function Multiple() {
  const [isWorkspace, setIsWorkspace] = useState(false);
  const [isKnowledgeBase, setIsKnowledgeBase] = useState(false);

  const [delWorkspace, setDelWorkspace] = useState(false);
  const [workspace, setWorkspace] = useState({
    id: "",
    title: "",
    description: "",
    message: "",
  });

  const { data, refetch } = useQuery(["workspaces"], fetchWorkSpace, {
    retry: false,
  });
  const handleShowWorkspace = () => setIsWorkspace(true);
  const handleShowKnowledgeBase = () => {
    setIsKnowledgeBase(true);
  };
  const documents = data || [];

  const addWorkspace = async (payload) => {
    const workspaceResponse = await createWorkspace(payload);
    if (workspaceResponse.status === 200) {
      toast.success("Workspace created successfully");
      refetch();
      setIsWorkspace(false);
    }
    // refetch();
    // setIsWorkspace(false);
  };
  const handleDeleteWorkspace = async () => {
    const res = await deleteWorkspace(workspace.id);
    if (res.status === 200) {
      toast.success("Workspace deleted successfully");
      data.splice(
        documents.findIndex((doc) => doc.id === workspace.id),
        1
      );
      setDelWorkspace(false);
    }
  };

  return (
    <>
      <Workspace
        setPayload={addWorkspace}
        // workspace={workspace}
        show={isWorkspace}
        handleClose={() => setIsWorkspace(false)}
      />
      <DeleteWorkspace
        show={delWorkspace}
        handleClose={() => setDelWorkspace(false)}
        workspace={workspace}
        onSuccess={handleDeleteWorkspace}
      />
      <KnowledgeBase
        workspace={workspace}
        show={isKnowledgeBase}
        handleClose={() => setIsKnowledgeBase(false)}
      />

      {documents.length ? (
        <>
          <MultipleWorkspace
            workspaceData={setWorkspace}
            documents={documents}
            handleShowWorkspace={handleShowWorkspace}
            handleShowKnowledgeBase={handleShowKnowledgeBase}
            handleDeleteWorkspace={() => setDelWorkspace(true)}
          />
        </>
      ) : (
        <MulitpleWorkspacePlaceHolder
          handleShowWorkspace={() => {
            setIsWorkspace(true);
          }}
        />
      )}
    </>
  );
}

export default Multiple;
