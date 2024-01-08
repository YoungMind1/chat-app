import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
    const {user} = useContext(AuthContext)
    const {currentChat, messages, isMessagesLoading} = useContext(ChatContext);
    const {recipientUser} = useFetchRecipientUser (currentChat, user);
    const [textMessage, setTextMessage] = useState("")

    console.log("text", textMessage);

    if (!recipientUser) return(
        <p style={{ textAlign: "center", width: "100%"}}>
            No Conversation selected yet...
        </p>
    );

    if (!isMessagesLoading) return(
        <p style={{ textAlign: "center", width: "100%"}}> 
            Loading Chat...
        </p>
    );

    return (
        <Stack gap={4} className="chat-box">
          <div className="chat-header">
              <strong>{recipientUser?.name}</strong>
          </div>
          <Stack gap ={3} className="messages">
            {messages && messages.map((messages, index) => (
             <Stack 
                key={index}  
                className ={`${
                    message?.senderId == user?._id
                    ? "message self align-self-end felx-grow-0" 
                    : "message align-self-start felx-grow-0"
                }`}
            >
                <span>{message.text}</span>
                <span className="message-footer">
                       {moment(message.createdAt).calendar()}
                </span>
             </Stack>
            ))}
          </Stack>
          <Stack direction="horizontal" gap="3" className="chat-input flex-grow-0">
                <InputEmoji 
                value= {textMessage} 
                onChange={setTextMessage} 
                frontFamily="nunito" 
                borderColor="rgba(72, 112, 223, 0.2" 
                />
          </Stack>
        </Stack>
    );
};

export default ChatBox;