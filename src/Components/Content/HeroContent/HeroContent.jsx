import axios from "axios";
import React, { useState, useEffect } from "react";
import "./HeroContent.css";
import {
  changeHandler,
  clickHandler,
  summarizeHandler,
} from "../../../customFunctions/index-functions";
import { useSummary } from "../../../context/summaryContext";
import ReactLoading from "react-loading";

const HeroContent = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [pasteFileUrl, setPasteFileUrl] = useState("");
  const [responseStatus, setResponseStatus] = useState({ status: "", id: "" });
  const [isLoading, setIsLoading] = useState({
    isSummaryLoading: false,
    isUploadLoading: false,
  });
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState({ sizeError: "" });
  const url = "https://api.cloudinary.com/v1_1/demo/auto/upload";
  const apiToken = "57abb67a2c924791b6a26572ee153ca2";
  const key = "b1666e78-926a-4aa8-ad25-7da19547944a";
  const { setSummary } = useSummary();

  useEffect(() => {
    if (
      responseStatus.status === "queued" ||
      responseStatus.status === "processing"
    ) {
      const assembly = axios.create({
        baseURL: "https://api.assemblyai.com/v2",
        headers: {
          authorization: apiToken,
          "content-type": "application/json",
        },
      });
      assembly
        .get(`/transcript/${responseStatus.id}`)
        .then((res) => {
          if (
            res.data.status === "queued" ||
            res.data.status === "processing"
          ) {
            setResponseStatus(() => ({
              status: res.data.status,
              id: res.data.id,
            }));
          } else {
            console.log(res.data.text);
            summarizeHandler(res.data.text, key, setIsLoading, setSummary);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [responseStatus]);
  console.log(audioUrl);
  return (
    <main className="hero">
      <div className="hero-wrapper">
        <div className="hero-header">
          <h4>Summarize your favorite Podcasts and more with just a click !</h4>
        </div>
        <div className="hero-content-cont">
          <div className="hero-action-cont">
            <div className="hero-upload-wrapper">
              <label className="cta-btn-secondary">
                <input
                  type="file"
                  onChange={(e) =>
                    changeHandler(
                      e,
                      url,
                      setAudioUrl,
                      setFileName,
                      setError,
                      setIsLoading
                    )
                  }
                  accept="audio/*"
                />
                Upload a file
              </label>
              {fileName && <p className="filename">{fileName}</p>}
            </div>
            {isLoading && <ReactLoading type="spinningBubbles" />}
            <p className="error-msg">{error.sizeError}</p>
            <input
              className="hero-input"
              type="url"
              name="url-text"
              id="url-text"
              placeholder="Paste URL"
            />
          </div>
          <div>
            <button
              className="cta-btn-primary"
              onClick={() =>
                clickHandler(
                  apiToken,
                  audioUrl,
                  setResponseStatus,
                  setIsLoading
                )
              }
            >
              Summarize
            </button>
          </div>
        </div>
        {isLoading && <p>Content is loading</p>}
        <p className="error-msg">{error.sizeError}</p>
        <input
          className="hero-input"
          type="url"
          pattern="https://.*"
          value={pasteFileUrl}
          name="url-text"
          id="url-text"
          placeholder="Paste URL to your file"
          onChange={(e) => pasteUrlHandler(e, setAudioUrl, setPasteFileUrl, setError)}
        />
      </div>
      <button className="cta-btn-primary" onClick={() =>
          clickHandler(apiToken, audioUrl, setResponseStatus, setIsLoading)
      }>Summarize</button>
    </main>
  );
};

export default HeroContent;
