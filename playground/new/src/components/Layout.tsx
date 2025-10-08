import { ReactNode } from 'react';
import { Page } from '../App';
import { Home, Coffee, BookOpen } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  onNavigate: (page: Page) => void;
}

export default function Layout({ children, onNavigate }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-[#2d2d44] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <img
                src="/qajourney-logo.png"
                alt="QA Journey Logo"
                className="h-12 w-12"
              />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">QA Journey</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://qajourney.net"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:bg-[#3d3d54] rounded-lg transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Blog</span>
              </a>
              <a
                href="https://buymeacoffee.com/qajourney"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#4a9eff] hover:bg-[#3d8ae6] rounded-lg transition-colors"
              >
                <Coffee className="w-4 h-4" />
                <span>Support Me</span>
              </a>
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:bg-[#3d3d54] rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-[#2d2d44] text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm">
            <p className="font-medium text-white">QA Testing Playground</p>
            <p className="mt-1 text-slate-300">The new playground for QA professionals - Built for testers, by testers</p>
            <p className="mt-2 text-xs text-slate-400">
              Part of{' '}
              <a href="https://qajourney.net" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:text-[#5eafff] font-medium">
                QAJourney.net
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
