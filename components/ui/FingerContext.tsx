"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getFingerPrint } from "@/lib/utils";

interface FingeringProps {
    children: React.ReactNode;
}

export const FingerContext = createContext<Promise<string>>(
    Promise.resolve("fingerprint-loading"),
);

export const FingeringProvider = ({ children }: FingeringProps) => {
    const [fingerPromise, setFingerPromise] = useState<Promise<string>>(() =>
        Promise.resolve("fingerprint-loading"),
    );

    useEffect(() => {
        setFingerPromise(getFingerPrint());
    }, []);

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
