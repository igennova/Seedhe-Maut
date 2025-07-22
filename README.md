# 🎵 Seedhe Maut Player

A raw, urban music player inspired by the Delhi hip-hop duo **Seedhe Maut**. Built with Next.js, featuring a gritty orange aesthetic that captures the underground energy of TBSM (Tera Bhai Seedhe Maut).

![Seedhe Maut Player](https://img.shields.io/badge/TBSM-Seedhe%20Maut-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.4.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## 🔥 Features

- **Urban Aesthetic**: Raw orange theme inspired by Delhi street culture
- **Real Audio Playback**: HTML5 audio with play/pause, next/previous controls
- **Auto-Advance**: Automatically plays next track when current song ends
- **Loop Functionality**: Repeat tracks endlessly
- **Responsive Design**: Works perfectly on desktop and mobile
- **Hindi Script Elements**: Authentic TBSM branding with देवनागरी text
- **Vinyl Animation**: Spinning record effect when playing
- **Glitch Effects**: Anime-inspired hover animations

## 🚀 Quick Setup

### Prerequisites
- Node.js (18.0 or later)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/seedhe-maut-player.git
   cd seedhe-maut-player
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🎧 How to Contribute

We welcome contributions to expand the Seedhe Maut collection! Here's how you can add songs and artwork:

### 📁 Project Structure
```
seedhe-maut-player/
├── public/
│   ├── audio/          # 🎵 MP3 files go here
│   └── covers/         # 🖼️ Album artwork goes here
├── src/
│   └── app/
│       └── data/
│           └── tracks.ts   # 📝 Track metadata
```

### 🎵 Adding Songs

#### Step 1: Add Audio File
1. Get a high-quality MP3 file of a Seedhe Maut track
2. Place it in the `public/audio/` folder
3. Use clear, descriptive filenames (e.g., `nanchaku.mp3`, `maina.mp3`)

#### Step 2: Add Cover Art
1. Find or create cover artwork (preferably 500x500px or higher)
2. Save as `.jpg`, `.png`, or `.svg`
3. Place it in the `public/covers/` folder
4. Use the same filename as the audio (e.g., `nanchaku.jpg` for `nanchaku.mp3`)

#### Step 3: Update Track Data
Edit `src/app/data/tracks.ts` and add your track:

```typescript
{
  id: 'unique-id',
  title: 'Track Name',
  album: 'Album Name',
  cover: '/covers/filename.jpg',
  audioUrl: '/audio/filename.mp3',
  duration: '3:45',
  year: '2023',
  artists: ['Calm', 'Encore ABJ']
}
```

### 🖼️ Cover Art Guidelines

- **Size**: Minimum 400x400px, preferably square
- **Format**: JPG, PNG, or SVG
- **Style**: Should match Seedhe Maut's aesthetic:
  - Dark, urban themes
  - Bold typography
  - Street/anime influences
  - Orange/black color schemes work well

### 📝 Track Information Guidelines

- **Title**: Use official track names
- **Album**: Include EP/album name if available
- **Duration**: Format as "mm:ss" (e.g., "3:45")
- **Year**: Release year
- **Artists**: Always include ['Calm', 'Encore ABJ'] for Seedhe Maut tracks

## 🎨 Customization

### Adding New Tracks
The player automatically uses all tracks from `tracks.ts` for navigation, but only displays the first 6 in the "Featured Tracks" section. Users can navigate through all tracks using the ⏮ ⏭ buttons.

### Color Scheme
The orange theme is defined in `src/app/globals.css`. Key color variables:
- `--color-neon-orange`: Primary orange (#ff4500)
- `--color-electric-orange`: Accent orange (#ff6600)
- `--color-deep-orange`: Deep orange (#ff8c00)

## 🛠️ Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Tech Stack
- **Framework**: Next.js 15.4.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Audio**: HTML5 Audio API
- **Fonts**: Space Grotesk, Orbitron

## 🤝 Contributing Guidelines

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b add-new-tracks`
3. **Add your songs and covers** following the guidelines above
4. **Test locally**: Make sure audio plays and covers display correctly
5. **Commit changes**: `git commit -m "Add [Track Name] by Seedhe Maut"`
6. **Push to branch**: `git push origin add-new-tracks`
7. **Create Pull Request** with details about the tracks added

### Contribution Checklist
- [ ] Audio file is high quality MP3
- [ ] Cover art is appropriate resolution and style
- [ ] Track metadata is accurate and complete
- [ ] Files are named consistently
- [ ] Tested locally and everything works

## 📜 License

This project is for educational and fan purposes. All Seedhe Maut tracks and artwork belong to their respective creators and labels.

## 🙏 Credits

- **Seedhe Maut** (Calm & Encore ABJ) - The legendary Delhi duo
- **Design Inspiration** - Delhi street culture, anime aesthetics, underground hip-hop
- **TBSM Community** - For keeping the culture alive

---

### 🔴 **TBSM** • **तेरा भाई सीधे मौत** • **Delhi Underground**

**Raw • Unfiltered • Non-Stop**
