import { Post } from "~/types";

const BlogPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <ul className="flex flex-col gap-4">
      {posts.map((p) => (
        <li key={p._id}>
          <a
            href={`/article/${p.slug.current}`}
            className="text-zinc-800  hover:text-orange-500 font-bold "
          >
            {p.title}
          </a>
          <p className="mt-2 text-gray-600 text-sm">{p.summary}</p>
        </li>
      ))}
    </ul>
  );
};

export default BlogPosts;
