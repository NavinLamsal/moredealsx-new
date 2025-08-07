"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import ReactQueryProvider from "./reactquery-provider";
import StoreProvider from "./storeProvider";


const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <ReactQueryProvider>

                <StoreProvider>
                {children}
                </StoreProvider>
            </ReactQueryProvider>

        </ThemeProvider>
    );
};

export default Provider;
