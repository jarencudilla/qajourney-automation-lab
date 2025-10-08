import { Page } from '../App';
import {
  MousePointerClick,
  FormInput,
  Zap,
  AlertTriangle,
  Frame,
  Clock,
  LogIn,
  Table2,
  Move,
  Upload,
  Sparkles,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

interface TestModule {
  id: Page;
  title: string;
  description: string;
  icon: typeof MousePointerClick;
  color: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const testModules: TestModule[] = [
  {
    id: 'basic-ui',
    title: 'Basic UI Elements',
    description: 'Practice interacting with buttons, inputs, and basic form elements',
    icon: MousePointerClick,
    color: 'from-[#4a9eff] to-[#3d8ae6]',
    difficulty: 'Beginner',
  },
  {
    id: 'form-validation',
    title: 'Form Validation',
    description: 'Test various input types, required fields, and validation rules',
    icon: FormInput,
    color: 'from-[#4a9eff] to-[#3d8ae6]',
    difficulty: 'Beginner',
  },
  {
    id: 'dynamic-dom',
    title: 'Dynamic DOM',
    description: 'Handle elements that appear, disappear, or change dynamically',
    icon: Zap,
    color: 'from-[#4a9eff] to-[#3d8ae6]',
    difficulty: 'Intermediate',
  },
  {
    id: 'alerts',
    title: 'JavaScript Alerts',
    description: 'Practice handling alerts, confirms, and prompts',
    icon: AlertTriangle,
    color: 'from-[#4a9eff] to-[#3d8ae6]',
    difficulty: 'Intermediate',
  },
  {
    id: 'iframes',
    title: 'iFrame Interaction',
    description: 'Learn to switch contexts and interact with embedded frames',
    icon: Frame,
    color: 'from-[#4a9eff] to-[#3d8ae6]',
    difficulty: 'Intermediate',
  },
  {
    id: 'network-delay',
    title: 'Network Delays',
    description: 'Test scenarios with simulated loading times and async operations',
    icon: Clock,
    color: 'from-[#4a9eff] to-[#3d8ae6]',
    difficulty: 'Intermediate',
  },
  {
    id: 'login',
    title: 'Login Scenario',
    description: 'Practice authentication flows and credential validation',
    icon: LogIn,
    color: 'from-[#4a9eff] to-[#3d8ae6]',
    difficulty: 'Beginner',
  },
  {
    id: 'tables',
    title: 'Table Operations',
    description: 'Extract, sort, filter, and validate data in tables',
    icon: Table2,
    color: 'from-[#4a9eff] to-[#3d8ae6]',
    difficulty: 'Advanced',
  },
  {
    id: 'drag-drop',
    title: 'Drag & Drop',
    description: 'Practice drag-and-drop interactions and coordinate handling',
    icon: Move,
    color: 'from-[#4a9eff] to-[#3d8ae6]',
    difficulty: 'Advanced',
  },
  {
    id: 'file-upload',
    title: 'File Upload',
    description: 'Test file input handling and upload validation',
    icon: Upload,
    color: 'from-[#4a9eff] to-[#3d8ae6]',
    difficulty: 'Intermediate',
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#2d2d44] to-[#1d1d2e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-[#4a9eff]" />
              <h1 className="text-5xl font-bold">QA Testing Playground</h1>
              <Sparkles className="w-8 h-8 text-[#4a9eff]" />
            </div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Master your testing skills with interactive scenarios designed for both manual and automated testing. Practice
              with Selenium, Playwright, Cypress, or explore manually.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="bg-[#4a9eff]/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#4a9eff]/30">
                <span className="font-semibold">10</span> Test Modules
              </div>
              <div className="bg-[#4a9eff]/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#4a9eff]/30">
                <span className="font-semibold">3</span> Frameworks Supported
              </div>
              <div className="bg-[#4a9eff]/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#4a9eff]/30">
                <span className="font-semibold">100%</span> Free
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Interactive Test Modules</h2>
          <p className="text-slate-600">Choose a testing scenario to start practicing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testModules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => onNavigate(module.id)}
                className="group bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-left hover:shadow-lg hover:border-slate-300 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      module.difficulty === 'Beginner'
                        ? 'bg-green-100 text-green-700'
                        : module.difficulty === 'Intermediate'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {module.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-[#4a9eff] transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-slate-600">{module.description}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Use This Playground?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Learn by Doing</h3>
              <p className="text-sm text-slate-600">
                Practice real-world testing scenarios in a safe environment without breaking production systems
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Framework Agnostic</h3>
              <p className="text-sm text-slate-600">
                Use your preferred testing framework - Selenium, Playwright, Cypress, or test manually
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Code Examples Included</h3>
              <p className="text-sm text-slate-600">
                Each module includes ready-to-use code snippets for popular automation frameworks
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
