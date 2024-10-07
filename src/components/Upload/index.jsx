import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import SimpleBar from "simplebar-react";
import { ReactComponent as UploadIcon } from "../../assets/Upload-icon.svg";
import { ReactComponent as UploadCloud } from "../../assets/upload-cloud.svg";
import { ReactComponent as CrossCircle } from "../../assets/cross-circle.svg";
import { ReactComponent as FeaturedFileIcon } from "../../assets/featured-file.svg";
import { ReactComponent as WebsiteIcon } from "../../assets/website-icon.svg";
import { ReactComponent as TrashSvg } from "../../assets/trash.svg";
import getFileMB from "../../utils/getFileMB";
import Dropzone from "react-dropzone";
import FileRow from "../FileRow";
import UploadLoader from "../../Routes/UploadLoader";

function Upload(props) {
  const {
    documents,
    uploading,
    file,
    setFile,
    onDocumentDelete,
    onCreateClick,
    onUploadSuccess,
    onCreateLoading,
    uploadTitle = true,
    uploaderCardWidth = "576px",
    uploaderCardHeight = "420px",
    scrollMaxHeight = "400px",
    handleUrlChange,
    isCrawl,
    urlLists,
  } = props; // It will Be called when progress got 100%
  const historyScrollRef = useRef();
  const [] = useState(null);
  const [urlType, setUrlType] = useState("website"); // Initial selection
  const [url, setUrl] = useState("");

  const handleTypeChange = (event) => {
    setUrlType(event.target.value);
  };

  useEffect(() => {
    if (isCrawl) {
      setUrl("");
    }
  }, [isCrawl]);

  useEffect(() => {
    if (historyScrollRef?.current) {
      // @ts-ignore
      historyScrollRef?.current?.recalculate();
    }
  }, [historyScrollRef]);
  return (
    <>
      <div
        className="uploader-card"
        style={{
          width: uploaderCardWidth,
          height: uploaderCardHeight,
          position: "relative",
        }}
      >
        <div className="title-files">
          <h1> My Files</h1>
        </div>

        {!file ? (
          <>
            {uploadTitle && (
              <div className="primary-heading">Upload your file</div>
            )}
            <Dropzone
              accept={{
                "application/pdf": [".pdf"],
                "application/msword": [".doc", ".docx"],
                "application/vnd.ms-powerpoint": [".ppt", ".pptx"],
              }}
              onDrop={(acceptedFiles) => {
                const file = acceptedFiles[0];
                if (file.type != "application/pdf") {
                  return toast.error(
                    "File type is not supported! Please upload a PDF file"
                  );
                }
                setFile(file);
                onCreateClick(file);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <>
                  <div {...getRootProps()} className="uploader-box">
                    <input {...getInputProps()} type="file" />
                    <UploadIcon />
                    <div className="bold-heading">
                      Drag & drop files or <u>Browse</u>
                    </div>
                    <div className="normal-text">
                      Supported formats: PDF, DOC, DOCX & PPT
                    </div>
                  </div>
                  <div className="secondary-heading">
                    Start by uploading a file
                  </div>
                </>
              )}
            </Dropzone>
          </>
        ) : (
          <>
            <div className="upload_text">
              <UploadLoader />
              <p>Please Wait ....</p>
            </div>
          </>
        )}
        {documents && documents.length ? (
          <div style={{ width: "98%" }}>
            <SimpleBar
              ref={historyScrollRef}
              forceVisible="y"
              style={{ maxHeight: scrollMaxHeight }}
              autoHide={false}
            >
              {documents
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                .map((document, index) => (
                  <div
                    className="d-flex align-items-center justify-content-between w-100 mb-3 pe-4"
                    key={index}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <FeaturedFileIcon />
                      <div className="d-flex flex-column">
                        <div className="fs-14 fw-500 text-blue-100">
                          {document.name}
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => onDocumentDelete(document.id)}
                        type="button"
                        className="btn-link"
                      >
                        <TrashSvg />
                      </button>
                    </div>
                  </div>
                ))}
            </SimpleBar>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div
        className="url-link"
        style={{ width: "80%", height: "auto", marginTop: "20px" }}
      >
        <div className="title-website">
          <h1>Websites</h1>
        </div>
        <div className="container">
          <div className="url-box">
            <span className="box-text">Start URLs</span>

            <input
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder={
                urlType === "website"
                  ? "Enter website URL here.."
                  : "Enter webpage link here.."
              }
            />
            <select value={urlType} onChange={handleTypeChange}>
              <option value="website">Website</option>
              <option value="webpage">Webpage</option>
            </select>
          </div>
          <button onClick={() => handleUrlChange(url)} className="add-button">
            Add
          </button>
        </div>

        {urlLists && urlLists.length ? (
          <div className="w-100 ">
            <SimpleBar
              ref={historyScrollRef}
              forceVisible="y"
              style={{ maxHeight: scrollMaxHeight }}
              autoHide={false}
            ></SimpleBar>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Upload;
