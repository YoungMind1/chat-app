import { createContext, useCallback, useEffect, useState } from "react";

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

  useEffect(() => {
    const user = localStorage.getItem("User")
    setUser(JSON.parse(user));
  }, []);

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

const logoutUser = useCallback(()=>{
  localStorage.removeItem("User");
  setUser(null)
})

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
