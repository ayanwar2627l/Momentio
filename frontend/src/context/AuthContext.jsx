import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("momentio-user");

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("momentio-token") || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("momentio-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("momentio-user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("momentio-token", token);
    } else {
      localStorage.removeItem("momentio-token");
    }
  }, [token]);

  async function register(userData) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    setUser(data.user);
    setToken(data.token);

    return data;
  }

  async function login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    setUser(data.user);
    setToken(data.token);

    return data;
  }

  function logout() {
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        register,
        login,
        logout,
        isAuthenticated: !!user && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}