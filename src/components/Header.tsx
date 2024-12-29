import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="glass rounded-lg p-4 mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img 
          src="/poty-logo.png" 
          alt="POTY Awards" 
          className="w-32 h-auto animate-float"
        />
      </div>
      
      {user && (
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-full transition-all"
        >
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>
      )}
    </header>
  );
}

export default Header;