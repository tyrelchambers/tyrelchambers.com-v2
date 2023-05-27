import PostList from "@/layout/PostList";
import { Text, TextInput, Title } from "@mantine/core";
import axios from "axios";
import { GetServerSideProps } from "next";
import { createClient } from "next-sanity";
import { Post } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  return (
    <main>
      <header className="max-w-screen-lg w-full mx-auto my-20 flex flex-col items-center">
        <Title className="text-white">Tyrel Chambers</Title>
        <Text mt="lg" size="xl" color="dimmed">
          Indie developer creating things I&apos;m passionate about.
        </Text>
      </header>

      <section className=" max-w-screen-xl mx-auto">
        <TextInput
          type="search"
          className="mb-10"
          placeholder="Search for a post"
          icon={<FontAwesomeIcon icon={faSearch} />}
        />
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
    apiVersion: "2022-03-25",
  });
  const posts = await sanityClient.fetch(`*[_type == "post"]`);

  return {
    props: {
      posts,
    },
  };
};
