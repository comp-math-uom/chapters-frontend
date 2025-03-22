'use client';
import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
    const initialState = {
        action: () => {},
        label: ""
    };
    const [navActionButton, setNavActionButton] = useState(initialState);

    return (
        <NavigationContext.Provider value={{ navActionButton, setNavActionButton }}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNav() {
    return useContext(NavigationContext);
}