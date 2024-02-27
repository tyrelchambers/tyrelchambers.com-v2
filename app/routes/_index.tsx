import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BlogPosts from "~/components/BlogPosts";
import Projects from "~/components/Projects";
import Socials from "~/components/Socials";
import { sanityServerClient } from "~/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Tyrel Chambers" },
    {
      name: "description",
      content: "A passionate software developer from Ontario, Canada.",
    },
  ];
};

export const loader: LoaderFunction = async () => {
  const posts = await sanityServerClient.fetch(
    `*[_type == "posts" && publishedAt != null] | order(publishedAt desc)`
  );

  return posts;
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="max-w-screen-sm mx-auto">
      <header className="w-full flex flex-col pt-10">
        <div className="flex w-full justify-between mb-2">
          {" "}
          <h1 className="text-zinc-800 justify-between inter-700">
            Tyrel Chambers
          </h1>
          <Socials />
        </div>

        <p className="text-zinc-500 inter-300 leading-snug">
          I&apos;m a passionate{" "}
          <span className="highlight">software developer</span> who cannot help
          but pursue fun ideas. <span className="highlight">Really.</span>
        </p>
      </header>

      <section className="max-w-screen-2xl mx-auto my-10">
        <h2 className="font-bold mb-6 flex items-center gap-6">
          <span className="h-[2px] w-full max-w-[100px] bg-zinc-800 block"></span>
          Projects
        </h2>
        <Projects />
      </section>

      <section className="max-w-screen-2xl mx-auto my-20">
        <h2 className="font-bold mb-6 flex items-center gap-6">
          <span className="h-[2px] w-full max-w-[100px] bg-zinc-800 block"></span>
          Recent articles
        </h2>
        <BlogPosts posts={data} />
      </section>
    </main>
  );
}
