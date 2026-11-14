
import React, { useState } from "react";

function Reports({ customers, transactions, wallets }) {
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  function formatAmount(amount) {
    return `KES ${Number(amount).toLocaleString("en-KE")}`;
  }

  const totalTransactionValue = transactions.reduce(
    (total, transaction) =>
      total + Number(transaction.amount || 0),
    0
  );

  const completedTransactions = transactions.filter(
    (transaction) => transaction.status === "Completed"
  );

  const pendingTransactions = transactions.filter(
    (transaction) => transaction.status === "Pending"
  );

  const totalDeposits = transactions
    .filter((transaction) =>
      ["Wallet Deposit", "Deposit"].includes(transaction.type)
    )
    .reduce(
      (total, transaction) => total + Number(transaction.amount || 0),
      0
    );

  const totalWithdrawals = transactions
    .filter((transaction) =>
      ["Withdrawal", "Money Transfer"].includes(transaction.type)
    )
    .reduce(
      (total, transaction) => total + Number(transaction.amount || 0),
      0
    );

  const totalWalletBalance = wallets.reduce(
    (total, wallet) => total + Number(wallet.balance || 0),
    0
  );

  const filteredTransactions = transactions.filter((transaction) => {
    const customer = customers.find(
      (item) => item.id === transaction.customerId
    );

    const matchesStatus =
      filterStatus === "All" ||
      transaction.status === filterStatus;

    const matchesType =
      filterType === "All" ||
      transaction.type === filterType;

    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer &&
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <div className="reports-page">

      <div className="page-heading">
        <h2>Financial Reports</h2>
        <p>Monitor financial performance and transaction activities.</p>
      </div>

      {/* FINANCIAL SUMMARY */}

      <div className="customer-summary">

        <div className="summary-card">
          <h3>Total Transactions</h3>
          <h2>{transactions.length}</h2>
          <p>All recorded transactions</p>
        </div>

        <div className="summary-card">
          <h3>Transaction Value</h3>
          <h2>{formatAmount(totalTransactionValue)}</h2>
          <p>Total transaction amount</p>
        </div>

        <div className="summary-card">
          <h3>Wallet Balances</h3>
          <h2>{formatAmount(totalWalletBalance)}</h2>
          <p>Combined customer balances</p>
        </div>

        <div className="summary-card">
          <h3>Total Customers</h3>
          <h2>{customers.length}</h2>
          <p>Registered customers</p>
        </div>

      </div>

      {/* TRANSACTION SUMMARY */}

      <div className="reports-summary-grid">

        <div className="content-card report-stat">
          <h3>Completed Transactions</h3>
          <h2>{completedTransactions.length}</h2>
          <p>{formatAmount(
            completedTransactions.reduce(
              (total, item) => total + Number(item.amount || 0),
              0
            )
          )}</p>
        </div>

        <div className="content-card report-stat">
          <h3>Pending Transactions</h3>
          <h2>{pendingTransactions.length}</h2>
          <p>Awaiting processing</p>
        </div>

        <div className="content-card report-stat">
          <h3>Wallet Deposits</h3>
          <h2>{formatAmount(totalDeposits)}</h2>
          <p>Total recorded deposits</p>
        </div>

        <div className="content-card report-stat">
          <h3>Withdrawals / Transfers</h3>
          <h2>{formatAmount(totalWithdrawals)}</h2>
          <p>Recorded withdrawals and transfers</p>
        </div>

      </div>

      {/* TRANSACTION REPORT */}

      <div className="content-card">

        <div className="section-heading">
          <h2>Transaction Report</h2>
          <span>{filteredTransactions.length} Records</span>
        </div>

        <div className="reports-filters">

          <input
            type="text"
            placeholder="Search transaction or customer..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <select
            value={filterStatus}
            onChange={(event) => setFilterStatus(event.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>

          <select
            value={filterType}
            onChange={(event) => setFilterType(event.target.value)}
          >
            <option value="All">All Transaction Types</option>
            <option value="Money Transfer">Money Transfer</option>
            <option value="Wallet Deposit">Wallet Deposit</option>
            <option value="Withdrawal">Withdrawal</option>
            <option value="Bill Payment">Bill Payment</option>
          </select>

        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Transaction Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((transaction) => {
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
                        className={`status ${
                          transaction.status.toLowerCase()
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="5">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

export default Reports;
