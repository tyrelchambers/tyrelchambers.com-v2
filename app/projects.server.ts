import fs from "fs/promises";
import fm from "front-matter";
export async function readProject(fileName: string) {
  const file = await fs.readFile(`./projects/${fileName}`);
  return file.toString();
}

export const getAllProjects = async () => {
  const projects = [];
  const files = await fs.readdir("./projects");

  for (const file of files) {
    const project = await readProject(file);
    projects.push(fm(project));
  }

  return projects;
};
