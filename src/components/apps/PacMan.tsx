import React, { useEffect, useRef, useState } from 'react';

// Constants
const CELL_SIZE = 20;
const GRID_SIZE = 20;
const ROWS = 15;
const COLS = 20;
const MOVEMENT_INTERVAL = 150; // Control movement speed

// Types
type Direction = 'up' | 'down' | 'left' | 'right';
type Position = { x: number; y: number };
type GameState = 'ready' | 'playing' | 'gameOver' | 'win';

const PacMan: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>('ready');
  const [score, setScore] = useState(0);
  const [pacman, setPacman] = useState<Position>({ x: 1, y: 1 });
  const [direction, setDirection] = useState<Direction>('right');
  const [nextDirection, setNextDirection] = useState<Direction>('right');
  const [ghosts, setGhosts] = useState<Position[]>([
    { x: 18, y: 1 },
    { x: 1, y: 13 },
    { x: 18, y: 13 }
  ]);
  const lastMoveTime = useRef(0);
  const animationFrameRef = useRef<number>();
  const gameLoopRef = useRef<NodeJS.Timeout>();

  // Game maze (0: empty, 1: wall, 2: dot)
  const [maze, setMaze] = useState<number[][]>([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
    [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1],
    [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0],
    [1, 1, 1, 1, 2, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 2, 1, 1, 1, 1],
    [0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0],
    [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
    [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0],
    [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  ]);

  // Check if move is valid
  const canMove = (pos: Position, dir: Direction): boolean => {
    let newX = pos.x;
    let newY = pos.y;

    switch (dir) {
      case 'up':
        newY -= 1;
        break;
      case 'down':
        newY += 1;
        break;
      case 'left':
        newX -= 1;
        break;
      case 'right':
        newX += 1;
        break;
    }

    return (
      newX >= 0 &&
      newX < COLS &&
      newY >= 0 &&
      newY < ROWS &&
      maze[newY][newX] !== 1
    );
  };

  // Move pacman
  const movePacman = () => {
    if (gameState !== 'playing') return;

    const newPacman = { ...pacman };
    let moved = false;

    // Try to move in the next direction first
    if (canMove(pacman, nextDirection)) {
      setDirection(nextDirection);
      switch (nextDirection) {
        case 'up':
          newPacman.y -= 1;
          break;
        case 'down':
          newPacman.y += 1;
          break;
        case 'left':
          newPacman.x -= 1;
          break;
        case 'right':
          newPacman.x += 1;
          break;
      }
      moved = true;
    }
    // If can't move in next direction, try current direction
    else if (canMove(pacman, direction)) {
      switch (direction) {
        case 'up':
          newPacman.y -= 1;
          break;
        case 'down':
          newPacman.y += 1;
          break;
        case 'left':
          newPacman.x -= 1;
          break;
        case 'right':
          newPacman.x += 1;
          break;
      }
      moved = true;
    }

    if (moved) {
      setPacman(newPacman);

      // Check for dot collection
      if (maze[newPacman.y][newPacman.x] === 2) {
        const newMaze = [...maze];
        newMaze[newPacman.y][newPacman.x] = 0;
        setMaze(newMaze);
        setScore(prev => prev + 10);

        // Check win condition
        const remainingDots = newMaze.flat().filter(cell => cell === 2).length;
        if (remainingDots === 0) {
          setGameState('win');
        }
      }
    }
  };

  // Game loop
  const gameLoop = () => {
    if (gameState !== 'playing') return;

    const now = Date.now();
    if (now - lastMoveTime.current >= MOVEMENT_INTERVAL) {
      movePacman();

      // Move ghosts
      const newGhosts = ghosts.map(ghost => {
        const possibleMoves = [
          { x: ghost.x, y: ghost.y - 1 },
          { x: ghost.x, y: ghost.y + 1 },
          { x: ghost.x - 1, y: ghost.y },
          { x: ghost.x + 1, y: ghost.y }
        ].filter(move =>
          move.x >= 0 &&
          move.x < COLS &&
          move.y >= 0 &&
          move.y < ROWS &&
          maze[move.y][move.x] !== 1
        );

        if (possibleMoves.length === 0) return ghost;

        // Add bias towards pacman
        const distancesToPacman = possibleMoves.map(move => ({
          move,
          distance: Math.abs(move.x - pacman.x) + Math.abs(move.y - pacman.y)
        }));

        distancesToPacman.sort((a, b) => a.distance - b.distance);

        // 70% chance to move towards pacman, 30% chance for random movement
        return Math.random() < 0.7
          ? distancesToPacman[0].move
          : possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      });

      setGhosts(newGhosts);

      // Check for collisions
      const collision = newGhosts.some(
        ghost => ghost.x === pacman.x && ghost.y === pacman.y
      );

      if (collision) {
        setGameState('gameOver');
        return;
      }

      lastMoveTime.current = now;
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  };

  // Draw game
  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw maze
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const cell = maze[y][x];
        if (cell === 1) {
          ctx.fillStyle = '#3333bb';
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        } else if (cell === 2) {
          ctx.fillStyle = '#ffcc00';
          ctx.beginPath();
          ctx.arc(
            x * CELL_SIZE + CELL_SIZE / 2,
            y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 6,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
    }

    // Draw Pac-Man
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    const pacmanX = pacman.x * CELL_SIZE + CELL_SIZE / 2;
    const pacmanY = pacman.y * CELL_SIZE + CELL_SIZE / 2;
    const mouthAngle = 0.2 * Math.PI * Math.sin(Date.now() / 100);

    let startAngle = 0;
    let endAngle = 2 * Math.PI;

    switch (direction) {
      case 'right':
        startAngle = mouthAngle;
        endAngle = 2 * Math.PI - mouthAngle;
        break;
      case 'left':
        startAngle = Math.PI + mouthAngle;
        endAngle = Math.PI - mouthAngle;
        break;
      case 'up':
        startAngle = 1.5 * Math.PI + mouthAngle;
        endAngle = 1.5 * Math.PI - mouthAngle;
        break;
      case 'down':
        startAngle = 0.5 * Math.PI + mouthAngle;
        endAngle = 0.5 * Math.PI - mouthAngle;
        break;
    }

    ctx.arc(pacmanX, pacmanY, CELL_SIZE / 2, startAngle, endAngle);
    ctx.lineTo(pacmanX, pacmanY);
    ctx.fill();

    // Draw ghosts
    ghosts.forEach((ghost, index) => {
      const colors = ['#ff0000', '#00ffff', '#ff69b4'];
      ctx.fillStyle = colors[index];

      const ghostX = ghost.x * CELL_SIZE + CELL_SIZE / 2;
      const ghostY = ghost.y * CELL_SIZE + CELL_SIZE / 2;

      // Ghost body
      ctx.beginPath();
      ctx.arc(ghostX, ghostY, CELL_SIZE / 2, Math.PI, 0, false);
      ctx.lineTo(ghostX + CELL_SIZE / 2, ghostY + CELL_SIZE / 2);

      for (let i = 0; i < 3; i++) {
        ctx.lineTo(
          ghostX + CELL_SIZE / 2 - (CELL_SIZE / 6) * (i + 1),
          ghostY + CELL_SIZE / 2 - (CELL_SIZE / 6) * (i % 2)
        );
      }

      ctx.lineTo(ghostX - CELL_SIZE / 2, ghostY + CELL_SIZE / 2);
      ctx.lineTo(ghostX - CELL_SIZE / 2, ghostY);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(ghostX - 4, ghostY - 2, 3, 0, Math.PI * 2);
      ctx.arc(ghostX + 4, ghostY - 2, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(ghostX - 4, ghostY - 2, 1.5, 0, Math.PI * 2);
      ctx.arc(ghostX + 4, ghostY - 2, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw score
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);

    // Game state overlays
    if (gameState === 'ready') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffff00';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(
        'CLICK TO START',
        canvas.width / 2,
        canvas.height / 2
      );
      ctx.font = '16px Arial';
      ctx.fillText(
        'Use arrow keys or WASD to move',
        canvas.width / 2,
        canvas.height / 2 + 30
      );
    } else if (gameState === 'gameOver' || gameState === 'win') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '24px Arial';
      ctx.textAlign = 'center';

      if (gameState === 'gameOver') {
        ctx.fillStyle = '#ff0000';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 30);
      } else {
        ctx.fillStyle = '#00ff00';
        ctx.fillText('YOU WIN!', canvas.width / 2, canvas.height / 2 - 30);
      }

      ctx.fillStyle = '#ffffff';
      ctx.fillText(
        `Score: ${score}`,
        canvas.width / 2,
        canvas.height / 2 + 10
      );
      ctx.fillText(
        'CLICK TO RESTART',
        canvas.width / 2,
        canvas.height / 2 + 50
      );
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          setNextDirection('up');
          break;
        case 'arrowdown':
        case 's':
          setNextDirection('down');
          break;
        case 'arrowleft':
        case 'a':
          setNextDirection('left');
          break;
        case 'arrowright':
        case 'd':
          setNextDirection('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Initialize canvas and start game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = COLS * CELL_SIZE;
    canvas.height = ROWS * CELL_SIZE;

    // Start animation loop
    const animate = () => {
      drawGame();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Start game loop if playing
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(gameLoop, MOVEMENT_INTERVAL);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState]);

  // Reset game
  const resetGame = () => {
    setPacman({ x: 1, y: 1 });
    setGhosts([
      { x: 18, y: 1 },
      { x: 1, y: 13 },
      { x: 18, y: 13 }
    ]);
    setDirection('right');
    setNextDirection('right');
    setScore(0);
    setGameState('ready');
    lastMoveTime.current = 0;
    setMaze([
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
      [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1],
      [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0],
      [1, 1, 1, 1, 2, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 2, 1, 1, 1, 1],
      [0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0],
      [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
      [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0],
      [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    ]);
  };

  // Handle canvas click
  const handleCanvasClick = () => {
    if (gameState === 'ready') {
      setGameState('playing');
      lastMoveTime.current = Date.now();
    } else if (gameState === 'gameOver' || gameState === 'win') {
      resetGame();
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-black p-4">
      <div className="mb-4">
        <h2 className="text-yellow-400 text-xl font-bold text-center">PAC-MAN</h2>
        <div className="text-white">Score: {score}</div>
      </div>
      
      <div 
        className="border-4 border-blue-800 cursor-pointer"
        onClick={handleCanvasClick}
      >
        <canvas
          ref={canvasRef}
          className="bg-black"
        />
      </div>
      
      <div className="mt-4 text-white text-sm text-center">
        {gameState === 'ready' && 'Click to start! Use arrow keys or WASD to move'}
        {gameState === 'playing' && 'Collect all dots to win!'}
        {(gameState === 'gameOver' || gameState === 'win') && 'Click to restart'}
      </div>
    </div>
  );
};

export default PacMan;