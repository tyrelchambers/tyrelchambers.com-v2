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
            y: -100,
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
      <header className="max-w-screen-xl w-full mx-auto mt-20 flex flex-col items-center">
        <Title className="text-white" id="title">
          Tyrel Chambers
        </Title>
        <p className="text-neutral-400 my-6" id="subtitle">
          Indie developer creating things I&apos;m passionate about.
        </p>
        <TechStackImgs />
      </header>

      <section className=" max-w-screen-xl mx-auto my-10">
        <header className="flex items-baseline gap-5" id="recent-posts-header">
          <Title order={2} className="text-2xl font-bold mb-10">
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
