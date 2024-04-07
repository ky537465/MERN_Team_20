import React from 'react';

function SidePanelContent({ isExpanded, doLogout }) {
  return (
    <div>
      {/* Logo */}
      {isExpanded && (
        <div className="flex items-center justify-left py-3">
          <img src="logo.png" alt="Logo" className="w-20 h-20" />
          <span className="text-2xl font-bold ml-2">Money Master</span>
        </div>
      )}
      {/* Navigation */}
      {isExpanded && (
        <nav className="flex-grow">
          <ul>
            <li>
              <a href="/account" className="block font-semibold py-2 px-4 hover:bg-gray-100">Dashboard</a>
            </li>
            <li>
              <a href="/transfer" className="block font-semibold py-2 px-4 hover:bg-gray-100">Transfer</a>
            </li>
            <li>
              <a href="/profile" className="block font-semibold py-2 px-4 hover:bg-gray-100">User Account</a>
            </li>
          </ul>
        </nav>
      )}
      {/* Logout Button */}
      {isExpanded && (
        <div>
          <button onClick={doLogout} className="w-full py-3 bg-red-500 text-white font-semibold hover:bg-red-600 focus:outline-none">
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default SidePanelContent;
