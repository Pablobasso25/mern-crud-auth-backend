import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debería estar dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  // Función unificada para manejar errores de Axios de forma segura
  const handleErrors = (error) => {
    if (error.response && error.response.data) {
      // Si el backend envía un array (ej. de Zod), lo guardamos tal cual
      // Si envía un objeto con .message, lo convertimos en array para que el .map no falle
      const errorMessage = Array.isArray(error.response.data)
        ? error.response.data
        : [error.response.data.message || "Ocurrió un error inesperado"];
      setErrors(errorMessage);
    } else {
      // Caso: El servidor está caído o no hay internet (Network Error)
      setErrors(["No se pudo conectar con el servidor"]);
    }
  };

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]); // Limpiamos errores al tener éxito
    } catch (error) {
      console.error(error);
      handleErrors(error); // Usamos la lógica segura
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]); // Limpiamos errores al tener éxito
    } catch (error) {
      console.error(error.response.data);
      handleErrors(error.response.data); // Usamos la lógica segura
    }
  };

  // Timer para limpiar mensajes de error automáticamente
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
