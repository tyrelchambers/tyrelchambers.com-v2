import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

const _socials = [
  {
    icon: Twitter,
    url: "https://twitter.com/imtyrelchambers",
  },
  {
    icon: Instagram,
    url: "https://instagram.com/imtyrelchambers",
  },
  {
    icon: Github,
    url: "https://github.com/tyrelchambers",
  },
  {
    icon: Linkedin,
    url: "https://www.linkedin.com/in/tyrel-chambers-8ab581214/",
  },
];
const Socials = () => {
  return (
    <ul className="flex items-center gap-4">
      {_socials.map(({ icon: Icon, url }) => (
        <li key={url} className=" transition-all hover:scale-105">
          <a href={url} className="text-zinc-700">
            <Icon size={18} />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Socials;
