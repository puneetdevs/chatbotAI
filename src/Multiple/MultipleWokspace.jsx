// @ts-nocheck
import React, { useEffect, useState } from "react";
import { ReactComponent as SettingsIcon } from "../assets/cog.svg";
import { ReactComponent as TrashIcon } from "../assets/trash.svg";
import { Icon } from "@iconify/react";
import Upload from "../components/Upload";
import { toast} from "react-toastify";  
import { DOCUMENT_TYPE } from "../utils/constants";
import { useQueryClient } from "react-query";
import uploadToS3 from "../utils/uploadToS3"
import {
  createDocument,
  createWebsite,
  deleteDocumentById,
  fetchMulti,
} from "../services/document";

function MultipleWorkspace(props) {
  const {
    documents,
    handleShowWorkspace,
    // handleShowKnowledgeBase,
    workspaceData,
    handleDeleteWorkspace,
  } = props;
  const [showKnowledgeBase, setShowKnowledgeBase] = useState(false)
  const handleWorkspace = () => handleShowWorkspace();
  const [workspaceDocuments, setWorkspaceDocuments] = useState([]);
  const [isUploading, setIsUplaoding] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [websiteList, setWebsiteList] = useState([]);
  const queryClient = useQueryClient();
  const [file, setFile] = useState(null);
  const [URL, setURL] = useState("");
  const [workspace, setWorkspace] = useState({
    id: "",
    title: "",
    description: "",
    message: "",
  });
const [isCrawl, setIsCrawl] = useState(false);
  const handleKnowledgeBase = (doc) => {
    setWorkspace(doc);
    // handleShowKnowledgeBase();
    setSelectedDocumentId(doc.id);
    setShowKnowledgeBase(true)
    workspaceData(doc);
  };
  const deleteWorkspace = (doc) => {
    handleDeleteWorkspace();
    workspaceData(doc);
  };
  const fetchDocuments = async (id) => {
    const response = await fetchMulti(id);
    if (response.status === 200) {  
      setWorkspaceDocuments(response.data.data);
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

     await createDocument(values); 
      setIsUplaoding(false);
      setFile(null);
      queryClient.invalidateQueries("multiDocs");
      toast.success("Sharebot created Successfully");
    } catch (error) {
      toast.error("Error creating Sharebot");
    }
    finally {
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
        setWorkspaceDocuments(workspaceDocuments.filter((doc) => doc.id !== id));
        queryClient.invalidateQueries("multiDocs");
        toast.success("Document deleted Successfully");
      })
      .catch((e) => toast.error(e.message));
  };

  const handleUrlChange = async(inputUrl) => {
    try{
      setIsCrawl(false);
      if(!inputUrl) return;
      const validUrl = inputUrl.startsWith('http://') || inputUrl.startsWith('https://')
        ? inputUrl
        : `http://${inputUrl}`;

      setURL(validUrl);
      const body = {
        url: validUrl,
        match: `${validUrl}/**`,
        selector: "#content",
        max_pages_to_crawl: 1,
        workspace_id: workspace.id,
      };
      const response = await createWebsite(body);
      if (response.status === 200) {
        toast.success("Crawling in Background !");
        setIsCrawl(true);
      }    

    }catch(e){
      toast.error("Error while Crawling Website");
    }
  }

  const fetchWebsites = async (id) => {
    const response = await fetchUrls(id);
    if (response.status === 200) { 
      setWorkspaceDocuments(response.data.data);
    }
  };
  



  useEffect(() => {
    if (!workspace.id) return;
    fetchDocuments(workspace.id);
  }, [workspace,file]);

  useEffect(() => {
    if (documents.length > 0) {
      const firstDocument = documents[0];
      setSelectedDocumentId(firstDocument.id);
      // Call handleKnowledgeBase to manage the selected document
      handleKnowledgeBase(firstDocument);
    }
  }, [documents]);

  return (
    <div className="d-flex multiple_chat">
      <div className="d-none d-lg-block">
        <div className="chat-history multi-chat-history">
          {documents.map((doc) => {
            const isSelected = doc.id === selectedDocumentId;
            return (
              <div
                key={doc.id}
                className="d-flex align-items-center justify-content-between gap-2 mb-2"
              >
                <div className="flex-1">
                  <button
                    onClick={() => handleKnowledgeBase(doc)}
                    className={`new-chat-btn ${isSelected ? 'selected-button' : ''}`}
                  >
                    <div className="fs-12 fw-600">{doc.title}
                    </div>
                  </button>
                </div>
                <div className="">
                  <button
                    className="knowledge-btn"
                    onClick={() => deleteWorkspace(doc)}
                  >
                    <TrashIcon />
                  </button>
                </div>
                <div className="">
                  <button
                    className="knowledge-btn"
                    onClick={() => handleKnowledgeBase(doc)}
                  >
                    <SettingsIcon />
                  </button>
                </div>
              </div>
            );
          })}
          <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
            <div className="flex-1">
              <button onClick={handleWorkspace} className="new-chat-btn">
                <div className="fs-16 mt-1">
                  <Icon icon="ic:baseline-plus"></Icon>
                </div>
                <div className="fs-12 fw-600">Add New Workspace</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <>
        {showKnowledgeBase && workspace.id &&
          <div className="container">
            <br />
            <div className="workspaceTitle">
              {workspace.title !== ""
                  ? `Manage ${workspace.title} Workspace`
                  : "Knowledge Base"}
            </div>
            <br />
            <div className="upload">
              <Upload
                uploaderCardWidth={"80%"}
                uploaderCardHeight={"420px"}
                uploadTitle={false}
                scrollMaxHeight={"150px"}
                documents={workspaceDocuments}
                urlLists={workspaceDocuments}
                webPage={false}
                onDocumentDelete={onDocumentDelete}
                onCreateClick={onCreateClick}
                handleUrlChange={handleUrlChange}
                file={file}
                setFile={setFile}
                uploading={isUploading}
                isCrawl={isCrawl}
                // {...props}
              />
            </div>
          </div>}
      </>
    </div>
  );
}

export default MultipleWorkspace;