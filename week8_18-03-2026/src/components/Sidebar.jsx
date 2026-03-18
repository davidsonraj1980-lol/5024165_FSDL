import React from 'react';

function Sidebar({ currentView, setCurrentView }) {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low flex flex-col p-4 gap-y-2 z-40">
      <div className="mb-8 px-2 py-4">
        <span className="text-lg font-black text-primary tracking-tighter">Architect Alpha</span>
        <p className="text-xs text-on-surface-variant opacity-70">Premium Plan</p>
      </div>
      <nav className="flex flex-col gap-y-1">
        <a onClick={() => setCurrentView('dashboard')} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold cursor-pointer transition-all ${currentView === 'dashboard' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}>
          <span className="material-symbols-outlined">dashboard</span> <span className="font-medium">Dashboard</span>
        </a>
        <a onClick={() => setCurrentView('ledger')} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold cursor-pointer transition-all ${currentView === 'ledger' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}>
          <span className="material-symbols-outlined">receipt_long</span> <span className="font-medium">Transactions</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-all" href="#">
          <span className="material-symbols-outlined">leaderboard</span> <span className="font-medium">Reports</span>
        </a>
      </nav>
      <div className="mt-8 px-2">
        <button onClick={() => setCurrentView('form')} className="w-full py-3 bg-primary text-on-primary rounded-xl font-semibold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">add</span> Add Transaction
        </button>
      </div>
    </aside>
  );
}
export default Sidebar;