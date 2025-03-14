import React, { useState, useContext, createContext } from "react";
const authContext = createContext();
// Provider component that wraps your app and makes auth object...
//... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
const auth = useProvideAuth();
return <authContext.Provider value={auth}>{children}
</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
  };
  
// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const history = useHistory();
  
    function signin(username, password) {
      setIsLoading(true);
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => {
            setUser(user);
          });
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    }
  
    function signup(signUpData) {
      setErrors([]);
      setIsLoading(true);
      fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => setUser(user));
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    }
  
    function signout() {
      fetch("/api/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
          setUser(null);
        }
      });
    }
  
    function autoSignIn() {
      fetch("/api/me").then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      });
    }
  
    // Return the user object and auth methods
    return {
      user,
      signin,
      signup,
      signout,
      autoSignIn,
      errors,
      isLoading,
    };
  }
  

