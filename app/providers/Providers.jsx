'use client';

import {NavigationProvider} from "@/app/providers/NavigationProvider";
import {ChakraProvider} from "@chakra-ui/react";

export function Providers({children}) {
    return (
        <NavigationProvider>
            <ChakraProvider>
                {children}
            </ChakraProvider>
        </NavigationProvider>
    );
}