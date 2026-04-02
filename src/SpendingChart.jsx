import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const CATEGORY_COLORS = {
  food:          '#e8b84b',
  housing:       '#3ecf8e',
  utilities:     '#60a5fa',
  transport:     '#f2695a',
  entertainment: '#c084fc',
  salary:        '#34d399',
  other:         '#94a3b8',
};

function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>No expense data to display.</p>;
  }

  return (
    <div className="chart-container">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#21212e" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#52526a', fontSize: 11, fontFamily: 'DM Mono, monospace' }}
            axisLine={{ stroke: '#21212e' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fill: '#52526a', fontSize: 11, fontFamily: 'DM Mono, monospace' }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
            contentStyle={{
              background: '#111116',
              border: '1px solid #21212e',
              borderRadius: 0,
              fontFamily: 'DM Mono, monospace',
              fontSize: 12,
            }}
            labelStyle={{ color: '#ece8de', marginBottom: 4 }}
            itemStyle={{ color: '#e8b84b' }}
            cursor={{ fill: 'rgba(232, 184, 75, 0.06)' }}
          />
          <Bar dataKey="value" radius={0}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] ?? '#94a3b8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
