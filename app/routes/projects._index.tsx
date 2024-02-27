import { LoaderFunction } from "@remix-run/node";
import BackButton from "~/components/BackButton";
import { getAllProjects } from "~/projects.server";

export const loader: LoaderFunction = async () => {
  const projects = await getAllProjects();
  return projects;
};

const Projects = () => {
  return (
    <main className="max-w-screen-2xl mx-auto my-20">
      <BackButton />
      <h1 className="h1">Projects</h1>
    </main>
  );
};

export default Projects;
