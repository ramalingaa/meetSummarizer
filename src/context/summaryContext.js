import { createContext, useContext, useState } from "react";
const SummaryContext = createContext();
const useSummary = () => useContext(SummaryContext);
const SummaryProvider = ({ children }) => {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState({
    isSummaryLoading: false,
    isUploadLoading: false,
  });

  return (
    <SummaryContext.Provider
      value={{ summary, setSummary, isLoading, setIsLoading }}
    >
      {children}
    </SummaryContext.Provider>
  );
};
export { SummaryProvider, useSummary };
