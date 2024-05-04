import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  loading: boolean;

  setLoading: (status: boolean) => void;
}
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Invalid AuthProvider!");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setScreenAuthenticated] = useState(false);
  const setLoading = (status: boolean) => {
    setScreenAuthenticated(status);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
