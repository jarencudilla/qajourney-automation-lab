import { ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check, RotateCcw, ArrowLeft } from 'lucide-react';
import { Page } from '../App';

interface TestScenarioProps {
  title: string;
  description: string;
  goals: string[];
  children: ReactNode;
  onReset?: () => void;
  onNavigate: (page: Page) => void;
  codeSnippets?: {
    selenium?: string;
    playwright?: string;
    cypress?: string;
  };
}

export default function TestScenario({ title, description, goals, children, onReset, onNavigate, codeSnippets }: TestScenarioProps) {
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [codeExpanded, setCodeExpanded] = useState(false);
  const [notes, setNotes] = useState('');
  const [activeFramework, setActiveFramework] = useState<'selenium' | 'playwright' | 'cypress'>('selenium');
  const [copied, setCopied] = useState(false);

  const saveNotes = () => {
    localStorage.setItem(`qa-notes-${title}`, notes);
    alert('Notes saved!');
  };

  const clearNotes = () => {
    setNotes('');
    localStorage.removeItem(`qa-notes-${title}`);
  };

  const copyCode = () => {
    const code = codeSnippets?.[activeFramework] || '';
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 mb-6 text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Back to All Tests</span>
      </button>

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
          <p className="text-slate-600">{description}</p>
        </div>
        {onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
            title="Reset test scenario"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Test Goals
            </h2>
            <ul className="space-y-2">
              {goals.map((goal, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <button
              onClick={() => setNotesExpanded(!notesExpanded)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <span className="text-2xl">📝</span>
                Notes
              </h2>
              {notesExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {notesExpanded && (
              <div className="px-6 pb-6">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your test observations here..."
                  className="w-full h-32 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={saveNotes}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={clearNotes}
                    className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          {codeSnippets && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => setCodeExpanded(!codeExpanded)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <span className="text-2xl">💻</span>
                  Code Examples
                </h2>
                {codeExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {codeExpanded && (
                <div className="px-6 pb-6">
                  <div className="flex gap-2 mb-3">
                    {Object.keys(codeSnippets).map((framework) => (
                      <button
                        key={framework}
                        onClick={() => setActiveFramework(framework as typeof activeFramework)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          activeFramework === framework
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {framework.charAt(0).toUpperCase() + framework.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <pre className="bg-slate-900 text-slate-100 text-xs p-4 rounded-lg overflow-x-auto">
                      <code>{codeSnippets[activeFramework]}</code>
                    </pre>
                    <button
                      onClick={copyCode}
                      className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                      title="Copy code"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
