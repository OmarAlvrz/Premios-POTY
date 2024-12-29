import React from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthButton: React.FC = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  return (
    <div className="absolute top-4 right-4">
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-white">{user.email}</span>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-full flex items-center gap-2"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-4 h-4"
          />
          Iniciar Sesión con Google
        </button>
      )}
    </div>
  );
}

export default AuthButton;