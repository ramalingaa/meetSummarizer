import React from "react";
import "./SummaryResult.css";
import { useSummary } from "../../context/summaryContext"


const SummaryResult = () => {
  const { summary } = useSummary()
  return (
    <div className="summary-result-container">
      <h3 className="text-center">Find your summary below!</h3>
      <p>
        {summary}
      </p>
    </div>
  );
};

export default SummaryResult;
