import{useEffect , useState }from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat , user) =>{
    const [recipientUser, setRecipientUser]= useState(null);
    const [error, setError]= useState(null);

    const recipientID = chat?.members?.find((id) => id !== user?._id);

    console.log("chat" , chat);

    useEffect(() => {

        const getUser = async () => {
            if(!recipientID) return null;

            const response = await getRequest(`${baseUrl}/users/find/${recipientID}` )


            if(response.error) {
                return setError(error);
            }


            setrecipientuser(response);
        
        };

        getuser()


    }, [recipientID]);

    return{recipientuser }
};