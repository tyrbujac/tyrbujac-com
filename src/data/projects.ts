interface ProjectLink {
  label: string;
  href: string;
}

interface Project {
  name: string;
  description: string;
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    name: "Igni",
    description:
      "A UI-first language for Flutter. My dissertation explores how language design predicts LLM code generation accuracy.",
    links: [
      { href: "https://github.com/tyrbujac/igni", label: "github.com/tyrbujac/igni" },
    ],
  },
  {
    name: "Boojy Audio",
    description:
      "A DAW for the gap between GarageBand and Ableton — friendly enough to open on a whim, deep enough to finish a track. Assistive AI, no generative features.",
    links: [
      { href: "https://github.com/boojyorg/boojy-audio", label: "github.com/boojyorg/boojy-audio" },
    ],
  },
  {
    name: "Pomodonut",
    description:
      "A Pomodoro timer with a draining illustrated donut. React 19, Web Audio synthesised sounds, no image assets.",
    links: [
      { href: "https://pomodonut.tyrbujac.com", label: "pomodonut.tyrbujac.com" },
      { href: "https://github.com/tyrbujac/pomodonut-react", label: "github.com/tyrbujac/pomodonut-react" },
    ],
  },
];
