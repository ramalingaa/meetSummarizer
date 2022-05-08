import React from "react";
import "./SummaryResult.css";
import { useSummary } from "../../context/summaryContext";
import ReactLoading from "react-loading";

const SummaryResult = () => {
  const { summary, isLoading } = useSummary();
  return (
    <div className="summary-result-container">
      <h3 className="text-center">Find your summary below!</h3>
      {summary ? <p>{summary}</p> :<div className="text-center">
        {isLoading.isSummaryLoading && (
          <ReactLoading
            type="spinningBubbles"
            color="#61DAFB"
            className="summarize-loader loader"
          />
        )}
      </div>
      }
    </div>
  );
};

export default SummaryResult;
