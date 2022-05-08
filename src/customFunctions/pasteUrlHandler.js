import { getFileURLSize } from "./fetchFileURLSize";

const pasteUrlHandler = (e, setAudioUrl, setPasteFileUrl, setError) => {
    setPasteFileUrl(e.target.value);
    getFileURLSize(e.target.value)
    .then((res) => {
        if(res < 2097152) {
            setError((prev) => ({...prev, sizeError:""}));
            setAudioUrl(e.target.value);
        } else {
            setError((prev) => ({...prev, sizeError:"Size must be less than 2MB"}));
        }
    })
    .catch((err) => {
        setError((prev) => ({...prev, sizeError: err }));
    })
}

export { pasteUrlHandler };