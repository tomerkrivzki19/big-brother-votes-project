import React, {
  useEffect,
  useState,
  createContext,
  useLayoutEffect,
} from "react";
import AxiosClient from "../axios/CreateAxios";

const UserContext = createContext<any>(null);
function UserConnected({ children }: { children: any }) {
  const [Loggedin, setLoggedin] = useState<boolean>(false);
  const [showTimer, setShowTimer] = useState<boolean>(false);

  useLayoutEffect(() => {
    async function connection() {
      const response = await AxiosClient.get("http://localhost:8080/token");
      if (response?.status !== 200) {
        console.log("user not connected");
        setLoggedin(false);
      } else {
        alert("user connected");
        setLoggedin(true);
      }
    }
    connection();
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{ Loggedin, setLoggedin, showTimer, setShowTimer }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
}

export { UserConnected, UserContext };
