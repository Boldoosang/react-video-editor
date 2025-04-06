import { useEffect } from "react";
import Editor from "./pages/editor";
import useDataState from "./store/use-data-state";
import { getCompactFontData } from "./pages/editor/utils/fonts";
import { FONTS } from "./data/fonts";
import { useLocation } from "react-router-dom";
import { useUploadedVideosStore } from "@/store/use-uploaded-videos-store";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function App() {
  const query = useQuery();
  const videoUrl = query.get("videoUrl");
  const { setCompactFonts, setFonts } = useDataState();

  const addVideoByUrl = useUploadedVideosStore((state) => state.addVideoByUrl);

  useEffect(() => {
    setCompactFonts(getCompactFontData(FONTS));
    setFonts(FONTS);
  }, []);

  useEffect(() => {
    if (videoUrl) {
      console.log(videoUrl);
      addVideoByUrl(videoUrl, "teams-recording.mp4");
    }
  }, [videoUrl, addVideoByUrl]);

  if (!videoUrl) {
    return (
      <div>
        <h1>Error</h1>
        <p>No video URL provided.</p>
      </div>
    );
  }

  return <Editor />;
}
