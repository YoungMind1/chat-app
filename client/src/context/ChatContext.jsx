import { createContext, useState, useEffect, useCallback } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import {io} from "socket.io-client"

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialchats , setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [isMessagesLoading, setIsMessagesLoading] = useState(false)
    const [messagesError, setMessagesError] = useState(null)
    const [sendTextmessageError, setSendMessageError] = useState(null)
    const [newMessage, setNewMessage] = useState(null)
    const [socket, setSocket] = useState(null);

    console.log("messages", messages)

    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [user]);


    useEffect(() => {
        if (socket === null) {
            return;
        }

        socket.emit("addNewUser", user?._id);
    }, [socket]);


    useEffect(()  =>{

        const getUsers = async() => {
            const response = await getRequest(`${baseUrl}/Users}`);
            if(response.error){
                return console.log("Error fetching users" , response);
            
            }


            const pChats = response.filter((u) =>{
                let isChatsCreated = false;

                if(user?._id === u.id) return false;

                if(userChats){
                   isChatsCreated = userchats?.some((chat) =>{
                        return chat.nembers[0] === u._id || chat.members[1] === u._id
                    });
                }

                return !isChatsCreated;
            });


            setPotentialChats(pChats)
        };


        getUsers();

    }, [userChats]);


    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {

                setIsUserChatsLoading(true)
                setUserChatsError(null)

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`)

                setIsUserChatsLoading(false)

                if (response.error) {
                    return setUserChatsError(response)
                }

                setUserChats(response)
            }
        };

        getUserChats();
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {

                setIsMessagesLoading(true)
                setMessagesError(null)

                const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`)

                setIsMessagesLoading(false)

                if (response.error) {
                    return setMessagesError(response)
                }

                setMessages(response)
        };

        getMessages();
    }, [currentChat]);


    const sendTextMessage  = useCallback(async(textMessage, sender, currentChatId, setTextMessage) =>{
        if(!textMessage) return console.log("You must type something...")

        const response = await postRequest(
            `&{baseUrl}/messages`, 
            JSON.stringify({
            chaId: currentChatId,
            senderId: sender._id,
            text: textMessage
        })
        );

        if (response.error) {
            return setsendTextmessageError(response);
        }

        setNewMessage(response)
        setMessages((prev) => [...prev, response])
        setTextMessage("")

    },
     []
     );


    const updateCurrentChat = useCallback((chat)=>{
        setCurrentChat(chat)
    }, [])

    const creatChat = useCallback(async(firstId, secondId) =>{
        const response = await postRequest(
            `${baseUrl}/chats`,
            JSON.stringify({
                firstId,
                secondId,
            })

            
        
        );

        if(response.error){
            return console.log("Error creating chat" ,response)
        }

        setUserChats((prev) => [...prev, response]);
  
    },[]);

    return (
        <ChatContext.Provider
            value={{
                userChats,
                isUserChatsLoading,
                userChatsError,
                potentialchats,
                creatChat,
                updateCurrentChat,
                messages,
                isMessagesLoading,
                messagesError,
                currentChat,
                sendTextMessage,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};