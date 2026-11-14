
import React, { useState } from "react";

function Transactions({ customers, transactions, setTransactions }) {
  const [formData, setFormData] = useState({
    customerId: "",
    type: "Money Transfer",
    amount: "",
    status: "Completed"
  });

  const [search, setSearch] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.customerId || !formData.amount) {
      alert("Please select a customer and enter an amount.");
      return;
    }

    if (Number(formData.amount) <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }

    const newTransaction = {
      id: `TRX${String(Date.now())}`,
      customerId: Number(formData.customerId),
      type: formData.type,
      amount: Number(formData.amount),
      status: formData.status
    };

    setTransactions([...transactions, newTransaction]);

    setFormData({
      customerId: "",
      type: "Money Transfer",
      amount: "",
      status: "Completed"
    });

    alert("Transaction added successfully!");
  }

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (confirmDelete) {
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const customer = customers.find(
      (item) => item.id === transaction.customerId
    );

    return (
      customer?.name.toLowerCase().includes(search.toLowerCase()) ||
      transaction.id.toLowerCase().includes(search.toLowerCase()) ||
      transaction.type.toLowerCase().includes(search.toLowerCase())
    );
  });

  function formatAmount(amount) {
    return `KES ${Number(amount).toLocaleString("en-KE")}`;
  }

  return (
    <div className="transactions-page">
      <div className="page-heading">
        <h2>Transaction Management</h2>
        <p>Manage customer deposits, withdrawals, transfers and payments.</p>
      </div>

      <div className="content-card">
        <h2>Register New Transaction</h2>
        <p>Select a registered customer and enter transaction details.</p>

        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label>Select Customer</label>
            <select
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              required
            >
              <option value="">Choose a customer</option>

              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.phone}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Transaction Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option>Money Transfer</option>
              <option>Wallet Deposit</option>
              <option>Withdrawal</option>
              <option>Bill Payment</option>
            </select>
          </div>

          <div className="form-group">
            <label>Amount (KES)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Transaction Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>

          <button type="submit" className="action-button">
            Register Transaction
          </button>
        </form>
      </div>

      <div className="content-card">
        <div className="section-heading">
          <div>
            <h2>All Transactions</h2>
            <p>View and manage financial transactions.</p>
          </div>

          <strong>{filteredTransactions.length} Transactions</strong>
        </div>

        <input
          className="transaction-search"
          type="text"
          placeholder="Search by customer, transaction ID or type..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => {
                  const customer = customers.find(
                    (item) => item.id === transaction.customerId
                  );

                  return (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{customer ? customer.name : "Unknown Customer"}</td>
                      <td>{transaction.type}</td>
                      <td>{formatAmount(transaction.amount)}</td>
                      <td>
                        <span
                          className={`status ${transaction.status.toLowerCase()}`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="delete-button"
                          onClick={() => handleDelete(transaction.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
