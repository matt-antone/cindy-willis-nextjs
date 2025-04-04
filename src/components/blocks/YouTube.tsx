"use client";
import * as React from 'react';
import type { Youtube } from "@/types/types.sanity";

interface IYouTubeProps {
  value: Youtube
}

const YouTube: React.FunctionComponent<IYouTubeProps> = (props) => {
  const getYouTubeId = (url: string): string | null => {
    // Handle youtu.be format
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1];
    }

    // Handle standard youtube.com format
    if (url.includes('youtube.com/watch?v=')) {
      return url.split('v=')[1].split('&')[0];
    }

    // Handle embed format
    if (url.includes('youtube.com/embed/')) {
      return url.split('embed/')[1].split('?')[0];
    }

    return null;
  };

  const id = getYouTubeId(props.value.url || '') || null;

  return id && (
    <div className="aspect-video mx-auto max-w-[640px]">
      <iframe
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; 
        autoplay; 
        clipboard-write; 
        encrypted-media; 
        gyroscope; 
        picture-in-picture; 
        web-share" allowFullScreen
        loading="lazy"
      >
      </iframe>
    </div>
  );
};

export default YouTube;
