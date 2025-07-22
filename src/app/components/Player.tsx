'use client'
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Track, SEEDHE_MAUT_TRACKS } from '../data/tracks';

export default function Player() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Show only first 6 tracks in discography, but use all for navigation
  const displayedTracks = SEEDHE_MAUT_TRACKS.slice(0, 6);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };
    

    
    const handleLoadStart = () => {
      setIsLoading(true);
    };
    
    const handleCanPlay = () => {
      setIsLoading(false);

    };
    
    const handleLoadedMetadata = () => {
 
    };
    
    const handleEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        // Auto-advance to next track
        handleNextTrack();
      }
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setIsLoading(false);
      setIsPlaying(false);
    };

    // Add all event listeners
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [isLooping, currentTrackIndex]);

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    // Reset states
    setCurrentTime(0);

    setIsLoading(true);

    // Set new source
    audio.src = currentTrack.audioUrl;
    audio.load();
    
    // Try to play if should be playing
    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Play failed:', error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack]);

  // Handle play/pause state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Play failed:', error);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  // Set loop property
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = isLooping;
    }
  }, [isLooping]);

  if (!mounted) {
    return null; // Prevent SSR issues
  }

  const handlePlayPause = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (track: Track) => {
    const trackIndex = SEEDHE_MAUT_TRACKS.findIndex(t => t.id === track.id);
    setCurrentTrack(track);
    setCurrentTrackIndex(trackIndex);
    setIsPlaying(true);
  };

  const handleNextTrack = () => {
    if (currentTrackIndex === -1) return;
    
    const nextIndex = (currentTrackIndex + 1) % SEEDHE_MAUT_TRACKS.length;
    const nextTrack = SEEDHE_MAUT_TRACKS[nextIndex];
    
    setCurrentTrack(nextTrack);
    setCurrentTrackIndex(nextIndex);
    // Keep playing state if currently playing
    if (isPlaying) {
      setIsPlaying(true);
    }
  };

  const handlePreviousTrack = () => {
    if (currentTrackIndex === -1) return;
    
    const prevIndex = currentTrackIndex === 0 ? SEEDHE_MAUT_TRACKS.length - 1 : currentTrackIndex - 1;
    const prevTrack = SEEDHE_MAUT_TRACKS[prevIndex];
    
    setCurrentTrack(prevTrack);
    setCurrentTrackIndex(prevIndex);
    // Keep playing state if currently playing
    if (isPlaying) {
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

 

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 md:px-4 sm:px-2 py-8 md:py-12 sm:py-6 relative">
      {/* Audio Element with better configuration */}
      <audio
        ref={audioRef}
        preload="metadata"
        className="hidden"
        crossOrigin="anonymous"
      />
      
      {/* TBSM Branding */}
      <div className="tbsm-brand text-sm md:text-sm sm:text-xs">TBSM</div>
      
      {/* Background street pattern */}
      <div className="fixed inset-0 street-pattern opacity-10 pointer-events-none" />

      {/* Header */}
      <header className="text-center mb-16 mobile-spacing relative">
        <h1 className="seedhe-glow text-6xl md:text-8xl font-black tracking-wider mb-6">
          SEEDHE MAUT
        </h1>
        <div className="mobile-header-subtitle flex items-center justify-center gap-8 text-xl md:text-3xl mb-4">
          <span className="hindi-text text-2xl md:text-4xl">सीधे मौत</span>
          <span className="text-gray-400">×</span>
          <span className="text-orange-400 font-bold tracking-widest">NON STOP</span>
        </div>
        <div className="text-gray-500 text-sm md:text-base uppercase tracking-[0.3em]">
          Delhi • Hip-Hop • Underground
        </div>
      </header>

      {/* Main Player */}
      <main className="urban-container p-8 md:p-12 mb-8">
        {/* Current Track Display */}
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-8 sm:gap-6 mb-16 mobile-spacing">
          {/* Album Art */}
          <div className="mobile-album-art relative w-80 h-80 group anime-glow">
            <div className="absolute inset-0 rounded-lg overflow-hidden border-4 border-transparent bg-gradient-to-r from-cyan-500 to-orange-500 p-1">
              <div className="w-full h-full rounded-lg overflow-hidden bg-black">
                <Image
                  src={currentTrack?.cover || '/covers/default.svg'}
                  alt={currentTrack?.title || 'Select a track'}
                  fill
                  className={`object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 ${
                    isPlaying ? 'animate-pulse' : ''
                  }`}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-orange-400 animate-pulse text-sm md:text-base">Loading...</div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Vinyl record effect */}
            {currentTrack && (
              <div className={`absolute top-1/2 left-1/2 w-16 h-16 md:w-16 md:h-16 sm:w-12 sm:h-12 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full border-4 border-orange-400 opacity-80 transition-transform ${
                isPlaying ? 'animate-spin' : ''
              }`}>
                <div className="absolute top-1/2 left-1/2 w-4 h-4 md:w-4 md:h-4 sm:w-3 sm:h-3 -translate-x-1/2 -translate-y-1/2 bg-orange-400 rounded-full"></div>
              </div>
            )}
          </div>

          {/* Track Info & Controls */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="mobile-track-title text-4xl md:text-5xl font-black mb-4 text-orange-400">
              {currentTrack?.title || 'SELECT TRACK'}
            </h2>
            <div className="mobile-track-album text-xl md:text-2xl text-gray-400 mb-2">
              {currentTrack?.album || 'Choose your poison'}
            </div>
            <div className="mobile-track-info text-orange-400 text-lg mb-8 font-mono">
              {currentTrack?.year && `${currentTrack.year} • `}
     
              {currentTrack?.artists && (
                <div className="text-gray-500 text-sm mt-1">
                  {currentTrack.artists.join(' × ')}
                </div>
              )}
            </div>

            {/* Main Controls */}
            <div className="mobile-control-spacing flex items-center justify-center lg:justify-start gap-6 mb-8">
              {/* Previous Button */}
              <button
                className="street-button w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                onClick={handlePreviousTrack}
                disabled={!currentTrack || currentTrackIndex === -1}
              >
                ⏮
              </button>
              
              {/* Play/Pause Button */}
              <button
                className="street-button play-button w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePlayPause}
                disabled={!currentTrack || isLoading}
              >
                {isLoading ? '⏳' : isPlaying ? '⏸' : '▶'}
              </button>
              
              {/* Next Button */}
              <button
                className="street-button w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                onClick={handleNextTrack}
                disabled={!currentTrack || currentTrackIndex === -1}
              >
                ⏭
              </button>
              
              {/* Loop Button */}
              <button
                className={`loop-button w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black transition-all duration-300 ${
                  isLooping ? 'active' : ''
                }`}
                onClick={() => setIsLooping(!isLooping)}
              >
                🔁
              </button>
            </div>
          </div>
        </div>

        {/* Track List */}
        <section>
          <div className="flex items-center justify-between mb-8 mobile-spacing">
            <h3 className="mobile-section-title text-3xl font-black text-orange-400 uppercase tracking-wider">
              FEATURED TRACKS
            </h3>
            <div className="hindi-text text-lg md:text-lg sm:text-base">ट्रैक लिस्ट</div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:gap-4 sm:gap-3">
            {displayedTracks.map((track, index) => (
              <button
                key={track.id}
                className={`track-card group ${
                  currentTrack?.id === track.id ? 'border-orange-400 bg-orange-400/10' : ''
                }`}
                onClick={() => handleTrackSelect(track)}
              >
                <div className="mobile-track-image relative w-16 h-16 rounded overflow-hidden border-2 border-gray-600 group-hover:border-orange-400 transition-colors">
                  <Image
                    src={track.cover}
                    alt={track.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-orange-400 font-mono text-sm font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="font-bold text-lg md:text-lg sm:text-base group-hover:text-orange-400 transition-colors">
                      {track.title}
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm mb-1">
                    {track.album} • {track.year}
                  </div>
                
                </div>

                {/* Playing indicator */}
                {currentTrack?.id === track.id && isPlaying && (
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-4 md:h-4 sm:h-3 bg-orange-400 animate-pulse"></div>
                    <div className="w-1 h-6 md:h-6 sm:h-4 bg-orange-400 animate-pulse delay-100"></div>
                    <div className="w-1 h-3 md:h-3 sm:h-2 bg-orange-400 animate-pulse delay-200"></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Show total tracks info */}
          {SEEDHE_MAUT_TRACKS.length > displayedTracks.length && (
            <div className="text-center mt-8 text-gray-500">
              <div className="text-sm">
                Showing {displayedTracks.length} of {SEEDHE_MAUT_TRACKS.length} tracks
              </div>
              <div className="text-xs mt-1 opacity-70">
                Use ⏭ ⏮ to navigate through all tracks
              </div>
            </div>
          )}
        </section>

        {/* Footer Credits */}
        <footer className="mt-16 pt-8 border-t border-gray-800 text-center">
          <div className="text-gray-500 text-sm mb-4">
            <span className="hindi-text text-orange-400">TBSM</span> • 
            Tera Bhai Seedhe Maut • Delhi Underground
          </div>
          <div className="text-xs text-gray-600 uppercase tracking-widest">
            Raw • Unfiltered • Non-Stop
          </div>
        </footer>
      </main>
    </div>
  );
} 