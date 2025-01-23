import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [tokens, setTokens] = useState(null);
  console.log("userId", tokens);
  const getTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    const token = cookies.find((cookie) => cookie.startsWith("accessToken="));
    return token ? token.split("=")[1] : null;
  };

  const initializeUser = () => {
    const token = getTokenFromCookies();

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.userId) {
          setUserId(decoded.userId);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setTokens(token);
  };

  useEffect(() => {
    initializeUser();
  }, []);

  const login = (responseData) => {
    setUserId(responseData.userId);
    setTokens(responseData.token);
  };

  // const clearAllCookies = () => {
  //   document.cookie.split(";").forEach((cookie) => {
  //     const eqPos = cookie.indexOf("=");
  //     const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  //     document.cookie =
  //       name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  //   });
  // };

  const logout = async () => {
    setUserId(null);
    setTokens(null);
    // clearAllCookies();
  };

  return (
    <AuthContext.Provider
      value={{ userId, tokens, login, logout, initializeUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
