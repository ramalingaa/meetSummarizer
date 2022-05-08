import axios from "axios";
const summarizeHandler = async (text, key, setIsLoading, setSummary, setError) => {
  const config = {
    method: "POST",
    url: "https://api.oneai.com/api/v0/pipeline",
    headers: {
      "api-key": key,
      "Content-Type": "application/json",
    },
    data: {
      text: text,
      input_type: "article",
      steps: [{ skill: "summarize", params: { find_origins: true } }],
    },
  };
  try {
    const response = await axios(config);
    setIsLoading((prev) => ({
      ...prev,
      isSummaryLoading: false,
      isUploadLoading: false,
    }));
    setSummary(() => response.data.output[0].text);
  } catch (e) {
    setError((prev) => ({ ...prev, apiError: "Something went wrong please try again"}));
  }
};
export { summarizeHandler };
