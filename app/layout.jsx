import {Inter} from "next/font/google";
import "./globals.css";
import {ChakraProvider} from "@chakra-ui/react";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "C H A P T E R S",
    description: "Chapters - AI/ML Portal",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ChakraProvider>
            {children}
        </ChakraProvider>
        </body>
        </html>
    );
}
