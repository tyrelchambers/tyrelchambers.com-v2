import { Check, ExternalLink } from "lucide-react";
import BackButton from "~/components/BackButton";

const Project = () => {
  return (
    <main className="max-w-screen-sm mx-auto my-20">
      <header className="flex justify-between w-full">
        <BackButton />
        <a
          href="https://reddex.app"
          className="text-zinc-800 underline flex gap-3 items-center mb-10"
        >
          Visit website <ExternalLink size={16} />
        </a>
      </header>
      <h1 className="text-2xl mb-8 font-bold">Reddex</h1>

      <h2 className="font-bold mb-4">What is it?</h2>
      <p className="text-sm text-zinc-700 leading-loose mb-4">
        Reddex was made specifically for YouTube Narrator who get their stories
        from Reddit or from viewer submissions. It uses the Reddit API to fetch
        up to <span className="highlight">1,000 stories</span>.
      </p>
      <p className="text-sm text-zinc-700 leading-loose">
        Using Reddex will undoubtedly <span className="highlight">save</span>{" "}
        you an <span className="highlight">incredible amount of time</span>.
        What used to take up to 3 minutes or more to find a story, navigate
        around Reddit, type out a message and send it to the story author, will
        literally take <span className="highlight">seconds</span>.
      </p>
      <img
        src="/reddex/Screenshot 2024-02-24 at 9.53.48 AM.png"
        alt="Screenshot of Reddex"
        className="my-10 rounded-lg"
      />
      <h2 className="font-bold mb-4">Features</h2>
      <ul className="flex flex-col gap-4">
        <li className="flex gap-3 items-center">
          <Check /> Fetch up to 1,000 stories
        </li>
        <li className="flex gap-3 items-center">
          <Check /> Search result filtering
        </li>
        <li className="flex gap-3 items-center">
          <Check /> Show off your work with your own website
        </li>
        <li className="flex gap-3 items-center">
          <Check /> Message authors right from Reddex
        </li>
        <li className="flex gap-3 items-center">
          <Check /> Keep track of your backlog of stories
        </li>
        <li className="flex gap-3 items-center">
          <Check /> Contact list
        </li>
        <li className="flex gap-3 items-center">
          <Check /> Presave greeting messages
        </li>
        <li className="flex gap-3 items-center">
          <Check /> Tags
        </li>
        <li className="flex gap-3 items-center">
          <Check /> Accept custom written stories via your own website
        </li>
        <li className="flex gap-3 items-center">
          <Check /> Filter your Reddit inbox
        </li>
      </ul>
    </main>
  );
};

export default Project;
