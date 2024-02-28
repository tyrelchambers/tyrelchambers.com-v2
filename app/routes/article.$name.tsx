import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BackButton from "~/components/BackButton";
import { Post } from "~/types";
import { sanityServerClient } from "~/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkCodeTitles from "remark-flexible-code-titles";
import remarkFlexibleMarkers from "remark-flexible-markers";
import rehypeHighlight from "rehype-highlight";

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params?.name;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const post = await sanityServerClient.fetch<Post>(
    `*[_type == "posts" && slug.current == "${slug}"][0]`
  );

  if (process.env.NODE_ENV === "production") {
    sanityServerClient.patch(post._id).inc({ views: 1 }).commit();
  }

  return post;
};

const Articles = () => {
  const data = useLoaderData<Post>();

  return (
    <main className="max-w-screen-sm mx-auto my-20">
      <BackButton />

      <h1 className="mb-10 font-bold text-4xl">{data.title}</h1>
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          remarkCodeTitles,
          () =>
            remarkFlexibleMarkers({
              markerClassName:
                "bg-zinc-800 text-sm px-2 py-1 rounded-sm text-white",
            }),
        ]}
        rehypePlugins={[rehypeHighlight]}
        className="prose"
      >
        {data.content}
      </ReactMarkdown>
    </main>
  );
};

export default Articles;
