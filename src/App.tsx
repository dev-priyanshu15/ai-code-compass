
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Reports from '@/pages/Reports';
import Repositories from '@/pages/Repositories';
import Analysis from '@/pages/Analysis';
import Vulnerabilities from '@/pages/Vulnerabilities';
import Export from '@/pages/Export';
import './App.css';

// Create placeholder component for Settings
const Settings = () => <Layout><h1 className="text-2xl font-bold">Settings</h1></Layout>;

import Layout from '@/components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/repositories" element={<Repositories />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/vulnerabilities" element={<Vulnerabilities />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/export" element={<Export />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
