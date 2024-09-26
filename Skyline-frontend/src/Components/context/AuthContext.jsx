import React, { createContext, useEffect, useReducer } from "react";

const initial_state = {
  passenger: (() => {
    const storedUser = localStorage.getItem("passenger");
    if (storedUser && storedUser !== "undefined") {
      return JSON.parse(storedUser);
    }
    return null;
  })(),
  loading: false,
  error: null,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        passenger: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        passenger: null,
        loading: false,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        passenger: null,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        passenger: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    localStorage.setItem("passenger", JSON.stringify(state.passenger));
  }, [state.passenger]);

  return (
    <AuthContext.Provider
      value={{
        passenger: state.passenger,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
