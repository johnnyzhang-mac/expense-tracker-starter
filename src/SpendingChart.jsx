import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { COLORS } from './constants'
import { getExpensesByCategory } from './utils/transactions'

function SpendingChart({ transactions }) {
  const data = useMemo(() => getExpensesByCategory(transactions), [transactions]);

  if (data.length === 0) {
    return <p>No expense data to display.</p>;
  }

  return (
    <div className="chart-container">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `$${v}`} />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Bar dataKey="value" fill={COLORS.olive} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
