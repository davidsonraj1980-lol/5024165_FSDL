import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import Ledger from './components/Ledger';
import TransactionForm from './components/TransactionForm';

function App() {
  // 1. GLOBAL STATE
  const [currentView, setCurrentView] = useState('dashboard'); 
  const [transactions, setTransactions] = useState([
    { id: 1, date: "Oct 24, 2023", category: "Salary", desc: "Monthly Compensation - Alpha Tech", amount: 8450.00, type: "income" },
    { id: 2, date: "Oct 23, 2023", category: "Housing & Rent", desc: "Skyline Residences - Unit 402", amount: 2200.00, type: "expense" },
    { id: 3, date: "Oct 22, 2023", category: "Food & Dining", desc: "The Green Grocer - Organic Goods", amount: 158.40, type: "expense" }
  ]);

  // 2. CALCULATIONS
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const netFlow = totalIncome - totalExpense;

  const getCategoryIcon = (cat) => {
    switch(cat?.toLowerCase()) {
      case 'housing & rent': return 'home';
      case 'food & dining': return 'shopping_cart';
      case 'salary': return 'work';
      case 'transportation': return 'directions_car';
      case 'utilities': return 'bolt';
      default: return 'receipt_long';
    }
  };

  // 3. EVENTS / ACTIONS
  const addTransaction = (newTx) => {
    setTransactions([newTx, ...transactions]);
    setCurrentView('dashboard'); // Return to dashboard after adding
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // 4. RENDERING COMPONENTS & PASSING PROPS
  return (
    <div className="bg-background text-on-surface min-h-screen font-inter">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="ml-64 min-h-screen flex flex-col">
        <TopBar />

        {currentView === 'dashboard' && (
          <Dashboard 
            netFlow={netFlow} totalIncome={totalIncome} totalExpense={totalExpense} 
            transactions={transactions} getIcon={getCategoryIcon} onNavigate={setCurrentView} 
          />
        )}

        {currentView === 'ledger' && (
          <Ledger 
            transactions={transactions} netFlow={netFlow} 
            totalIncome={totalIncome} totalExpense={totalExpense} onDelete={deleteTransaction} 
          />
        )}

        {currentView === 'form' && (
          <TransactionForm 
            onAdd={addTransaction} onCancel={() => setCurrentView('dashboard')} 
          />
        )}
      </main>
    </div>
  );
}

export default App;