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
interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  const tl = useRef<GSAPTimeline>();

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      tl.current = gsap
        .timeline()
        .from(".post-list-item", {
          duration: 1,
          scale: 0.8,
          filter: "blur(8px)",
          opacity: 0,
          ease: "power3.out",
          stagger: 0.2,
        })
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
    <main>
      <Head>
        <title>Tyrel Chambers</title>
      </Head>
      <header className="max-w-screen-xl w-full mx-auto mt-20 flex flex-col items-center">
        <Title className="text-white" id="title">
          Tyrel Chambers
        </Title>
        <p className="text-neutral-400 mb-6 text-center" id="subtitle">
          Indie developer creating things I&apos;m passionate about.
        </p>
        <TechStackImgs />
      </header>

      <section className="max-w-screen-xl mx-auto my-10 p-4">
        <header
          className="flex items-baseline gap-5 flex-col md:flex-row  mb-10 justify-between"
          id="recent-posts-header"
        >
          <Title order={2} className="text-2xl font-bold">
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

      <section className="max-w-screen-lg w-full mx-auto rounded-xl p-10 contact-block my-20 flex">
        <div className="flex flex-col flex-1">
          <h3 className="text-2xl">Want to get in touch?</h3>
          <p className="text-gray-500 mt-1">
            Send me an email and let&apos;s connect.
          </p>
        </div>
        <a
          href="mailto:tychambers3@gmail.com?subject=Hey there!"
          className="px-10 rounded-xl bg-indigo-500 text-white font-medium shadow-xl hover:bg-indigo-600 flex items-center"
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
