import { useContext } from "react";
import { OktaExpiryManagement } from "./OktaExpiryManagementProvider";

export const useOktaExpiryManagement = () => useContext(OktaExpiryManagement);
