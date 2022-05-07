import { createContext, useContext, useState } from "react"
const SummaryContext = createContext()
const useSummary = () => useContext(SummaryContext)
const SummaryProvider = ({children}) => {
    const [summary, setSummary] = useState("");

    return(
        <SummaryContext.Provider value = {{summary, setSummary}}>
            {children}
        </SummaryContext.Provider>
    )
}
export { SummaryProvider, useSummary}