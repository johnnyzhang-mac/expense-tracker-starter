import { useState } from 'react'
import { CATEGORIES } from './constants'

const INITIAL_FORM = { description: "", amount: "", type: "expense", category: "food" };

function TransactionForm({ onAdd }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) {
      setError("Please fill in both description and amount.");
      return;
    }
    setError("");
    onAdd({
      id: crypto.randomUUID(),
      description: form.description,
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: new Date().toISOString().split('T')[0],
    });
    setForm(INITIAL_FORM);
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Description</label>
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={form.description}
            onChange={handleChange("description")}
          />
        </div>
        <div className="form-field">
          <label>Amount</label>
          <input
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={handleChange("amount")}
          />
        </div>
        <div className="form-field">
          <label>Type</label>
          <select value={form.type} onChange={handleChange("type")}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="form-field">
          <label>Category</label>
          <select value={form.category} onChange={handleChange("category")}>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add</button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </div>
  );
}

export default TransactionForm
