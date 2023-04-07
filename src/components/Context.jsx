import { createContext, useContext } from 'react';

export const Context = createContext();
export const useUser = () => useContext(Context);
