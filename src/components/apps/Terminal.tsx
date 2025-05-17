import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store';
import { useAudio } from '../../hooks/useAudio';

const Terminal: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { playSound } = useAudio();
  const { openWindow } = useStore();
  
  // Commands handler
  const handleCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase().trim();
    let output = '';
    
    // Add the command to history
    const newHistory = [...history, `> ${cmd}`];
    
    // Update command history
    if (cmd.trim() !== '') {
      setCommandHistory(prev => [cmd, ...prev].slice(0, 10));
    }
    
    // Process command
    if (lowerCmd === '') {
      // Empty command, just add a new line
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
  easteregg     - Find easter eggs
  game          - Play a game
  echo [text]   - Display text
  date          - Show current date and time
  ls            - List files
  cd [dir]      - Change directory
  cat [file]    - View file contents
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
      output = 'Opening game...';
      openWindow('pacman');
    } else if (lowerCmd === 'easteregg') {
      output = 'You found an easter egg! 🥚\nTry typing "sudo make me a dev" or "npx hire-nikhil"';
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
    } else if (lowerCmd === 'ls') {
      output = `
Directory listing:
resume.pdf
projects/
games/
contact.txt
secrets.txt (hidden)
`;
    } else if (lowerCmd.startsWith('cat ')) {
      const file = cmd.substring(4).trim();
      if (file === 'resume.txt') {
        output = 'Opening resume file...';
        openWindow('notepad');
      } else if (file === 'contact.txt') {
        output = `
Contact Information:
- Email: developer@example.com
- GitHub: github.com/developer
- LinkedIn: linkedin.com/in/developer
- Twitter: @developer
`;
      } else {
        output = `File not found: ${file}`;
      }
    } else if (lowerCmd === 'sudo make me a dev') {
      output = 'Access granted! Congratulations, you are now a developer! 🎉\nYour powers will arrive in 3-5 business days.';
      playSound('achievement');
    } else if (lowerCmd === 'npx hire-nikhil') {
      output = 'Installing candidate...\nDependencies checked...\nGetting references...\nReviewing experience...\nSuccess! Great choice! 🚀';
      playSound('achievement');
    } else if (lowerCmd.startsWith('sudo ')) {
      output = 'Permission granted. With great power comes great responsibility.';
    } else if (lowerCmd === 'exit') {
      output = 'Cannot exit terminal. You are trapped here forever. Just kidding!';
    } else {
      output = `Command not found: ${cmd}\nType 'help' for available commands.`;
    }
    
    // Update history with output
    setHistory([...newHistory, output]);
    
    // Scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 0);
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  // Handle key presses
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
  
  // Auto focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Initial welcome message
    setHistory([
      'Welcome to RetroOS Terminal v1.0',
      'Type "help" for available commands.',
      ''
    ]);
  }, []);
  
  // Refocus input when clicking on terminal
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className="h-full bg-black text-green-500 font-mono p-2 flex flex-col"
      onClick={handleTerminalClick}
    >
      <div 
        ref={terminalRef}
        className="flex-1 overflow-auto whitespace-pre-wrap mb-2"
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
  );
};

export default Terminal;