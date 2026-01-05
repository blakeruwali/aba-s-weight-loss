// Sound effect URLs (using free sound effects)
export const sounds = {
  sadTrombone: "https://www.myinstants.com/media/sounds/sad-trombone.mp3",
  victory: "https://www.myinstants.com/media/sounds/tada-fanfare-a.mp3",
  pop: "https://www.myinstants.com/media/sounds/pop.mp3",
};

export const playSound = (soundUrl: string, volume = 0.3) => {
  try {
    const audio = new Audio(soundUrl);
    audio.volume = volume;
    audio.play().catch(() => {
      // Silently fail if autoplay is blocked
    });
  } catch {
    // Silently fail
  }
};

export const playSadTrombone = () => playSound(sounds.sadTrombone, 0.2);
export const playVictory = () => playSound(sounds.victory, 0.3);
export const playPop = () => playSound(sounds.pop, 0.4);
