import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     if (!user) {
//       axios.get('/profile').then(({ data }) => {
//         setUser(data);
//       });
//     }
//   }, []);
//   return (
//     <UserContext.Provider value={{user, setUser}}>
//       {children}
//     </UserContext.Provider>
//   );
// }

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default function LoginRequired() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        axios.get("/profile").then(({ data }) => {
          setUser(data);
        });
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkLogin();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }

  return (
    <UserContext.Provider value={user}>
      <Outlet />
    </UserContext.Provider>
  );
}
