// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import type { ReactNode } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dshboard';
import Auth from './pages/Auth';
import BarterExchange from './components/BarterExchange';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  return token ? <Layout>{children}</Layout> : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="h-screen w-screen overflow-hidden bg-slate-950 flex flex-col">
          <Routes>
            {/* Public Auth Route */}
            <Route path="/" element={<Auth />} />
            
            {/* Protected Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Protected Barter Exchange */}
            <Route
              path="/barter"
              element={
                <ProtectedRoute>
                  <BarterExchange />
                </ProtectedRoute>
              }
            />
            
            {/* Catch-all redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
