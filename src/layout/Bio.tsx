import React from "react";
import TechStackImgs from "./TechStackImgs";
import me from "../../public/me2.jpg";
import Image from "next/image";

const Bio = () => {
  return (
    <div className="max-w-screen-xl mx-auto my-20">
      <div className="flex relative gap-20">
        <div className="rounded-xl overflow-hidden h-[300px] aspect-video flex items-center">
          <Image
            src={me}
            alt="A picture of me."
            style={{ objectFit: "contain", marginTop: "200px" }}
          />
        </div>
        <div className="flex flex-col gap-3 max-w-lg">
          <p className="text-2xl text-white">
            Hey, I&apos;m Tyrel Chambers! I&apos;m a passionate developer who
            cannot help, but pursue fun ideas. Really. Sometimes, I just want a
            break!
          </p>
          <p className="text-gray-500">
            When I&apos;m not developing, you can usually find me watching live
            streams on extreme weather, taking{" "}
            <a
              className="text-indigo-400 underline"
              href="https://instagram.com/imtyrelchambers"
            >
              photographs
            </a>
            , or spending time outdoors!
          </p>
          <p className="text-gray-500">
            I enjoy working in the{" "}
            <span className="text-indigo-400 font-medium italic">
              front-end
            </span>{" "}
            or things, but I&apos;m also not afraid of doing things on the{" "}
            <span className="text-indigo-400 font-medium italic">back-end</span>
            . I work in{" "}
            <span className="text-indigo-400 font-medium italic">
              Javascript
            </span>{" "}
            primarily.
          </p>
        </div>
      </div>
      <TechStackImgs />
    </div>
  );
};

export default Bio;
