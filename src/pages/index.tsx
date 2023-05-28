import PostList from "@/layout/PostList";
import { Text, TextInput, Title } from "@mantine/core";
import axios from "axios";
import { GetServerSideProps } from "next";
import { createClient } from "next-sanity";
import { Post } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSearch } from "@fortawesome/pro-light-svg-icons";
import TechStackImgs from "@/layout/TechStackImgs";
import Link from "next/link";
interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  return (
    <main>
      <header className="max-w-screen-xl w-full mx-auto mt-20 flex flex-col items-center">
        <Title className="text-white">Tyrel Chambers</Title>
        <Text mt="lg" size="xl" color="dimmed">
          Indie developer creating things I&apos;m passionate about.
        </Text>
        <TechStackImgs />
      </header>

      <section className=" max-w-screen-xl mx-auto my-10">
        <header className="flex items-baseline gap-5">
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
