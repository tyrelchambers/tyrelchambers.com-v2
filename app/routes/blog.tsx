import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BackButton from "~/components/BackButton";
import BlogPosts from "~/components/BlogPosts";
import { Post, Tag } from "~/types";
import { sanityServerClient } from "~/utils";

export const loader: LoaderFunction = async ({ params }) => {
  console.log(params);

  const { q, tag } = params;

  let posts: Post[] = await sanityServerClient.fetch(
    `*[_type == "posts" && publishedAt != null] | order(publishedAt desc)`
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

  const postTags: Post[] = await sanityServerClient.fetch(
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

const Articles = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="max-w-screen-2xl mx-auto my-20">
      <BackButton />
      <h1 className="h1">Articles</h1>
      <BlogPosts posts={data.props.posts} />
    </main>
  );
};

export default Articles;
