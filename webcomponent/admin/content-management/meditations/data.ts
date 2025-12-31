export interface MeditationDataProps {
    audio: string;
    title: string;
    category: string;
    duration: string;
    status: "Published" | "Draft";
    plays: number;
    description?: string;   
}

export const meditationsDataTable:MeditationDataProps[] = [
  {
    audio:"https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
    title: "Deep Sleep Journey",
    category: "Sleep",
    duration: "15 min",
    status: "Published",
    plays: 2340,
  },
  {
    audio:"https://codeskulptor-demos.commondatastorage.googleapis.com/descent/background%20music.mp3",
    title: "Morning Mindfulness",
    category: "Mindfulness",
    duration: "10 min",
    status: "Published",
    plays: 1890,
  },
  {
    audio:"https://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3",
    title: "Stress Relief",
    category: "Anxiety",
    duration: "12 min",
    status: "Published",
    plays: 1650,
  },
  {
    audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "Body Scan Meditation",
    category: "Relaxation",
    duration: "20 min",
    status: "Published",
    plays: 2342,
  },
  {
    audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    title: "Body Scan Meditation",
    category: "Relaxation",
    duration: "20 min",
    status: "Published",
    plays: 1890,
  },
  {
    audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    title: "Body Scan Meditation",
    category: "Mindfulness",
    duration: "20 min",
    status: "Published",
    plays: 1234,
  },
  {
    audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    title: "Body Scan Meditation",
    category: "Mindfulness",
    duration: "20 min",
    status: "Draft",
    plays: 0,
  },
];

export const generateMeditations = (
  source: MeditationDataProps[],
  length: number
): MeditationDataProps[] => {
  if (length <= 0) return [];

  return Array.from({ length }, (_, index) => {
    const baseItem = source[index % source.length];

    return {
      ...baseItem,
    };
  });
};
