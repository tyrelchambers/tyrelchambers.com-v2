import BackButton from "~/components/BackButton";

const skills = [
  "React",
  "Golang",
  "Typescript",
  "Postgres",
  "SQL",
  "Docker",
  "GCP",
  "Netlify",
  "Fly.io",
  "tRPC",
  "Next.js",
  "Remix",
  "DigitalOcean",
  "HTML",
  "CSS",
  "JavaScript",
  "Deployment",
  "Design",
];

const About = () => {
  return (
    <main className="max-w-screen-2xl mx-auto my-20">
      <BackButton />
      <h1 className="h1">About me</h1>

      <div className="mb-20">
        <p className="text-3xl text-zinc-500 my-4">
          I began learning <span className="highlight">web development</span> in
          ~2013.
        </p>

        <p className="text-3xl text-zinc-500 my-10">
          Since then I&apos;ve taught myself a wide range of technologoes. I
          consider myself a{" "}
          <span className="highlight">full-stack developer</span> with a
          skillset including:{" "}
        </p>
        <ul className="flex flex-wrap text-3xl text-zinc-500">
          {skills.map((s) => (
            <li key={s} className="highlight mr-3">
              {s}
            </li>
          ))}
          and more.
        </ul>

        <p className="text-3xl text-zinc-500 my-10">
          Oh, I also do <span className="highlight">voice overs</span>. If
          you&apos;d like to see some of my work, check out my youtube channel{" "}
          <a
            href="https://www.youtube.com/storiesaftermidnight"
            className="highlight underline"
          >
            Stories After Midnight
          </a>
        </p>
      </div>

      <h2 className="text-5xl inter-700 text-zinc-800 mb-10">Hobbies</h2>
      <ul className="flex flex-wrap gap-4">
        <li className="bg-zinc-800 text-3xl text-zinc-100 p-3">Photography</li>
        <li className="bg-zinc-800 text-3xl text-zinc-100 p-3">
          Outdoor activities
        </li>
        <li className="bg-zinc-800 text-3xl text-zinc-100 p-3">ATVing</li>
        <li className="bg-zinc-800 text-3xl text-zinc-100 p-3">Music</li>
        <li className="bg-zinc-800 text-3xl text-zinc-100 p-3">
          Doing voice overs/narrations
        </li>
      </ul>
    </main>
  );
};

export default About;
