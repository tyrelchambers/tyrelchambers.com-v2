import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { readProject } from "~/projects.server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkCodeTitles from "remark-flexible-code-titles";
import remarkFlexibleMarkers from "remark-flexible-markers";
import rehypeHighlight from "rehype-highlight";
import { ExternalLink } from "lucide-react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { name } = params;
  const project = await readProject(name as string);

  return project;
};

const Project = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="max-w-screen-sm mx-auto my-10">
      <header className="flex justify-between w-full mb-10">
        <h1 className="text-3xl font-bold ">{data.attributes.title}</h1>

        <a
          href={data.attributes.link}
          className="text-zinc-800 underline flex gap-2 items-center hover:text-orange-500"
        >
          Visit website <ExternalLink size={14} />
        </a>
      </header>
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
        {data.body}
      </ReactMarkdown>
    </main>
  );
};

export default Project;
