export type Habit = {
  id: string;
  title: string;
  category: string;
  streak: number;
  progress: number;
  goal: string;
};

export type Category = {
  id: string;
  name: string;
  count: number;
  color: string;
};

export const habits: Habit[] = [
  {
    id: "1",
    title: "Morning review",
    category: "Study",
    streak: 7,
    progress: 0.6,
    goal: "15 min",
  },
  {
    id: "2",
    title: "Code practice",
    category: "Career",
    streak: 12,
    progress: 0.4,
    goal: "30 min",
  },
  {
    id: "3",
    title: "Stretch break",
    category: "Wellness",
    streak: 4,
    progress: 0.8,
    goal: "10 min",
  },
  {
    id: "4",
    title: "Project planning",
    category: "Planning",
    streak: 9,
    progress: 0.5,
    goal: "20 min",
  },
];

export const categories: Category[] = [
  { id: "c1", name: "Study", count: 4, color: "#1f6f8b" },
  { id: "c2", name: "Career", count: 3, color: "#f4b860" },
  { id: "c3", name: "Wellness", count: 2, color: "#2f9e44" },
  { id: "c4", name: "Planning", count: 1, color: "#e8590c" },
];
