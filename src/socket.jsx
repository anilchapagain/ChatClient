/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import { server } from "./components/constants/config";

const SocketContex = createContext();

const getSocket = () => useContext(SocketContex);

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(server, { withCredentials: true }), []);
  return (
    <SocketContex.Provider value={socket}> {children}</SocketContex.Provider>
  );
};
export { SocketProvider, getSocket };
