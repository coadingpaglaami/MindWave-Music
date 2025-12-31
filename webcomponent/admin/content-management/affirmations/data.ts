import { MeditationDataProps as AffirmativeProps } from "../meditations";

const tableData: Omit<AffirmativeProps, "duration">[] = [
  {
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    title: "Self-Love & Confidence",
    category: "Self-Love",
    status: "Published",
    plays: 1890, // Mapped from 'Favorites' column
  },
  {
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    title: "Abundance Mindset",
    category: "Prosperity",
    status: "Published",
    plays: 1450,
  },
  {
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    title: "Inner Peace",
    category: "Calm",
    status: "Published",
    plays: 1200,
  },
  {
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    title: "Morning Motivation",
    category: "Energy",
    status: "Draft",
    plays: 0,
  },
  {
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    title: "Morning Motivation",
    category: "Energy",
    status: "Draft",
    plays: 0,
  },
  {
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    title: "Morning Motivation",
    category: "Energy",
    status: "Draft",
    plays: 0,
  },
  {
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3",
    title: "Morning Motivation",
    category: "Energy",
    status: "Draft",
    plays: 0,
  },
];

 const generateAffirmativeData = (
  source: Omit<AffirmativeProps, "duration">[],
  length: number
): Omit<AffirmativeProps, "duration">[] => {
  if (length <= 0) return [];

  return Array.from({ length }, (_, index) => {
    const base = source[index % source.length];

    return {
      ...base,
    };
  });
};

export const moreTableData: Omit<AffirmativeProps, "duration">[] =
  generateAffirmativeData(tableData, 50);
