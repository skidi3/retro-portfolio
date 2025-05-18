
// PacMan.tsx
import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

type Direction = 'up' | 'down' | 'left' | 'right';
type Position = { x: number; y: number };
type GameState = 'ready' | 'playing' | 'gameOver' | 'win';

const CELL_SIZE = 24;
const ROWS = 21;
const COLS = 21;

const useSound = (src: string) => {
  const ref = useRef<HTMLAudioElement>();
  useEffect(() => {
    ref.current = new Audio(src);
  }, [src]);
  return () => ref.current?.play();
};

const PacMan: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>('ready');
  const [pacman, setPacman] = useState<Position>({ x: 1, y: 1 });
  const [direction, setDirection] = useState<Direction>('right');
  const [nextDirection, setNextDirection] = useState<Direction>('right');
  const [ghosts, setGhosts] = useState<Position[]>([{ x: 19, y: 1 }, { x: 1, y: 19 }]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [maze, setMaze] = useState<number[][]>([]);
  const moveInterval = useRef<number>();
  const dotSound = useSound('https://actions.google.com/sounds/v1/cartoon/pop.ogg');
  const deathSound = useSound('https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg');

  const getMaze = () => Array.from({ length: ROWS }, (_, y) =>
    Array.from({ length: COLS }, (_, x) =>
      y === 0 || y === ROWS - 1 || x === 0 || x === COLS - 1 || (x % 2 === 0 && y % 2 === 0) ? 1 : 2
    )
  );

  const draw = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, COLS * CELL_SIZE, ROWS * CELL_SIZE);
    maze.forEach((row, y) => row.forEach((cell, x) => {
      if (cell === 1) {
        ctx.fillStyle = '#333';
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      } else if (cell === 2) {
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(x * CELL_SIZE + 12, y * CELL_SIZE + 12, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }));
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(pacman.x * CELL_SIZE + 12, pacman.y * CELL_SIZE + 12, 10, 0, Math.PI * 2);
    ctx.fill();
    ghosts.forEach((g, i) => {
      ctx.fillStyle = ['#f00', '#0ff', '#f0f'][i % 3];
      ctx.beginPath();
      ctx.arc(g.x * CELL_SIZE + 12, g.y * CELL_SIZE + 12, 10, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const canMove = (pos: Position, dir: Direction) => {
    const { x, y } = getNextPos(pos, dir);
    return maze[y]?.[x] !== 1;
  };

  const getNextPos = (p: Position, d: Direction): Position => ({
    x: d === 'left' ? p.x - 1 : d === 'right' ? p.x + 1 : p.x,
    y: d === 'up' ? p.y - 1 : d === 'down' ? p.y + 1 : p.y,
  });

  const move = () => {
    if (canMove(pacman, nextDirection)) setDirection(nextDirection);
    const newPos = getNextPos(pacman, direction);
    if (maze[newPos.y][newPos.x] === 2) {
      dotSound();
      maze[newPos.y][newPos.x] = 0;
      setScore(s => s + 10);
    }
    setPacman(newPos);
    setMaze([...maze]);
    if (!maze.flat().includes(2)) {
      setGameState('win');
      confetti();
      setHighScore(prev => Math.max(prev, score));
      clearInterval(moveInterval.current);
    }
    const newGhosts = ghosts.map(g => {
      const dirs = ['up', 'down', 'left', 'right'] as Direction[];
      const options = dirs.filter(d => canMove(g, d)).map(d => ({ pos: getNextPos(g, d), dir: d }));
      return options.length ? options.reduce((a, b) =>
        dist(a.pos, pacman) < dist(b.pos, pacman) ? a : b).pos : g;
    });
    setGhosts(newGhosts);
    if (newGhosts.some(g => g.x === newPos.x && g.y === newPos.y)) {
      deathSound();
      setGameState('gameOver');
      clearInterval(moveInterval.current);
    }
    draw();
  };

  const dist = (a: Position, b: Position) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'arrowup'].includes(key)) setNextDirection('up');
      if (['s', 'arrowdown'].includes(key)) setNextDirection('down');
      if (['a', 'arrowleft'].includes(key)) setNextDirection('left');
      if (['d', 'arrowright'].includes(key)) setNextDirection('right');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const startGame = () => {
    const newMaze = getMaze();
    setMaze(newMaze);
    setPacman({ x: 1, y: 1 });
    setGhosts([{ x: 19, y: 1 }, { x: 1, y: 19 }]);
    setScore(0);
    setDirection('right');
    setNextDirection('right');
    setGameState('playing');
    moveInterval.current = window.setInterval(move, 150);
  };

  useEffect(() => {
    draw();
    const saved = localStorage.getItem('pacman_highscore');
    if (saved) setHighScore(Number(saved));
  }, []);

  useEffect(() => {
    if (gameState === 'win' || gameState === 'gameOver') {
      localStorage.setItem('pacman_highscore', String(Math.max(score, highScore)));
    }
  }, [gameState]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-black text-white font-mono">
      <h1 className="text-yellow-400 text-2xl mb-2">PAC-MAN</h1>
      <p>Score: {score} | High Score: {Math.max(score, highScore)}</p>
      <canvas
        ref={canvasRef}
        width={COLS * CELL_SIZE}
        height={ROWS * CELL_SIZE}
        onClick={startGame}
        className="border border-yellow-500 my-4 bg-black cursor-pointer"
      />
      <p className="text-sm">
        {gameState === 'ready' && 'Click to Start'} 
        {gameState === 'playing' && 'Use Arrow Keys / WASD'} 
        {gameState === 'gameOver' && 'Game Over. Click to Restart'} 
        {gameState === 'win' && 'You Win! Click to Restart 🎉'}
      </p>
    </div>
  );
};

export default PacMan;
