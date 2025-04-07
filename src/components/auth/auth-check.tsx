
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthCheckProps {
  children: React.ReactNode;
}

export const AuthCheck = ({ children }: AuthCheckProps) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("nimbus-auth") === "authenticated";
    
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [navigate]);
  
  return <>{children}</>;
};
