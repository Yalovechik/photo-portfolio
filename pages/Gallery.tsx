import { useRef } from "react";
import type{ Photo } from "../types";
import { LightGallery } from "lightgallery/lightgallery";
import LightGalleryComponent from "lightgallery/react";
import Image from "next/image"
import Masonry from "react-masonry-css";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

type GalleryProps = {
    photos: Photo[];
  };
export function Gallery({ photos }: GalleryProps) {
    const lightboxRef = useRef<LightGallery | null>(null);
    return (
      <>
        <Masonry breakpointCols={2} columnClassName="" className="flex gap-2">
          {photos.map((photo, index) => (
            <div className="relative" key={index}>
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="my-2"
                blurDataURL={photo.blurDataURL}
                placeholder="blur"
              />
              <div
                onClick={() => {
                  lightboxRef.current?.openGallery(index);
                }}
                className="absolute w-full h-full hover:bg-stone-900 inset-0 hover:bg-opacity-10 cursor-pointer"
              ></div>
            </div>
          ))}
        </Masonry>
        <LightGalleryComponent
          onInit={ref => {
            if (ref) lightboxRef.current = ref.instance;
          }}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          dynamic
          dynamicEl={photos.map(photo => ({
            src: photo.src,
            thumb: photo.src
          }))}
        />
      </>
    );
  }