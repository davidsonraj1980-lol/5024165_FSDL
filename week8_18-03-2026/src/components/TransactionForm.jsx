import React, { useState } from 'react';

function TransactionForm({ onAdd, onCancel }) {
  // Local Form State
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Housing & Rent');
  const [date, setDate] = useState('2023-10-27');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (!amount || !description) return alert("Add amount and description");
    
    onAdd({
      id: Math.random(),
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      category,
      desc: description,
      amount: parseFloat(amount),
      type
    });
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 lg:p-16 w-full">
      <div className="w-full max-w-2xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">Record Transaction</h2>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-10 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-center">
              <div className="bg-surface-container-high p-1 rounded-xl flex w-full max-w-xs">
                <button type="button" onClick={() => setType('expense')} className={`flex-1 py-2.5 px-4 rounded-full text-sm font-bold ${type === 'expense' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant'}`}>Expense</button>
                <button type="button" onClick={() => setType('income')} className={`flex-1 py-2.5 px-4 rounded-full text-sm font-bold ${type === 'income' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant'}`}>Income</button>
              </div>
            </div>
            <div className="text-center">
              <label className="block text-sm font-semibold text-on-surface-variant mb-1">Amount</label>
              <div className="relative inline-block w-full">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl font-bold text-on-surface-variant opacity-30">₹</span>
                <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full text-6xl font-extrabold text-center bg-transparent border-none outline-none" placeholder="0" autoFocus />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-2">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-surface-container-highest border-none rounded-lg py-3 px-4 outline-none">
                  <option>Housing & Rent</option><option>Salary</option><option>Food & Dining</option><option>Transportation</option><option>Utilities</option><option>Subscriptions</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-2">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-surface-container-highest border-none rounded-lg py-3 px-4 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-2">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-surface-container-highest border-none rounded-lg py-3 px-4 outline-none resize-none" placeholder="What was this for?" rows="3"></textarea>
            </div>
            <div className="pt-4">
              <button type="submit" className="w-full bg-primary text-on-primary font-bold py-4 rounded-lg shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">check_circle</span> Save Transaction
              </button>
              <button type="button" onClick={onCancel} className="w-full mt-4 text-primary font-semibold py-2 hover:bg-surface-container-high rounded-lg transition-all">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default TransactionForm;