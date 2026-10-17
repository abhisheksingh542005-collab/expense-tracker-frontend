import React, { useState, useEffect } from 'react';
import API from '../services/api';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import ExpenseChart from './ExpenseChart';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    categoryBreakdown: [],
  });
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    try {
      const summaryRes = await API.get('/expenses/summary');
      const listRes = await API.get('/expenses');
      setSummary(summaryRes.data);
      setTransactions(listRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTransaction = async (newTx) => {
    try {
      await API.post('/expenses', newTx);
      fetchData();
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      fetchData();
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-900 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Balance</p>
            <h2 className="text-2xl font-bold text-slate-800">₹{summary.totalBalance}</h2>
          </div>
          <Wallet className="text-blue-900 h-10 w-10 opacity-80" />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-emerald-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Income</p>
            <h2 className="text-2xl font-bold text-emerald-600">₹{summary.totalIncome}</h2>
          </div>
          <ArrowUpCircle className="text-emerald-500 h-10 w-10 opacity-80" />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-rose-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Expense</p>
            <h2 className="text-2xl font-bold text-rose-600">₹{summary.totalExpense}</h2>
          </div>
          <ArrowDownCircle className="text-rose-500 h-10 w-10 opacity-80" />
        </div>
      </div>

      {/* Main Grid: Form, List & Analytics Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <TransactionForm onAddTransaction={handleAddTransaction} />
        </div>
        <div>
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
        <div>
          <ExpenseChart categoryBreakdown={summary.categoryBreakdown} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;