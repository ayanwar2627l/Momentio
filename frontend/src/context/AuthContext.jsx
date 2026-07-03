import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("momentio-user");

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("momentio-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("momentio-user");
    }
  }, [user]);

  function register(userData) {
    const newUser = {
      id: crypto.randomUUID(),
      name: userData.name,
      email: userData.email,
    };

    localStorage.setItem(
      "momentio-registered-user",
      JSON.stringify({
        ...newUser,
        password: userData.password,
      })
    );

    setUser(newUser);
  }

  function login(email, password) {
    const savedUser = localStorage.getItem("momentio-registered-user");

    if (!savedUser) {
      throw new Error("No account found. Please register first.");
    }

    const parsedUser = JSON.parse(savedUser);

    if (parsedUser.email !== email || parsedUser.password !== password) {
      throw new Error("Invalid email or password.");
    }

    const loggedInUser = {
      id: parsedUser.id,
      name: parsedUser.name,
      email: parsedUser.email,
    };

    setUser(loggedInUser);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}