import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import Masonry from "react-masonry-css";
// import img
import photo1 from "../public/nature-1.jpg";
import photo2 from "../public/nature-2.jpg";
import photo3 from "../public/nature-3.jpg";
import photo4 from "../public/nature-4.jpg";
import photo5 from "../public/nature-5.jpg";
// import bgimg
import bgImg from "../public/portfolio-bg.jpg";
// import lightbox
import { LightGallery } from "lightgallery/lightgallery";
import LightGalleryComponent from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
// import plugins Gallery
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { useRef } from "react";
const tabs = [
  {
    key: "all",
    display: "All"
  },
  {
    key: "landscape",
    display: "landscape"
  },
  {
    key: "oceans",
    display: "oceans"
  }
];

const photos = [photo1, photo2, photo3, photo4, photo5];

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const lightboxRef = useRef<LightGallery | null>(null);
  return (
    <div>
      <Image
        src={bgImg}
        alt="background"
        placeholder="blur"
        className="fixed top-0 left-0 -z-50"
      />

      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="fixed top-0 w-full z-10 flex justify-between items-center h-[90px] px-6 ">
        <div className="uppercase text-xl">Seniorita</div>
        <Link
          href="#"
          className="rounded-3xl bg-white px-3 py-1 text-stone-700 hover:bg-opacity-90"
        >
          Get in touch
        </Link>
      </header>
      <main className="pt-[110px]">
        <div className="flex items-center flex-col h-full">
          <Tab.Group>
            <Tab.List className="flex items-center gap-12">
              {tabs.map(tab => (
                <Tab className="p-1 uppercase t-lg" key={tab.key}>
                  {({ selected }) => (
                    <span
                      className={selected ? "text-white" : "text-stone-600"}
                    >
                      {tab.display}
                    </span>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="h-full bg-stone-900 bg-opacity-70 max-w-[900px] w-full p-2 sm:p-4 my-4">
              <Tab.Panel>
                <Masonry
                  breakpointCols={2}
                  columnClassName=""
                  className="flex gap-2"
                >
                  {photos.map((photo, index) => (
                    <Image
                      key={photo.src}
                      src={photo}
                      alt="nature"
                      className="my-2 hover:opacity-70 cursor-pointer"
                      placeholder="blur"
                      onClick={() => {
                        lightboxRef.current?.openGallery(index);
                      }}
                    />
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
              </Tab.Panel>
              <Tab.Panel>Landscape </Tab.Panel>
              <Tab.Panel>Oceans</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
      <footer className="h-[60px] flex justify-center items-center">
        <h2>hello2</h2>
      </footer>
    </div>
  );
}
