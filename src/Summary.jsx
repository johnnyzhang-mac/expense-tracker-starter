import { useMemo } from 'react'
import { computeSummary } from './utils/transactions'

function Summary({ transactions }) {
  const { totalIncome, totalExpenses, balance } = useMemo(
    () => computeSummary(transactions),
    [transactions]
  );

  return (
    <div className="summary">
      <div className="summary-balance">
        <span className="summary-label">Net Balance</span>
        <p className={`balance-hero ${balance >= 0 ? 'positive' : 'negative'}`}>
          {balance >= 0 ? '' : '−'}${Math.abs(balance).toLocaleString()}
        </p>
      </div>
      <div className="summary-sub">
        <div className="summary-stat">
          <span className="summary-label">Income</span>
          <p className="income-amount">${totalIncome.toLocaleString()}</p>
        </div>
        <div className="summary-stat">
          <span className="summary-label">Expenses</span>
          <p className="expense-amount">${totalExpenses.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Summary
