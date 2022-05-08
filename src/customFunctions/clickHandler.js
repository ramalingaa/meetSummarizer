import axios from "axios";
const clickHandler = (apiToken, audioUrl, setResponseStatus, setIsLoading, setError) => {
  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: apiToken,
      "content-type": "application/json",
    },
  });

  if (audioUrl) {
    assembly
      .post("/transcript", {
        audio_url: audioUrl,
      })
      .then((res) => {
        setIsLoading((prev) => ({ ...prev, isSummaryLoading: true }));
        setResponseStatus(() => ({ status: res.data.status, id: res.data.id }));
      })
      .catch((err) => {
        setError((prev) => ({ ...prev, apiError: "Something went wrong please try again"}));
        
      });
      
  }
};
export { clickHandler };
