import Link from "next/link";
import React from "react";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Blog",
    path: "/posts",
  },
];

const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-4">
        {routes.map((r) => (
          <li key={r.name}>
            <Link
              href={r.path}
              className="flex items-baseline gap-2 text-neutral-400 hover:text-indigo-300"
            >
              {r.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
