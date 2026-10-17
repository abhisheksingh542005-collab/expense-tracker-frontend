import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Wallet } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-[#1E3A8A] text-white shadow-lg py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Wallet className="h-6 w-6" />
        <h1 className="text-xl font-bold tracking-wide">ExpenseTracker</h1>
      </div>

      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Hello, {user.name}</span>
          <button
            onClick={logout}
            className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-xs px-3 py-1.5 rounded-lg transition"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;