import React from 'react';

function Dashboard({ netFlow, totalIncome, totalExpense, transactions, getIcon, onNavigate }) {
  return (
    <div className="p-8 lg:p-12 space-y-12 max-w-7xl mx-auto w-full">
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest p-8 rounded-xl shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm text-on-surface-variant font-medium mb-1">Total Net Worth</p>
            <h2 className="text-6xl font-black text-on-surface tracking-tighter mb-8">₹{netFlow.toFixed(2)}</h2>
            <div className="flex gap-8">
              <div>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Status</p>
                <p className={`text-sm font-bold flex items-center gap-1 ${netFlow >= 0 ? 'text-secondary' : 'text-tertiary'}`}>
                  <span className="material-symbols-outlined text-sm">{netFlow >= 0 ? 'trending_up' : 'trending_down'}</span>
                  {netFlow >= 0 ? 'Positive' : 'Negative'}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </div>
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex justify-between items-center">
            <div><p className="text-sm text-on-surface-variant mb-1">Monthly Income</p><h3 className="text-2xl font-bold text-on-surface">₹{totalIncome.toFixed(2)}</h3></div>
            <div className="bg-secondary-container text-secondary p-3 rounded-full"><span className="material-symbols-outlined">arrow_downward</span></div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex justify-between items-center">
            <div><p className="text-sm text-on-surface-variant mb-1">Monthly Expenses</p><h3 className="text-2xl font-bold text-on-surface">₹{totalExpense.toFixed(2)}</h3></div>
            <div className="bg-tertiary-fixed-dim text-tertiary p-3 rounded-full"><span className="material-symbols-outlined">arrow_upward</span></div>
          </div>
        </div>
      </section>

      <section className="space-y-6 pb-10">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-on-surface">Recent Transactions</h3>
          <button onClick={() => onNavigate('ledger')} className="text-primary font-bold text-sm hover:underline">View All Records</button>
        </div>
        <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
          {transactions.slice(0, 4).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-6 border-b border-outline-variant/10 last:border-none">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">{getIcon(tx.category)}</span>
                </div>
                <div><p className="text-base font-bold text-on-surface">{tx.desc}</p><p className="text-sm text-on-surface-variant">{tx.category} • {tx.date}</p></div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${tx.type === 'income' ? 'text-secondary' : 'text-tertiary'}`}>
                  {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default Dashboard;