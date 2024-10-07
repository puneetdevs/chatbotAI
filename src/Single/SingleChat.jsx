import React, { useState } from "react";
import Conversation from "../components/Conversation/Conversation";
import DocPreview from "./DocPreview";
import { ReactComponent as UploadCloud } from "../assets/upload-cloud.svg";
import { ReactComponent as EyeIcon } from "../assets/eye.svg";
import { ReactComponent as CrossCircle } from "../assets/cross-circle.svg";
import { useQueryClient } from "react-query";
import { deleteDocumentById } from "../services/document";
import { toast } from "react-toastify";
import { sendDocumentBotMessage } from "../services/chat";

function SingleChat(props) {
  const { document } = props;
  const [content, setContent] = useState([
    {
      type: 2,
      text: "Hello, Please enter your inquires related to the document.",
    },
  ]);
  const [isSendMessageLoading, setIsSendMessageLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const queryClient = useQueryClient();

  const onDelete = () => {
    if (!document) {
      return;
    }
    setIsDeleting(true);
    deleteDocumentById(document.id)
      .then((res) => {
        queryClient.invalidateQueries("singleDoc");
        setIsDeleting(false);
        toast.success("Document deleted Successfully");
      })
      .catch((e) => toast.error(e.message));
  };
  const onSend = async (text) => {
    setIsSendMessageLoading(true);
    setContent((state) => [...state, { type: 1, text }]);
    const resp = await sendDocumentBotMessage({
      documentId: document.id,
      text,
    });
    setContent((state) => [...state, { type: 2, text: resp.answer }]);
    setIsSendMessageLoading(false);
  };

  return (
    <>
      <div className="single_chat single-chat-container">
        <div className="d-flex">
          {isPreview ? (
            <div className="w-50">
              <DocPreview {...props} />
            </div>
          ) : (
            <></>
          )}
          <div className={isPreview ? "w-50" : "w-100"}>
            <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="btn-bot pdf_print"
              >
                {isPreview ? <CrossCircle /> : <EyeIcon />}
              </button>
              <button onClick={onDelete} className="btn-bot">
                <UploadCloud /> {isDeleting ? "Deleting..." : "New Doc"}{" "}
              </button>
            </div>
            <div className="container">
              <Conversation
                isPlaceHolder={false}
                onSend={onSend}
                content={content}
                docPreview={isPreview}
                conversationContainer={"singleChat-conversation-container"}
                classes={[
                  "from-singlechat-container",
                  "from-singlechat-content",
                ]}
                isSendMessageLoading={isSendMessageLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleChat;
