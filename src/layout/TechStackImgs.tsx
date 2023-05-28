import React from "react";
import cssImg from "../../public/css.svg";
import htmlImg from "../../public/html5.svg";
import jsImg from "../../public/js.svg";
import nextImg from "../../public/nextjs.svg";
import reactImg from "../../public/reactjs.svg";
import tsImg from "../../public/typescript.svg";
import digitalOceanImg from "../../public/digitalOcean.svg";
import gitImg from "../../public/git.svg";
import dockerImg from "../../public/docker.svg";
import postgresImg from "../../public/postgresql.svg";
import tailwindImg from "../../public/tailwind.svg";
import zodImg from "../../public/zod.svg";
import trpcImg from "../../public/tRPC.svg";
import prismaImg from "../../public/prisma.svg";
import reactQueryImg from "../../public/react-query.svg";
import openAiImg from "../../public/openai.svg";
import Image from "next/image";

const TechStackImgs = () => {
  return (
    <div className="flex flex-wrap mt-3 justify-center">
      <Image className="tech-stack-img" width={75} src={cssImg} alt="" />
      <Image className="tech-stack-img" width={75} src={htmlImg} alt="" />
      <Image className="tech-stack-img" width={75} src={jsImg} alt="" />
      <Image className="tech-stack-img" width={75} src={nextImg} alt="" />
      <Image className="tech-stack-img" width={75} src={reactImg} alt="" />
      <Image className="tech-stack-img" width={75} src={tsImg} alt="" />
      <Image
        className="tech-stack-img"
        width={75}
        src={digitalOceanImg}
        alt=""
      />
      <Image className="tech-stack-img" width={75} src={gitImg} alt="" />
      <Image className="tech-stack-img" width={75} src={dockerImg} alt="" />
      <Image className="tech-stack-img" width={75} src={postgresImg} alt="" />
      <Image className="tech-stack-img" width={75} src={tailwindImg} alt="" />
      <Image className="tech-stack-img" width={75} src={zodImg} alt="" />
      <Image className="tech-stack-img" width={75} src={trpcImg} alt="" />
      <Image className="tech-stack-img" width={75} src={prismaImg} alt="" />
      <Image className="tech-stack-img" width={75} src={reactQueryImg} alt="" />
      <Image className="tech-stack-img" width={75} src={openAiImg} alt="" />
    </div>
  );
};

export default TechStackImgs;
