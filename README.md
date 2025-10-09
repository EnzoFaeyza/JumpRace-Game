# JumpRace

A web-based Indonesian Independence Day themed sack race game (Balap Karung) where players compete against an AI bot in a timing-based jumping challenge.

## Game Overview

JumpRace is inspired by the traditional Indonesian sack race game commonly played during Independence Day celebrations (17 Agustus). Players must time their jumps perfectly using a dynamic timing bar system while racing against an intelligent bot opponent.

## Features

### Core Gameplay
- **Timing-Based Movement**: Press spacebar to activate timing bar, then press again at the right moment to jump
- **Dynamic Difficulty**: Success zone shrinks over time and gets smaller with each successful jump
- **AI Bot Opponent**: Intelligent bot that speeds up based on game events and player performance
- **Stun Mechanics**: Failed jumps result in temporary stunning with visual effects
- **Real-time Timer**: Precise millisecond timing display
- **Leaderboard System**: End-game results showing winner and race statistics

### Advanced Mechanics
- **Adaptive Bot Speed**: Bot accelerates when player fails jumps or when success zone shrinks
- **Progressive Difficulty**: Success zone width decreases with each attempt (30% → 15% minimum)
- **Recovery System**: Failed jumps reset attempt counter to provide wider zones
- **Visual Feedback**: Character brightness effects during stun periods
- **Randomized Challenges**: Success zone position randomizes each jump (10-70% range)

## Image Overview

The game utilizes a comprehensive sprite-based animation system with the following visual assets:

### Character Animation Sprites
- **Player Character**: 7-frame animation sequence located in `img/karakterkita/` directory
  - `urutan1.png` through `urutan6.png` - Movement animation frames
  - `urutan1.png` - Return to idle state (frame 7)
- **Bot Character**: 7-frame animation sequence located in `img/musuh/` directory
  - `urutan1.png` through `urutan6.png` - Bot movement animation frames
  - `urutan1.png` - Return to idle state (frame 7)

### UI and Background Assets
- **Game Logo**: `img/logo.png` - Displayed on home screen and leaderboard
- **Background**: `img/bg.jpg` - Game environment backdrop
- **Audio Control**: `img/volume.png` - Volume control interface element

### Animation System
The sprite animation system cycles through frames at 100ms intervals, with character movement triggered on frame 3 of each animation cycle. Both player and bot characters use identical frame timing but different sprite sets to maintain visual distinction.

## How to Play

1. **Start Game**: Enter your name on the home screen and click "Start"
2. **Movement**: Press `SPACEBAR` to activate the timing bar
3. **Timing**: Press `SPACEBAR` again when the indicator is in the green success zone
4. **Success**: Perfect timing advances your character forward
5. **Failure**: Missing the zone causes a stun effect and speeds up the bot
6. **Victory**: First to reach the finish line wins!

## Technical Features

### Game Mechanics
- Frame-based sprite animation system (7 frames per character)
- Responsive timing bar with 30ms update intervals
- Progressive zone shrinking (0.5% every 200ms)
- Adaptive bot AI with dynamic delay adjustments
- Local storage for player name persistence

### Performance Optimizations
- Efficient interval management with proper cleanup
- Minimal DOM manipulation for smooth animations
- Optimized sprite switching for fluid character movement

## Project Structure

```
JumpRace/
├── home.html              # Main menu and player name input
├── game.html              # Game interface and timing bar UI
├── game.js                # Core game logic and mechanics
├── style.css              # Game styling and responsive design
├── img/
│   ├── karakterkita/      # Player character sprite frames (7 frames)
│   ├── musuh/            # Bot character sprite frames (7 frames)
│   ├── bg.jpg            # Game background
│   ├── logo.png          # Game logo
│   └── volume.png        # Audio controls
└── music/
    └── Hari Merdeka Instrumental.mp3  # Background music
```

## Audio

Features Indonesian Independence Day themed background music that plays throughout the game experience.

## Game States

- **Menu State**: Player name input and game start
- **Playing State**: Active gameplay with timing challenges
- **Win State**: Player reaches finish line first
- **Lose State**: Bot reaches finish line first
- **Leaderboard**: Final results with race statistics

## Installation & Setup

1. Clone or download the project files
2. Ensure all files are in the same directory structure
3. Open `home.html` in a web browser
4. No additional dependencies required - runs entirely in browser

## Game Assets

- **Character Sprites**: 7-frame animation sequences for both player and bot
- **UI Elements**: Custom timing bar with success zone indicators
- **Background**: Indonesian Independence Day themed visuals
- **Audio**: Patriotic instrumental background music

## Contributors

- **Enzo** - Main Game Developer & Core Mechanics
- **Aufa/ES** - Sprite Bug Fixes & Timing Based Movement feature implementation

## Cultural Context

This game celebrates Indonesian Independence Day (17 Agustus) traditions, specifically the popular sack race (balap karung) competition that brings communities together during national celebrations.

---

*Built with vanilla HTML5, CSS3, and JavaScript for maximum compatibility and performance.*