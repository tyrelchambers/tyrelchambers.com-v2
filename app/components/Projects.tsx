const projects = [
  {
    name: "Reddex",
    description: "An app tailored to Youtube Narrators.",
    slug: "https://reddex.app",
  },
  {
    name: "WildBarrens",
    description: "An Overlanding social site.",
    slug: "https://wildbarrens.com",
  },
  {
    name: "WildBarrens Blog",
    description: "The blog for WildBarrens.",
    slug: "https://blog.wildbarrens.com",
  },
  {
    name: "Stories After Midnight",
    description: "A podcast on thrilling fictional stories.",
    slug: "https://storiesaftermidnight.com",
  },
  {
    name: "tyrelchambers.co",
    description: "My personal freelancing site.",
    slug: "https://tyrelchambers.co",
  },
  {
    name: "JSOperators",
    description: "An open source javascript operator lookup app.",
    slug: "https://jsoperators.com",
  },
];
const Projects = () => {
  return (
    <ul className="flex flex-col gap-4">
      {projects.map(({ name, description, slug }) => (
        <a href={slug} key={name} className="flex flex-col project-item">
          <p className="text-zinc-800  inter-700 underline decoration-dashed name">
            {name}
          </p>
          <p className="text-zinc-500 text-sm inter-300">{description}</p>
        </a>
      ))}
    </ul>
  );
};

export default Projects;
