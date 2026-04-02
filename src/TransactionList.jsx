import { useState, useMemo } from 'react'
import { CATEGORIES } from './constants'
import { filterTransactions } from './utils/transactions'

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [confirmingId, setConfirmingId] = useState(null);

  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, { type: filterType, category: filterCategory }),
    [transactions, filterType, filterCategory]
  );

  const formatAmount = (amount) =>
    Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="transaction-list">
        {filteredTransactions.map(t => (
          <div key={t.id} className="transaction-item">
            <span className="tx-date">{t.date}</span>
            <span className="tx-description">{t.description}</span>
            <span className="tx-category">{t.category}</span>
            <span className={`tx-amount ${t.type === 'income' ? 'income-amount' : 'expense-amount'}`}>
              {t.type === 'income' ? '+' : '−'}${formatAmount(t.amount)}
            </span>
            <div className="tx-actions">
              {confirmingId === t.id ? (
                <>
                  <button className="confirm-btn" onClick={() => { onDelete(t.id); setConfirmingId(null); }}>Delete</button>
                  <button className="cancel-btn" onClick={() => setConfirmingId(null)}>Cancel</button>
                </>
              ) : (
                <button className="delete-btn" onClick={() => setConfirmingId(t.id)}>×</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionList
