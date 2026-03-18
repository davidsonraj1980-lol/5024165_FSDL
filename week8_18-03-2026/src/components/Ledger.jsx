import React from 'react';

function Ledger({ transactions, netFlow, totalIncome, totalExpense, onDelete }) {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col items-center justify-center text-center mb-12 w-full">
        <div>
          <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">Ledger & History</h2>
          <p className="text-on-surface-variant max-w-md">Detailed breakdown of your financial architecture.</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden mb-12">
        <div className="overflow-x-auto">
          {/* 1. Changed table to text-center */}
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                {/* 2. Reduced padding slightly (px-4) to give more room, and centered headers */}
                <th className="px-4 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em] text-center">Date</th>
                <th className="px-4 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em] text-center">Category</th>
                <th className="px-4 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em] text-center">Description</th>
                <th className="px-4 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em] text-center">Amount</th>
                <th className="px-4 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="group hover:bg-surface-container-low transition-colors duration-150">
                  {/* 3. Added whitespace-nowrap to prevent text from breaking onto new lines */}
                  <td className="px-4 py-6 whitespace-nowrap">
                    <span className="text-on-surface font-semibold">{tx.date}</span>
                  </td>
                  
                  <td className="px-4 py-6">
                    {/* Added whitespace-nowrap and inline-block to the pill badge */}
                    <span className={`whitespace-nowrap inline-block px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wider ${tx.type === 'income' ? 'bg-secondary-container text-secondary' : 'bg-surface-container-highest text-primary'}`}>
                      {tx.category}
                    </span>
                  </td>
                  
                  <td className="px-4 py-6">
                    <span className="text-on-surface font-medium">{tx.desc}</span>
                  </td>
                  
                  <td className="px-4 py-6 whitespace-nowrap text-center">
                    <span className={`font-bold text-lg ${tx.type === 'income' ? 'text-secondary' : 'text-tertiary'}`}>
                      {tx.type === 'income' ? '+' : '-'} ₹{tx.amount.toFixed(2)}
                    </span>
                  </td>
                  
                  <td className="px-4 py-6 text-center">
                    <button onClick={() => onDelete(tx.id)} className="material-symbols-outlined text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Ledger;