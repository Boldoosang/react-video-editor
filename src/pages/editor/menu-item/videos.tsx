import { ScrollArea } from "@/components/ui/scroll-area";
import { ADD_VIDEO, dispatch } from "@designcombo/events";
import { generateId } from "@designcombo/timeline";
import { useUploadedVideosStore } from "@/store/use-uploaded-videos-store";

export const Videos = () => {
  const uploadedVideos = useUploadedVideosStore((state) => state.videos);

  const handleAddVideo = (src: string) => {
    dispatch(ADD_VIDEO, {
      payload: {
        id: generateId(),
        details: {
          src: src
        },
        metadata: {
          resourceId: src
        }
      },
      options: {
        resourceId: "main"
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="text-sm flex-none text-text-primary font-medium h-12 flex items-center px-4">
        Videos
      </div>
      <ScrollArea>
        <div className="px-4">
          {uploadedVideos.map((video, index) => (
            <div
              onClick={() => handleAddVideo(video.src)}
              key={index}
              className="flex items-center justify-center w-full bg-background pb-2 overflow-hidden cursor-pointer"
            >
              <p>{video.src.split("/").pop()}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
