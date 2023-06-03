import Header from "@/layout/Header";
import Navbar from "@/layout/Navbar";
import PostList from "@/layout/PostList";
import Tags from "@/layout/Tags";
import { Post, Tag } from "@/types";
import { useIsomorphicLayoutEffect } from "@/utils";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text, TextInput, Title } from "@mantine/core";
import { gsap } from "gsap";
import { GetServerSideProps } from "next";
import { createClient } from "next-sanity";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef } from "react";

interface Props {
  posts: Post[];
  tags: Tag[];
}

const Posts = ({ posts, tags }: Props) => {
  const router = useRouter();
  const tl = useRef<GSAPTimeline>();

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      tl.current = gsap.timeline().from(".post-list-item", {
        duration: 1,
        scale: 0.8,
        filter: "blur(8px)",
        opacity: 0,
        ease: "power3.out",
        stagger: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <Head>
        <title>Blog | Tyrel Chambers</title>
      </Head>
      <Header />
      <section className="max-w-screen-xl mx-auto my-10 p-4">
        <Title weight={500}>Blog</Title>
        <p className="text-neutral-400 text-xl">
          I write mainly for myself, but hopefully they help you too!
        </p>

        <TextInput
          icon={<FontAwesomeIcon icon={faSearch} />}
          placeholder="Search for some articles"
          className="mt-6"
          classNames={{
            input: "rounded-2xl",
          }}
          defaultValue={router.query.q as string}
          onChange={(event) => {
            const query = router.query;

            if (query.q === event.currentTarget.value) {
              delete router.query.tag;
              router.push({
                query: { ...router.query },
              });
            } else {
              router.push({
                query: { ...router.query, q: event.currentTarget.value },
              });
            }
          }}
        />

        <Tags tags={tags} activeTags={router.query.tag as string} />

        <PostList posts={posts} />
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { q, tag } = ctx.query;

  const sanityClient = createClient({
    token: process.env.SANITY_TOKEN,
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-05-27",
    useCdn: false,
  });

  let posts: Post[] = await sanityClient.fetch(
    `*[_type == "posts"] | order(publishedAt desc)`
  );

  if (q) {
    posts = posts.filter((post) => {
      return post.title.toLowerCase().includes((q as string).toLowerCase());
    });
  }

  if (tag) {
    posts = posts.filter((post) => {
      return post.tags && post.tags.some((t) => t.value === tag);
    });
  }

  const postTags: Post[] = await sanityClient.fetch(
    `*[_type == "posts" && defined(tags)]`
  );

  const filteredTags = postTags
    .map((post) => post.tags)
    .flat()
    .filter((tag) => tag._type === "tag")
    .reduce((acc: Tag[], tag: Tag) => {
      const existingTag = acc.find((t) => t._key === tag._key);

      if (!existingTag) {
        acc.push({ ...tag });
      }

      return acc;
    }, []);

  return {
    props: {
      posts,
      tags: filteredTags,
    },
  };
};

export default Posts;
