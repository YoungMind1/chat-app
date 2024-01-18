import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("User")
    setUser(JSON.parse(user));
  }, []);

  const registerUser = async (e) => {
    e.preventDefault();
    setIsRegisterLoading(true)
    setRegisterError(null)

    const response = await postRequest(
      `${baseUrl}/users/register`,
      JSON.stringify({
        name: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value
      })
    );

    setIsRegisterLoading(false);

    if (response.error) {
      return setRegisterError(response);
    }

    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  };

  const loginUser = async (e) => {
    e.preventDefault()
    
    setIsLoginLoading(true);
    setLoginError(null);

    const response = await postRequest(
      `${baseUrl}/users/login`,
      JSON.stringify({
        email: e.target[0].value,
        password: e.target[1].value
      })
    );

    setIsLoginLoading(false)

    if (response.error) {
      return setLoginError(response);
    }

    localStorage.setItem("User", JSON.stringify(response))
    setUser(response);

  }

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null)
  }, [])



  return (
    <AuthContext.Provider
      value={{
        user,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        loginError,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
