import lqip from "lqip-modern";
import { Photo } from "../../types";
import { createApi } from "unsplash-js";

async function getimageUrl(url: string) {
  const dataUrl = await fetch(url);
  const arrayBufferData = await dataUrl.arrayBuffer();
  const lqipData = await lqip(Buffer.from(arrayBufferData));

  return lqipData.metadata.dataURIBase64;
}

export async function getImages(
  cli: ReturnType<typeof createApi>,
  query: string
): Promise<Photo[]> {
  const mappedPhotos: Photo[] = [];
  const photos = await cli.search.getPhotos({
    query
  });

  if (photos.type === "success") {
    const photosArr = photos.response.results.map((photo, idx) => ({
      src: photo.urls.full,
      thumb: photo.urls.thumb,
      width: photo.width,
      height: photo.height,
      alt: photo.alt_description ?? `img${idx}`
    }));

    const photosArrWithDataUrl: Photo[] = [];

    for (const photo of photosArr) {
      const blurDataURL = await getimageUrl(photo.src);
      photosArrWithDataUrl.push({ ...photo, blurDataURL });
    }

    mappedPhotos.push(...photosArrWithDataUrl);
  } else {
    console.error("could not get the data");
  }

  return mappedPhotos;
}
