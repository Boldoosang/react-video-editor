import { create } from "zustand";

export interface UploadedVideo {
  id: string;
  file?: File; // Optional now
  src: string; // URL or Blob URL
  name: string;
}

interface UploadedVideosStore {
  videos: UploadedVideo[];
  addVideo: (file: File) => void;
  addVideoByUrl: (url: string, name?: string) => void;
  removeVideo: (id: string) => void;
  clearVideos: () => void;
}

export const useUploadedVideosStore = create<UploadedVideosStore>((set) => ({
  videos: [],

  addVideo: (file) => {
    const id = crypto.randomUUID();
    const src = URL.createObjectURL(file);
    const name = file.name;

    const newVideo: UploadedVideo = { id, file, src, name };
    set((state) => ({
      videos: [...state.videos, newVideo]
    }));
  },

  addVideoByUrl: (url, name = "external-video.mp4") => {
    const id = crypto.randomUUID();
    const newVideo: UploadedVideo = { id, src: url, name };

    set((state) => ({
      videos: [...state.videos, newVideo]
    }));
  },

  removeVideo: (id) =>
    set((state) => {
      const videoToRemove = state.videos.find((v) => v.id === id);
      if (videoToRemove?.file) {
        URL.revokeObjectURL(videoToRemove.src);
      }

      return {
        videos: state.videos.filter((v) => v.id !== id)
      };
    }),

  clearVideos: () =>
    set((state) => {
      state.videos.forEach((v) => {
        if (v.file) {
          URL.revokeObjectURL(v.src);
        }
      });
      return { videos: [] };
    })
}));
