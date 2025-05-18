import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store';
import { useAudio } from '../../hooks/useAudio';

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { playSound } = useAudio();
  const { openWindow } = useStore();

  const handleCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase().trim();
    let output = '';
    const newHistory = [...history, `> ${cmd}`];

    if (cmd.trim() !== '') {
      setCommandHistory(prev => [cmd, ...prev].slice(0, 10));
    }

    if (lowerCmd === '') {
      setHistory(newHistory);
      return;
    } else if (lowerCmd === 'help') {
      output = `
Available commands:
  help          - Show this help
  clear         - Clear terminal
  resume        - View my resume
  projects      - Open projects folder
  skills        - List my skills
  contact       - Contact information
  game          - Play a game
  echo [text]   - Display text
  date          - Show current date and time
  sudo [cmd]    - Execute with privileges
`;
    } else if (lowerCmd === 'clear') {
      setHistory([]);
      return;
    } else if (lowerCmd === 'resume') {
      output = 'Opening resume...';
      openWindow('notepad');
    } else if (lowerCmd === 'projects') {
      output = 'Opening projects folder...';
      openWindow('explorer');
    } else if (lowerCmd === 'game') {
      output = 'Launching Pac-Man...';
      openWindow('pacman');
    } else if (lowerCmd === 'skills') {
      output = `
Technical Skills:
- Frontend: React, Vue, Angular, TypeScript
- Backend: Node.js, Express, Python, Django
- Database: PostgreSQL, MongoDB, Redis
- DevOps: Docker, Kubernetes, AWS, GCP
- Mobile: React Native, Flutter
- Other: GraphQL, WebSockets, WebRTC
`;
    } else if (lowerCmd === 'contact') {
      output = `
Contact Information:
- Email: developer@example.com
- GitHub: github.com/developer
- LinkedIn: linkedin.com/in/developer
- Twitter: @developer
`;
    } else if (lowerCmd.startsWith('echo ')) {
      output = cmd.substring(5);
    } else if (lowerCmd === 'date') {
      output = new Date().toString();
    } else if (lowerCmd.startsWith('sudo ')) {
      output = 'Permission granted. With great power comes great responsibility.';
    } else {
      output = `Command not found: ${cmd}\nType 'help' for available commands.`;
    }

    setHistory([...newHistory, output]);
    setTimeout(() => {
      terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight });
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
      setInput('');
      setHistoryIndex(-1);
      playSound('keypress');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else {
      playSound('keypress');
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    setHistory([
      ` __     ______  _    _   _   _      _                      `,
      ` \\ \\   / / __ \\| |  | | | \\ | |    | |                     `,
      `  \\ \\_/ / |  | | |  | | |  \\| | ___| |_ __ _ ___ ___  ___  `,
      `   \\   /| |  | | |  | | | . \` |/ _ \\ __/ _\` / __/ __|/ _ \\ `,
      `    | | | |__| | |__| | | |\\  |  __/ || (_| \\__ \\__ \\  __/ `,
      `    |_|  \\____/ \\____/  |_| \\_|\\___|\\__\\__,_|___/___/\\___| `,
      `                                                                   `,
      'Welcome to Yet Another Portfolio',
      `                                                                   `,
      'Type "help" for available commands.',
      ''
    ]);
  }, []);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="h-full w-full bg-black text-green-500 font-mono text-sm p-3 relative"
      onClick={handleTerminalClick}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')`,
          backgroundSize: '64px',
          backgroundRepeat: 'repeat',
          opacity: 0.05
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words pr-2 mb-2"
        >
          {history.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>

        <div className="flex items-center">
          <span className="mr-2">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-green-500 focus:outline-none font-mono"
            autoFocus
          />
          <span className="animate-pulse ml-1">_</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
