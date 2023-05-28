import { Post } from "@/types";
import { Divider, Image, Text, Title } from "@mantine/core";
import { GetServerSideProps } from "next";
import { createClient } from "next-sanity";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import hljs from "highlight.js";
import Header from "@/layout/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEye } from "@fortawesome/pro-light-svg-icons";
import Head from "next/head";

interface Props {
  post: Post;
  source: any;
}

const Post = ({ post, source }: Props) => {
  const components = useMemo(() => {
    return {
      h2: ({ children }) => (
        <Title order={2} className="text-2xl font-bold mt-6 mb-2">
          {children}
        </Title>
      ),
      code: ({ children }) => (
        <pre className="rounded-xl overflow-hidden my-4">
          <code className="hljs">{children}</code>
        </pre>
      ),
      p: ({ children }) => <p className="text-neutral-400 my-4">{children}</p>,
    } as MDXRemoteProps["components"];
  }, []);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <main className="max-w-screen-lg mx-auto">
      <Head>
        <title>{post.title} | Tyrel Chambers</title>
      </Head>
      <Header />
      <section className="max-w-screen-md mx-auto my-10 p-4">
        <div className="max-h-[300px] h-fit w-full overflow-hidden rounded-2xl mb-10 flex items-center">
          <Image src={post.coverImg} alt="" fit="cover" />
        </div>

        <Title>{post.title}</Title>
        <MDXRemote {...source} components={components} />
        <Divider className="my-10" />
        <div className="flex gap-6">
          <div className="flex items-center gap-2 text-neutral-400">
            <FontAwesomeIcon icon={faEye} /> <Text>{post.views}</Text>
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <FontAwesomeIcon icon={faCalendar} />{" "}
            <p className="text-neutral-400">{post.publishedAt}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params?.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const sanityClient = createClient({
    token: process.env.SANITY_TOKEN,
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false,
  });

  const posts = await sanityClient.fetch(
    `*[_type == "posts" && slug.current == "${slug}"]`
  );

  const source = await serialize(posts[0].content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
      format: "md",
    },
  });

  if (process.env.NODE_ENV === "production") {
    sanityClient.patch(posts[0]._id).inc({ views: 1 }).commit();
  }

  try {
    return {
      props: {
        post: posts[0],
        source,
      },
    };
  } catch (error) {
    return {
      props: {
        post: posts[1],
        source,
      },
    };
  }
};

export default Post;
