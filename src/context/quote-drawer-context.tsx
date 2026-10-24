"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

interface QuoteDrawerContextType {
  isOpen: boolean;
  preselectedMachine: string;
  preselectedSlug: string;
  preselectedMessage: string;
  openDrawer: (options?: { machineName?: string; machineSlug?: string; initialMessage?: string }) => void;
  closeDrawer: () => void;
}

const QuoteDrawerContext = createContext<QuoteDrawerContextType | undefined>(undefined);

export function QuoteDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedMachine, setPreselectedMachine] = useState("");
  const [preselectedSlug, setPreselectedSlug] = useState("");
  const [preselectedMessage, setPreselectedMessage] = useState("");

  const openDrawer = useCallback(
    (options?: { machineName?: string; machineSlug?: string; initialMessage?: string }) => {
      if (options?.machineName) {
        setPreselectedMachine(options.machineName);
      } else {
        setPreselectedMachine("");
      }
      if (options?.machineSlug) {
        setPreselectedSlug(options.machineSlug);
      } else {
        setPreselectedSlug("");
      }
      if (options?.initialMessage) {
        setPreselectedMessage(options.initialMessage);
      } else {
        setPreselectedMessage("");
      }
      setIsOpen(true);
    },
    []
  );

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      preselectedMachine,
      preselectedSlug,
      preselectedMessage,
      openDrawer,
      closeDrawer,
    }),
    [isOpen, preselectedMachine, preselectedSlug, preselectedMessage, openDrawer, closeDrawer]
  );

  return (
    <QuoteDrawerContext.Provider value={value}>
      {children}
    </QuoteDrawerContext.Provider>
  );
}

export function useQuoteDrawer() {
  const context = useContext(QuoteDrawerContext);
  if (!context) {
    throw new Error("useQuoteDrawer must be used within a QuoteDrawerProvider");
  }
  return context;
}
