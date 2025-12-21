import type { User } from "@/models/User";
import { getUserProfile } from "@/services/UserService";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext<User | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile()
      .then((res) => {
        if (res) {
          setUser(res);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {console.error("Error fetching user:", err)
        navigate("/login");
      });
  }, [navigate]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
