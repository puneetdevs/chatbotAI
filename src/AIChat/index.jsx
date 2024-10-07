import React, { useState, useEffect } from "react";
import History from "./History";
import Select from "react-select";
import Conversation from "../components/Conversation/Conversation";
import "./style.css";
import {
  createConversation,
  deleteConversation,
  fetchChat,
  fetchConversations,
  sendMessage,
} from "../services/chat";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchWorkSpace } from "../services/document";

const versions = [
  { value: "chatgpt3", label: "GPT 3.5-Turbo", disabled: false },
  { value: "llama-3", label: "Meta Llama 3", disabled: false },
  { value: "mixtral", label: "Mixtral 8x7b", disabled: false },
  { value: "chatgpt4", label: "GPT-4", disabled: true },
];

function AIChat() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [version, setVersion] = useState(versions[0]);
  const [isSendMessageLoading, setIsSendMessageLoading] = useState(false);
  let { conversation_id } = useParams();
  const { data: aiChatConversations } = useQuery("aichat-conversations", () =>
    fetchConversations()
  );
  const history = aiChatConversations?.data;
  const { data: contentData } = useQuery(
    ["aichat-content", conversation_id],
    () => fetchChat(conversation_id)
  );
  const [workspace, setWorkspace] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState();
  const getAllWorkspace = async () => {
    const data = await fetchWorkSpace();
    setWorkspace(
      data?.map((item) => ({
        id: item.id,
        value: item.id,
        label: item.title,
      }))
    );
  };
  useEffect(() => {
    getAllWorkspace();
  }, []);
  const handleWorkspace = (selectedOption) => {
    setSelectedWorkspace(selectedOption);
  };

  const content = contentData?.data;
  const onSend = async (text) => {
    try {
      setIsSendMessageLoading(true);
      if (!conversation_id) {
        const newConversation = await createConversation(text); // Replace with your API call
        conversation_id = newConversation.data.conversation_id;
        navigate(`${conversation_id}`);
      }

      const newMessage = await sendMessage({
        conversationId: conversation_id,
        text,
        chatGPTType: version.value,
        workspace_Id: selectedWorkspace?.value,
      }); // Replace with your API call
      // save response to the content
      queryClient.invalidateQueries("aichat-content");
      queryClient.invalidateQueries("aichat-conversations");
      setIsSendMessageLoading(false);
    } catch (error) {
      return error;
    }
  };

  const deleteItemMutation = useMutation((id) => deleteConversation(id), {
    onMutate: async (id) => {
      // Cancel any outgoing refetches while the mutation is in progress
      await queryClient.cancelQueries("aichat-conversations");

      // Snapshot the current state of the items query
      const previousItems = queryClient.getQueryData("aichat-conversations");

      // Optimistically update the local state to reflect the deletion
      queryClient.setQueryData("aichat-conversations", (oldItems) => {
        oldItems.data = oldItems.data.filter(
          (item) => item.conversation_id !== id
        );
        return oldItems;
      });

      // Return a function to rollback the optimistic update if the mutation fails
      return () =>
        queryClient.setQueryData("aichat-conversations", previousItems);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries("aichat-conversations");
      const { id } = data; // Assuming the response contains the conversation_id

      if (id === conversation_id) {
        // Navigate to another page
        history.push("/another-page");

        // Invalidate and refetch the 'aichat-content' query after successful deletion
        queryClient.invalidateQueries("aichat-content");
      }
      navigate("/chat");
    },
  });
  const onClearClick = () => {
    history.map((h) => deleteItemMutation.mutate(h.conversation_id));
  };
  const onDeleteClick = (id) => {
    deleteItemMutation.mutate(id);
  };

  const customStyles = {
    // Add styles for the selected item
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        state.isFocused || state.isSelected ? "#0f172a" : "white",
      color: state.isSelected ? "#fff" : "#ccc",
      cursor: state.isDisabled ? "not-allowed" : "default",
    }),
  };

  return (
    <div className="d-flex chatbot_wrapper">
      <History
        chatHistory={history}
        onClearClick={onClearClick}
        onDeleteClick={onDeleteClick}
        conversation_id={conversation_id}
      />
      <div className="flex-1 chat-container chat-container-custom">
        <div className="flex-1">
          <div className="model-select">
            <Select
              options={versions}
              styles={customStyles}
              defaultValue={version}
              value={version}
              onChange={setVersion}
              isOptionDisabled={(option) => option.disabled}
            />
          </div>
          {workspace && workspace.length > 0 && (
            <div className="model-select ms-1">
              <Select
                options={workspace}
                styles={customStyles}
                defaultValue={workspace[0]}
                value={selectedWorkspace}
                onChange={handleWorkspace}
                isOptionDisabled={(option) => option.disabled}
              />
            </div>
          )}
          <div className="chat_home">
            <Conversation
              onSend={onSend}
              content={content}
              isSendMessageLoading={isSendMessageLoading}
              conversationContainer={"aiChat-conversation-container"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIChat;
