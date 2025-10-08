import { useState } from 'react';
import HomePage from './pages/HomePage';
import BasicUIPage from './pages/BasicUIPage';
import FormValidationPage from './pages/FormValidationPage';
import DynamicDOMPage from './pages/DynamicDOMPage';
import AlertsPage from './pages/AlertsPage';
import IFramesPage from './pages/IFramesPage';
import NetworkDelayPage from './pages/NetworkDelayPage';
import LoginPage from './pages/LoginPage';
import TablesPage from './pages/TablesPage';
import DragDropPage from './pages/DragDropPage';
import FileUploadPage from './pages/FileUploadPage';

export type Page = 'home' | 'basic-ui' | 'form-validation' | 'dynamic-dom' | 'alerts' | 'iframes' | 'network-delay' | 'login' | 'tables' | 'drag-drop' | 'file-upload';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'basic-ui':
        return <BasicUIPage onNavigate={setCurrentPage} />;
      case 'form-validation':
        return <FormValidationPage onNavigate={setCurrentPage} />;
      case 'dynamic-dom':
        return <DynamicDOMPage onNavigate={setCurrentPage} />;
      case 'alerts':
        return <AlertsPage onNavigate={setCurrentPage} />;
      case 'iframes':
        return <IFramesPage onNavigate={setCurrentPage} />;
      case 'network-delay':
        return <NetworkDelayPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'tables':
        return <TablesPage onNavigate={setCurrentPage} />;
      case 'drag-drop':
        return <DragDropPage onNavigate={setCurrentPage} />;
      case 'file-upload':
        return <FileUploadPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">{renderPage()}</div>;
}

export default App;
