import { useSelector } from "react-redux";
import { useContext, createContext } from "react";
const Context = createContext(null);
export const GetItemsProvider = ({ children }) => {
  let getItems = {};
  useSelector((state) => (getItems.state = state));
  return <Context.Provider value={{ getItems }}> {children} </Context.Provider>;
};
export const useGetItems = () => {
  return useContext(Context);
};
