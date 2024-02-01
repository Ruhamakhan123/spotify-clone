"use client";

import { LikedButton } from "@/components/LikedButton";
import { MediaItem } from "@/components/MediaItem";
import { Songs } from "@/types";

interface SearchContentProps {
  songs: Songs[];
}

export const SearchContent = ({ songs }: SearchContentProps) => {
  if (songs.length === 0) {
    return (
      <div className="flex flex-col w-full text-neutral-400 px-6 gap-y-2">
        No songs found!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 px-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={() => {}} data={song} />
          </div>
          <LikedButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};
