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
    name: "11Knots",
    description: "A yachting social site.",
    slug: "https://11knots.com",
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
];
const Projects = () => {
  return (
    <ul className="flex flex-col gap-4">
      {projects.map(({ name, description, slug }) => (
        <a href={slug} key={name} className="flex flex-col project-item">
          <p className="text-zinc-800  inter-700  name">{name}</p>
          <p className="text-zinc-500 text-sm inter-300">{description}</p>
        </a>
      ))}
    </ul>
  );
};

export default Projects;
