import type {Photo} from "../types";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Link from "next/link";
import { Tab } from "@headlessui/react";


// import bgimg
import bgImg from "../public/portfolio-bg.jpg";
// import lightbox
import { LightGallery } from "lightgallery/lightgallery";


import { useRef } from "react";
import { GetStaticProps } from "next";

// importNodeFetch
import * as nodeFetch from "node-fetch";
import { createApi } from "unsplash-js";
import { Gallery } from "./Gallery";
import { getImages } from "./utils/image-util";

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

type HomeProps = {
  oceans: Photo[];
  forests: Photo[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCES_KEY!,
    fetch: (nodeFetch.default as unknown) as typeof fetch
  });

  const [oceans, forests] = await Promise.all([
    getImages(unsplash, "oceans"),
    getImages(unsplash, "forests")
  ]);

  return {
    props: {
      oceans,
      forests
    }
  };
};

const inter = Inter({ subsets: ["latin"] });

export default function Home({ oceans, forests }: HomeProps) {
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
            <Tab.Panels className="h-full  bg-opacity-70 max-w-[900px] w-full p-2 sm:p-4 ">
              <Tab.Panel>
                <Gallery photos={[...oceans, ...forests]} />
              </Tab.Panel>
              <Tab.Panel>
                <Gallery photos={oceans} />
              </Tab.Panel>
              <Tab.Panel>
                <Gallery photos={forests} />
              </Tab.Panel>
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


