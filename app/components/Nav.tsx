import { ArrowRight } from "lucide-react";

const nav = [
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Blog",
    url: "/blog",
  },
];
const Nav = () => {
  return (
    <ul className="flex gap-10">
      {nav.map(({ name, url }) => (
        <li key={url}>
          <a
            href={url}
            className="text-zinc-700 text-3xl inter-700 flex items-center gap-3 hover:text-orange-500"
          >
            <ArrowRight size={40} />
            {name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
