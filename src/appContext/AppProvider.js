import { createContext, useReducer } from "react";

import { initialState, reducerFunction } from "./AppStore";

export const appContext = createContext(initialState);

function AppProvider(props) {
    const { children } = props;

    const [state, dispatch] = useReducer(reducerFunction, initialState);

    return (
        <appContext.Provider value={{ state, dispatch }}>
            {children}
        </appContext.Provider>
    );
}

export default AppProvider;
