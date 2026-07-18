import React from 'react';
import { LoginForm } from './LoginForm';

export const App: React.FC = () => {
  return (
    <div className="bg-slate-50 flex items-center justify-center min-h-screen p-4">
      <LoginForm />
    </div>
  );
};

export default App;