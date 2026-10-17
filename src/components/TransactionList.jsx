import React from 'react';
import { Trash2 } from 'lucide-react';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center text-slate-500">
        No transactions recorded yet.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Transactions</h3>
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {transactions.map((t) => (
          <div
            key={t._id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition"
          >
            <div>
              <p className="font-semibold text-slate-800">{t.title}</p>
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {t.category}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <span
                className={`font-bold ${
                  t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {t.type === 'income' ? '+' : '-'}₹{t.amount}
              </span>
              <button
                onClick={() => onDeleteTransaction(t._id)}
                className="text-slate-400 hover:text-rose-600 transition"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;