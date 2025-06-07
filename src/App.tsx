import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { LoginForm } from './components/auth/LoginForm';
import { DiscordLogin } from './components/auth/DiscordLogin';
import { Dashboard } from './pages/Dashboard';
import { Servers } from './pages/Servers';
import { Overlays } from './pages/Overlays';
import { Progress } from './pages/Progress';
import { Settings } from './pages/Settings';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();
  const [loginType, setLoginType] = useState<'discord' | 'admin'>('discord');
  
  if (!isAuthenticated) {
    return (
      <>
        {loginType === 'discord' ? (
          <DiscordLogin onSwitchToAdmin={() => setLoginType('admin')} />
        ) : (
          <LoginForm onSwitchToDiscord={() => setLoginType('discord')} />
        )}
        <Toaster position="top-right" />
      </>
    );
  }
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/servers" element={<Servers />} />
              <Route path="/overlays" element={<Overlays />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/\" replace />} />
            </Routes>
          </main>
        </div>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;