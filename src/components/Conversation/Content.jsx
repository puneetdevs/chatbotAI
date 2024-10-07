import React, { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import user from "../../assets/chat-user.png";
import gptLogo from "../../assets/gpt.png";
import matrixLogo from "../../assets/Icon_logo.svg";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { UserButton } from "@clerk/clerk-react";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { useLocation } from "react-router-dom";
import { getURL } from '../../utils/constants';
import "./placeholder.css";

function Content(props) {
  const { content, isSendMessageLoading = true } = props;
  const [userIcon, setUserIcon] = useState(false);
  const location = useLocation().pathname;
  const messagesRef = useRef(null);
  const handleNewMessage = () => {
    messagesRef?.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (location.split("/")[1] === "share") {
      setUserIcon(true);
    } else {
      setUserIcon(false);
    }
  }, [location]);

  useEffect(() => {
    handleNewMessage(); // Scroll to bottom initially
  }, [content.length, isSendMessageLoading]);
  return (
    <>
      {/* <SimpleBar ref={historyScrollRef} forceVisible="y" style={{ maxHeight: 600 }} autoHide={false}> */}
      {/* <div className="chat_data_list"> */}
      <div className="chat-scroll">
        {content.map((contentItem, index) => {
          return (
            <div className="chat-content" key={index}>
              {contentItem.type === 1 ? (
                <div className="user-chat-conversation">
                  <div className="user-img">
                    {userIcon ? (
                      <img src={user} />
                    ) : (
                      <UserButton afterSignOutUrl="/" />
                    )}
                  </div>
                  <div className="user-message">
                    <Markdown
                      rehypePlugins={[rehypeRaw, rehypeSanitize, remarkGfm]}
                    >
                      {contentItem.text}
                    </Markdown>
                  </div>
                </div>
              ) : (
                <div className="ai-chat-conversation">
                  <div className="ai-img">
                    {/* <img src={isGpt ? gptLogo : matrixLogo} /> */}
                    <img src={props?.content[0]?.avatar ? getURL(props?.content[0]?.avatar) : matrixLogo} />
                  </div>
                  <div className="ai-message">
                    <Markdown
                      rehypePlugins={[rehypeRaw, rehypeSanitize, remarkGfm]}
                    >
                      {contentItem.text}
                    </Markdown>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {isSendMessageLoading ? (
          <div className="message-loader ms-3 ms-lg-0"></div>
        ) : (
          <></>
        )}
        <div ref={messagesRef}></div>
      </div>
      {/* </div> */}
      {/* </SimpleBar> */}
    </>
  );
}

export default Content;
