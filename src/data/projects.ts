import type { ImageMetadata } from "astro";
import boojyAudio from "../assets/boojy-audio.png";
import pomodonut from "../assets/pomodonut.png";

interface ProjectLink {
  label: string;
  href: string;
}

interface Project {
  name: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    name: "Boojy Audio",
    description:
      "A free music production and recording app (a DAW) built with Flutter and Rust, aimed at musicians and hobbyists. In early access.",
    image: boojyAudio,
    imageAlt: "Boojy Audio with a multitrack project open",
    links: [
      { href: "https://boojy.org/audio", label: "boojy.org/audio" },
      { href: "https://github.com/boojyorg/boojy-audio", label: "github.com/boojyorg/boojy-audio" },
    ],
  },
  {
    name: "Pomodonut",
    description:
      "A Pomodoro timer built with React, with a donut that drains as the session runs. Sounds and graphics are generated in code, no assets.",
    image: pomodonut,
    imageAlt: "Pomodonut timer showing a partly eaten donut",
    links: [
      { href: "https://pomodonut.tyrbujac.com", label: "pomodonut.tyrbujac.com" },
      { href: "https://github.com/tyrbujac/pomodonut-react", label: "github.com/tyrbujac/pomodonut-react" },
    ],
  },
];
