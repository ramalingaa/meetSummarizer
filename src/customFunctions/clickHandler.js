import axios from "axios";
const clickHandler = (apiToken, audioUrl, setResponseStatus, setIsLoading) => {
  console.log(audioUrl);
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
        console.log(res.data.status);
      })
      .catch((err) => console.log("in clickhandler", err));
  }
};
export { clickHandler };
