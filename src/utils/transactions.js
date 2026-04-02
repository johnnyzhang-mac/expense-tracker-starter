export function computeSummary(transactions) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
}

export function getExpensesByCategory(transactions) {
  const grouped = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
}

export function filterTransactions(transactions, { type, category }) {
  return transactions
    .filter(t => type === "all" || t.type === type)
    .filter(t => category === "all" || t.category === category);
}
