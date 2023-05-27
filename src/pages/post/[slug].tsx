import { Post } from "@/types";
import { Image, Text, Title } from "@mantine/core";
import { GetServerSideProps } from "next";
import { createClient } from "next-sanity";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import hljs from "highlight.js";

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
      p: ({ children }) => (
        <Text color="dimmed" className="my-4">
          {children}
        </Text>
      ),
    } as MDXRemoteProps["components"];
  }, []);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <main className="max-w-screen-lg mx-auto">
      <section className="max-w-screen-md mx-auto my-10">
        <div className="h-[300px] w-full overflow-hidden rounded-2xl mb-10 flex items-center">
          <Image src={post.coverImg} alt="" fit="cover" />
        </div>

        <Title>{post.title}</Title>
        <MDXRemote {...source} components={components} />
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
