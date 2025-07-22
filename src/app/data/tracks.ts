export interface Track {
  id: string;
  title: string;
  album: string;
  cover: string;
  audioUrl: string;
  year: string;
  artists?: string[];
  featured?: string[];
}

export const SEEDHE_MAUT_TRACKS: Track[] = 
  [
    {
      "id": "1",
      "title": "Nanchaku",
      "album": "न",
      "cover": "/covers/nanchaku.jpg",
      "audioUrl": "/audio/Nanchaku.mp3",
      "year": "2021",
      "artists": ["Seedhe Maut", "MC Stan"]
    },
    {
      "id": "2",
      "title": "Khatta Flow",
      "album": "Lunch Break",
      "cover": "/covers/KhattaFlow.jpeg",
      "audioUrl": "/audio/KhattaFlow.mp3",
      "year": "2023",
      "artists": ["Seedhe Maut", "KR$NA"]
    },
    {
      "id": "3",
      "title": "101",
      "album": "101",
      "cover": "/covers/101.jpg",
      "audioUrl": "/audio/101.mp3",
      "year": "2019",
      "artists": ["Seedhe Maut"]
    },
    {
      "id": "4",
      "title": "Hola Amigo",
      "album": "Far From Over",
      "cover": "/covers/HolaAmigo.jpeg",
      "audioUrl": "/audio/HolaAmigo.mp3",
      "year": "2023",
      "artists": ["KR$NA", "Seedhe Maut", "Umair"]
    },
    {
      "id": "5",
      "title": "Kodak",
      "album": "Monopoly Moves",
      "cover": "/covers/Kodak.jpg",
      "audioUrl": "/audio/Kodak.mp3",
      "year": "2024",
      "artists": ["King", "Seedhe Maut"]
    },
    {
      "id": "6",
      "title": "Namastute",
      "album": "न",
      "cover": "/covers/namastute.jpeg",
      "audioUrl": "/audio/namastute.mp3",
      "year": "2021",
      "artists": ["Seedhe Maut"]
    }
  ]
  


// Helper functions
export const getTrackById = (id: string): Track | undefined => {
  return SEEDHE_MAUT_TRACKS.find(track => track.id === id);
};

export const getTracksByAlbum = (album: string): Track[] => {
  return SEEDHE_MAUT_TRACKS.filter(track => track.album === album);
};

export const getTracksByYear = (year: string): Track[] => {
  return SEEDHE_MAUT_TRACKS.filter(track => track.year === year);
};

export const getAllAlbums = (): string[] => {
  return [...new Set(SEEDHE_MAUT_TRACKS.map(track => track.album))];
};

export const getAllYears = (): string[] => {
  return [...new Set(SEEDHE_MAUT_TRACKS.map(track => track.year))].sort((a, b) => b.localeCompare(a));
}; 