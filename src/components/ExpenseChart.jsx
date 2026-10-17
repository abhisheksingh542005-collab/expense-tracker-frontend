import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ categoryBreakdown }) => {
  if (!categoryBreakdown || categoryBreakdown.length === 0) {
    return <p className="text-gray-500 text-sm text-center py-4">No expense data available for charts.</p>;
  }

  const data = {
    labels: categoryBreakdown.map((item) => item._id),
    datasets: [
      {
        data: categoryBreakdown.map((item) => item.total),
        backgroundColor: [
          '#1E3A8A',
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#EC4899',
          '#64748B',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Category-wise Expenses</h3>
      <div className="w-64 h-64">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default ExpenseChart;