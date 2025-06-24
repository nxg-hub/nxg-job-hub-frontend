import { createContext, useContext } from "react";

const EmployerContext = createContext();
const useEmployer = () => useContext(EmployerContext);

export { EmployerContext, useEmployer };
