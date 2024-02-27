import { MDXRemoteProps } from "next-mdx-remote";

export const componentConfigs = {
  h2: ({ children }) => <h2 className="h2">{children}</h2>,
  h3: ({ children }) => (
    <h3 className="text-xl text-white font-semibold mt-6 mb-2">{children}</h3>
  ),
  code: ({ children }) => (
    <pre className="rounded-xl overflow-hidden my-4 inline-flex">
      <code className="hljs">{children}</code>
    </pre>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-indigo-400 hover:text-indigo-300 underline">
      {children}
    </a>
  ),
  p: ({ children }) => <p className="text-neutral-400 my-4">{children}</p>,
  ul: ({ children }) => <ul className="pl-10">{children}</ul>,
  ol: ({ children }) => <ol className="pl-10">{children}</ol>,

  li: ({ children }) => (
    <li className="text-neutral-400 my-4 list-disc">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-indigo-500 pl-4 my-4 bg-indigo-500 bg-opacity-10 p-3 rounded-2xl text-white italic blockquote">
      {children}
    </blockquote>
  ),
  mark: ({ children }) => (
    <mark
      className="bg-neutral-900"
      style={{
        backgroundColor: "rgb(38 38 38)",
        color: "rgb(253 224 71)",
        padding: "0.25em 0.50em",
        borderRadius: "0.25em",
      }}
    >
      {children}
    </mark>
  ),
  img: ({ src, alt }) => (
    <div className="w-full overflow-hidden rounded-2xl mb-10 flex items-center">
      <img src={src} alt={alt} className="object-contain" />
    </div>
  ),
} as MDXRemoteProps["components"];
