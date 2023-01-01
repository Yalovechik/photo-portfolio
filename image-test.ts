import lqip from "lqip-modern";
import fetch from "node-fetch";
console.log(lqip);

const imageUrl =
  "https://images.unsplash.com/photo-1664575599730-0814817939de?ixid=MnwzOTQyNTZ8MXwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNjcyNTAxMzY2&ixlib=rb-4.0.3";

const getimageUrl = async function(url: string) {
  const dataUrl = await fetch(url);
  const arrayBufferData = await dataUrl.arrayBuffer();
  const lqipData = await lqip(Buffer.from(arrayBufferData));

  return lqipData.metadata.dataURIBase64;
};
