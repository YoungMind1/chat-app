import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginError, setloginError] = useState(null);
  const [isloginLoading, setIsloginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });


  useEffect(() => {
    const user = localStorage.getItem("User")
    setUser(JSON.parse(user));
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(async (e) => {
    e.preventDefault();
    setRegisterLoading(true)
    setRegisterError(null)

    const response = await postRequest(
      `${baseUrl}/users/register`,
      JSON.stringify(registerInfo)
    );

    setIsRegisterLoading(false);

    if (response.error) {
      return setRegisterError(response);
    }

    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  },
    [registerInfo]
  );

  const loginUser = useCallback(async (e) => {
    e.preventDefault()
    
    setIsloginLoading(true);
    setloginError(null);


    const response = await postRequest(
      `${baseUrl}/users/login`,
      JSON.stringify(loginInfo)
    );

    setIsloginLoading(false)

    if (response.error) {
      return setloginError(response);
    }

    localStorage.setItem("User", JSON.stringify(response))
    setUser(response);

  }, [loginInfo])

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null)
  }, [])



  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isloginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
