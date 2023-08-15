import { createContext } from "react";

const initialUser = null;
const initialLocation = null;

export default createContext(initialUser)

export { initialUser, initialLocation }