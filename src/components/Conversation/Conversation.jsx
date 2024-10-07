// @ts-nocheck
import React, { useRef, useState, useEffect } from "react";
import Placeholder from "./Placeholder";
import Content from "./Content";
import { ReactComponent as PlaneSvg } from "../../assets/plane.svg";
import useAutoHeightInput from "../../hooks/useAutoHeightInput";

function Conversation(props) {
  const {
    content,
    onSend,
    isPlaceHolder = true,
    onSave,
    isSave = false,
    docPreview = false,
    classes = "",
    placeholderContainer = "",
    conversationContainer = "",
  } = props;
  const [localContent, setLocalContent] = useState(content);
  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const [text, setText] = useState();
  const textAreaRef = useRef(null);

  useAutoHeightInput(textAreaRef.current, text);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length >= 500) {
      return;
    }
    setText(newValue);
  };

  const onSendClick = () => {
    onSend(text);
    setText("");
    if( typeof localContent === 'undefined'){
        setLocalContent([{text:text, type:1}])
      }
    else{
      setLocalContent([...localContent,{text:text, type:1}])
    };
  };

    return (
    <div className={`chat_box_parent conversation-container ${conversationContainer}`} >
      <div className="chat_data_list">
      {localContent?.length ? (
        <Content {...props} content={localContent}/>
      ) : isPlaceHolder ? (
        <Placeholder {...props} />
      ) : (
        <div className={`d-flex flex-column placeholder-container`}></div>
      )}
      </div>

      {/* <div className="container"> */}
      <div className="chat_box_footer">
        <div className="d-flex chat_box_footer_1">
          <textarea
            className={
              (text?.length === 0 || text == null) && "overflow-none"
            }
            ref={textAreaRef}
            id="textInput"
            rows={1}
            value={text}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => {
              if (e.key == "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSendClick();
              }
            }}
          ></textarea>
          <button onClick={onSendClick} className="send-btn">
            <PlaneSvg />
          </button>
        </div>

        {isSave && (
          <button onClick={onSave} className="save-btn">
            <div className="fs-16 mt-2">
              <iconify-icon icon="mdi:tick"></iconify-icon>
            </div>
            <div className="fs-14 fw-500">Save</div>
          </button>
        )}

      </div>
      <p className="chat_info text-center">AIchat may display inaccurate information, including about people, so double-check its responses.</p>
    </div>
    // </div>
  );
}

export default Conversation;
