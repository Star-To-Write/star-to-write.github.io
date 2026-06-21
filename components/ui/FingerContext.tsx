"use client";

import { createContext, useContext, useMemo } from "react";
import { getFingerPrint } from "@/lib/utils";

interface FingeringProps {
    children: React.ReactNode;
}

export const FingerContext = createContext<Promise<string> | null>(null);

export const FingeringProvider = ({ children }: FingeringProps) => {
    const fingerPromise = useMemo(() => getFingerPrint(), []);

    return (
        <FingerContext.Provider value={fingerPromise}>
            {children}
        </FingerContext.Provider>
    );
};

export function useFingerContext() {
    const context = useContext(FingerContext);
    if (!context) {
        throw new Error(
            "useFingerContext must be used within a FingeringProvider",
        );
    }
    return context;
}
