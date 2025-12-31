import {
  generateMeditations as generateMusic,
  MeditationDataProps as MusicProps,
} from "../meditations";

const tableData: MusicProps[] = [
  {
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "Lo-fi Study Beats",
    category: "Lo-fi",
    duration: "60 min",
    status: "Published",
    plays: 3200,
  },
  {
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    title: "Ambient Forest Sounds",
    category: "Nature",
    duration: "45 min",
    status: "Published",
    plays: 2100,
  },
  {
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    title: "Rainfall & Thunder",
    category: "Nature",
    duration: "30 min",
    status: "Published",
    plays: 1800,
  },
  {
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    title: "Rainfall & Thunder",
    category: "Nature",
    duration: "30 min",
    status: "Published",
    plays: 1800,
  },
  {
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    title: "Rainfall & Thunder",
    category: "Nature",
    duration: "30 min",
    status: "Draft",
    plays: 0,
  },
  {
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    title: "Rainfall & Thunder",
    category: "Nature",
    duration: "30 min",
    status: "Published",
    plays: 1800,
  },
  {
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    title: "Rainfall & Thunder",
    category: "Nature",
    duration: "30 min",
    status: "Published",
    plays: 1800,
  },
];

export const musictableData = generateMusic(tableData, 130); // to avoid unused variable error
