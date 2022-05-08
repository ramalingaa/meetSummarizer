const changeHandler = (
  e,
  url,
  setAudioUrl,
  setFileName,
  setError,
  setIsLoading
) => {
  if (e.target.files.length > 0) {
    let file = e.target.files[0];
    setFileName(() => e.target.files[0].name);
    if (file.size < 2097152) {
      setError((prev) => ({ ...prev, sizeError: "" }));
      setIsLoading((prev) => ({ ...prev, isUploadLoading: true }));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "docs_upload_example_us_preset");
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setAudioUrl(() => data.secure_url);
          setIsLoading((prev) => ({ ...prev, isUploadLoading: false }));
        })
        .catch((e) => {
          console.log("in url generator", e);
        });
    } else {
      setError((prev) => ({
        ...prev,
        sizeError: "Size must be less than 2MB",
      }));
    }
  }
};
export { changeHandler };
