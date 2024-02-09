import React, { useReducer } from "react";
import storeContext from "./storeContext";
import storeReducer from "./stoerReducer";
import { decode_token } from "../utils/index";

const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, {
    userInfo: decode_token(localStorage.getItem("crud_token")) || "",
    token: localStorage.getItem("crud_token") || "",
  });

  return (
    <>
      <storeContext.Provider value={{ store, dispatch }}>
        {children}
      </storeContext.Provider>
    </>
  );
};

export default StoreProvider;
