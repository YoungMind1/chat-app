import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setRegisterLoading] = useState(null);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  console.log("registerInfo", registerInfo);



  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = useCallback(async (e) => {
    e.preventDefault();
    setRegisterLoading(true)
    setRegisterError(null)
    const response = await postRequest(`${baseURL}/users/register`, JSON.stringify(registerInfo));
    setRegisterLoading(true)
    if (response.error) {
      return setRegisterError(response);
    }
    localStorage.setItem("User", JSON.stringify(response))
    setUser(response)
  }, [registerInfo]);



  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
