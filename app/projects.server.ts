import fs from "fs/promises";
import fm, { FrontMatterResult } from "front-matter";

interface Project {
  title: string;
  link: string;
}

export async function readProject(
  fileName: string
): Promise<FrontMatterResult<Project>> {
  const file = await fs.readFile(`./projects/${fileName}.md`);
  return fm(file.toString());
}

export const getAllProjects = async () => {
  const projects = [];
  const files = await fs.readdir("./projects");

  for (const file of files) {
    const project = await readProject(file);
    projects.push(project);
  }

  return projects;
};
