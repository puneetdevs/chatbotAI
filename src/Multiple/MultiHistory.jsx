import React, { useEffect, useRef, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import SimpleBar from "simplebar-react";
import { ReactComponent as SettingsIcon } from "../assets/cog.svg";
import { ReactComponent as SingleFileSvg } from "../assets/file.svg";
import { Icon } from "@iconify/react";

function MultiHistory(props) {
  const { onClearClick, onDeleteClick, handleShow, chatHistory, documents } =
    props;

  const navigate = useNavigate();
  const historyScrollRef = useRef(null);
  const params = useParams();

  const { document_id } = params;
  const documentId =
    document_id || (documents && documents?.length && documents[0].id);

  const [historyShow, setHistoryShow] = useState(false);

  const handleHistoryClose = () => setHistoryShow(false);
  const handleHistoryShow = () => setHistoryShow(true);

  const handleKnowledgeShow = () => handleShow();

  const onNewClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/multiple/${documentId}`);
  };

  const onConversationClick = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/multiple/${documentId}/${id}`);
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    onDeleteClick(id);
  };
  const onDocumentSelect = (document) => {
    navigate(`/multiple/${document.id}`);
  };

  useEffect(() => {
    if (historyScrollRef.current) {
      historyScrollRef.current.recalculate();
    }
  }, [historyScrollRef]); 
  return (
    <>
      <div className="d-none d-lg-block">
        <div className="chat-history multi-chat-history">
          <div className="model-select history-select mb-2">
            <Select
              options={documents}
              value={documents.find((d) => d.id == documentId)}
              getOptionLabel={(option) => option.title}
              getOptionValue={(option) => option.id}
              onChange={onDocumentSelect}
            />
            <div className="icon">
              <SingleFileSvg />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
            <div className="flex-1">
              <button onClick={handleKnowledgeShow} className="new-chat-btn">
                <div className="fs-16 mt-1">
                  <Icon icon="ic:baseline-plus"></Icon>
                </div>
                <div className="fs-12 fw-600">New knowledge base</div>
              </button>
            </div>
            <div className="">
              <button onClick={handleKnowledgeShow} className="knowledge-btn">
                <SettingsIcon />
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
            <div className="flex-1">
              <button onClick={handleKnowledgeShow} className="new-chat-btn">
                <div className="fs-12 fw-600">Add new Workspace</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-lg-none d-block">
        <a
          className="pointer fs-20 d-inline-block multiple-toggle-history-btn"
          onClick={handleHistoryShow}
        >
          <Icon icon="material-symbols:history"></Icon>
        </a>
      </div>

      <Offcanvas
        show={historyShow}
        onHide={handleHistoryClose}
        className="mob-history"
      >
        <Offcanvas.Header closeButton>
          {/* <Offcanvas.Title></Offcanvas.Title> */}
        </Offcanvas.Header>
        <Offcanvas.Body className="position-relative">
          <div className="chat-history multi-chat-history">
            <div className="model-select history-select mb-2">
              <Select
                options={documents}
                value={documents.find((d) => d.id == documentId)}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                onChange={onDocumentSelect}
              />
              <div className="icon">
                <SingleFileSvg />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
              <div className="flex-1">
                <button onClick={handleKnowledgeShow} className="new-chat-btn">
                  <div className="fs-16 mt-1">
                    <Icon icon="ic:baseline-plus"></Icon>
                  </div>
                  <div className="fs-12 fw-600">New knowledge base</div>
                </button>
              </div>
              <div className="">
                <button onClick={handleKnowledgeShow} className="knowledge-btn">
                  <SettingsIcon />
                </button>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MultiHistory;
