import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadIcon } from "lucide-react";
import { useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUploadedVideosStore } from "@/store/use-uploaded-videos-store";

export const Uploads = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const addVideo = useUploadedVideosStore((state) => state.addVideo);
  const uploadedVideos = useUploadedVideosStore((state) => state.videos);

  const onInputFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      addVideo(file);
      console.log("yyeet");
    } else {
      console.log("Selected file is not a valid file or no file selected.");
    }

    
    console.log(uploadedVideos);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="text-sm flex-none text-text-primary font-medium h-12 flex items-center px-4">
        Your media
      </div>
      <input
        onChange={onInputFileChange}
        ref={inputFileRef}
        type="file"
        className="hidden"
        accept="image/*,audio/*,video/*"
      />
      <div className="px-4 py-2">
        <div>
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="projects">Project</TabsTrigger>
            </TabsList>
            <TabsContent value="projects">
              <Button
                onClick={() => {
                  inputFileRef.current?.click();
                }}
                className="flex gap-2 w-full"
                variant="secondary"
              >
                <UploadIcon size={16} /> Upload
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <ScrollArea>
        <div className="px-4 masonry-sm"></div>
      </ScrollArea>
    </div>
  );
};
