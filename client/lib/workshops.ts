export type Workshop = {
  id: string;
  title: string;
  year: number;
  /** 1–12 */
  month: number;
  description: string;
  image: string;
};

export const workshopsData: Workshop[] = [
  {
    id: "colombo-spring-2025",
    title: "Colombo strength & skills intensive",
    year: 2025,
    month: 3,
    description:
      "Two days of pull-up and dip progressions, handstand lines, and small-group coaching. Athletes left with a clear four-week plan to build on at home.",
    image: "/images/hero/Heria.webp",
  },
  {
    id: "kandy-basics-2024",
    title: "Foundations open day",
    year: 2024,
    month: 11,
    description:
      "Beginner-focused session on scapular control, hollow body, and safe bar work. We capped spots so every participant got form feedback on the floor.",
    image: "/images/hero/kavinda1.webp",
  },
  {
    id: "skill-night-2024",
    title: "Skill night — muscle-up & front lever",
    year: 2024,
    month: 7,
    description:
      "Evening lab for intermediate athletes: false grip drills, front lever levers, and partner spotting. Finishers included mobility for healthy elbows and shoulders.",
    image: "/images/hero/kavinda2.webp",
  },
  {
    id: "community-2024",
    title: "Community meet & mobility",
    year: 2024,
    month: 2,
    description:
      "Light coaching, Q&A, and a guided cooldown focused on wrists and hips. A great entry point for anyone curious about structured calisthenics training.",
    image: "/images/hero/kavinda3.webp",
  },
];
