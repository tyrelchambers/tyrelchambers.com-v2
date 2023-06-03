import PostList from "@/layout/PostList";
import { Title } from "@mantine/core";
import { GetServerSideProps } from "next";
import { createClient } from "next-sanity";
import { Post } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/pro-light-svg-icons";
import TechStackImgs from "@/layout/TechStackImgs";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useIsomorphicLayoutEffect } from "@/utils";
import Head from "next/head";
import Bio from "@/layout/Bio";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Navbar from "@/layout/Navbar";
interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  const tl = useRef<GSAPTimeline>();

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      tl.current = gsap
        .timeline()
        .from("#bio-img", {
          duration: 1,
          scale: 0.8,
          filter: "blur(8px)",
          opacity: 0,
          ease: "power3.out",
        })
        .from(
          ".bio-text",
          {
            duration: 1,
            y: 20,
            opacity: 0,
            ease: "power3.out",
            stagger: 0.2,
          },
          "-=0.5"
        )
        .from(
          ".post-list-item",
          {
            duration: 1,
            scale: 0.8,
            filter: "blur(8px)",
            opacity: 0,
            ease: "power3.out",
            stagger: 0.2,
          },
          "-=1.5"
        )
        .from(
          ".tech-stack-img",
          {
            duration: 0.5,
            y: -20,
            opacity: 0,
            ease: "power3.out",
            stagger: 0.05,
          },
          "-=2"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="mb-10">
      <Head>
        <title>Tyrel Chambers</title>
      </Head>
      <header className="max-w-screen-xl w-full mx-auto lg:mt-20 flex items-center justify-between p-4 lg:p-0 ">
        <div className="flex items-center gap-10">
          <a
            href="https://twitter.com/imtyrelchambers"
            className="text-2xl hover:text-indigo-400"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://instagram.com/imtyrelchambers"
            className="text-2xl hover:text-indigo-400"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>

        <Navbar />
      </header>

      <Bio />

      <section className="max-w-screen-xl mx-auto my-10 p-4">
        <header
          className="flex items-baseline gap-5 flex-col md:flex-row  mb-10 justify-between"
          id="recent-posts-header items-center"
        >
          <Title order={2} className="text-2xl" weight={500}>
            Recent posts
          </Title>
          <Link
            href="/posts"
            className="flex items-center text-indigo-400 gap-2 underline"
          >
            View more posts <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </header>
        <PostList posts={posts} />
      </section>

      <section className="max-w-screen-lg lg:w-full mx-auto rounded-xl p-4 lg:p-10 contact-block lg:my-20 flex flex-col lg:flex-row gap-4 w-11/12">
        <div className="flex flex-col flex-1">
          <h3 className="text-2xl">Want to get in touch?</h3>
          <p className="text-gray-500 mt-1">
            Send me an email and let&apos;s connect.
          </p>
        </div>
        <a
          href="mailto:tychambers3@gmail.com?subject=Hey there!"
          className="px-10 py-2 rounded-xl bg-indigo-500 text-white font-medium shadow-xl hover:bg-indigo-600 flex items-center justify-center"
        >
          Say hello!
        </a>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sanityClient = createClient({
    token: process.env.SANITY_TOKEN,
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-05-27",
    useCdn: false,
  });
  const posts = await sanityClient.fetch(
    `*[_type == "posts"] | order(publishedAt desc)[0...6]`
  );

  return {
    props: {
      posts,
    },
  };
};
