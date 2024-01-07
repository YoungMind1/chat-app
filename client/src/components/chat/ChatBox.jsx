import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const ChatBox = () => {
    const {user} = useContext(AuthContext)
    const {currentChat, messages, isMessagesLoading} = useContext(ChatContext)
    const {recipientUser} = useFetchRecipientUser (currentChat, user)

    if (!recipientUser) return(
        <p style={{ textAlign: "center", width: "100%"}}>
            No Conversation selected yet...
        </p>
    )
    return ( <>ChatBox</> );
}

export default ChatBox;