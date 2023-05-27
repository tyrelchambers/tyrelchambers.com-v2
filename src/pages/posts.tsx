import Header from "@/layout/Header";
import Navbar from "@/layout/Navbar";
import PostList from "@/layout/PostList";
import { Post } from "@/types";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text, TextInput, Title } from "@mantine/core";
import { GetServerSideProps } from "next";
import { createClient } from "next-sanity";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  posts: Post[];
}

const Posts = ({ posts }: Props) => {
  const router = useRouter();

  return (
    <main>
      <Head>
        <title>Blog | Tyrel Chambers</title>
      </Head>
      <Header />
      <section className="max-w-screen-xl mx-auto my-10">
        <Title>Blog</Title>
        <Text size="xl" color="dimmed">
          I write mainly for myself, but hopefully they help you too!
        </Text>

        <TextInput
          icon={<FontAwesomeIcon icon={faSearch} />}
          placeholder="Search for some articles"
          className="mt-6"
          classNames={{
            input: "p-8 rounded-2xl",
          }}
          defaultValue={router.query.q as string}
          onChange={(event) => {
            router.push(`/posts?q=${event.target.value}`);
          }}
        />

        <PostList posts={posts} />
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.query.q;

  const sanityClient = createClient({
    token: process.env.SANITY_TOKEN,
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-05-27",
    useCdn: false,
  });
  const posts = await sanityClient.fetch(
    `*[_type == "posts" && title match "${query}*"] | order(publishedAt desc)`
  );

  return {
    props: {
      posts,
    },
  };
};

export default Posts;
