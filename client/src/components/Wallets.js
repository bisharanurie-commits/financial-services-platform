
import React, { useState } from "react";

function Wallets({ customers, wallets, setWallets, setTransactions }) {
  const [customerId, setCustomerId] = useState("");
  const [type, setType] = useState("Deposit");
  const [amount, setAmount] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const value = Number(amount);

    if (!customerId || !value || value <= 0) {
      alert("Please select a customer and enter a valid amount.");
      return;
    }

    const selectedWallet = wallets.find(
      (wallet) => wallet.customerId === Number(customerId)
    );

    if (!selectedWallet) {
      alert("Wallet not found for this customer.");
      return;
    }

    if (type === "Withdrawal" && selectedWallet.balance < value) {
      alert("Insufficient wallet balance.");
      return;
    }

    const updatedWallets = wallets.map((wallet) => {
      if (wallet.customerId === Number(customerId)) {
        return {
          ...wallet,
          balance:
            type === "Deposit"
              ? wallet.balance + value
              : wallet.balance - value
        };
      }

      return wallet;
    });

    setWallets(updatedWallets);

    const newTransaction = {
      id: `TRX${Date.now()}`,
      customerId: Number(customerId),
      type: type === "Deposit" ? "Wallet Deposit" : "Withdrawal",
      amount: value,
      status: "Completed"
    };

    setTransactions((previous) => [...previous, newTransaction]);

    setAmount("");
    setCustomerId("");

    alert(`${type} completed successfully!`);
  }

  function formatAmount(value) {
    return `KES ${Number(value).toLocaleString("en-KE")}`;
  }

  const totalBalance = wallets.reduce(
    (total, wallet) => total + wallet.balance,
    0
  );

  return (
    <div className="wallets-page">
      <div className="page-heading">
        <h2>Wallet Management</h2>
        <p>Manage customer deposits, withdrawals and wallet balances.</p>
      </div>

      <div className="content-card">
        <h2>Total Wallet Balance</h2>
        <h1>{formatAmount(totalBalance)}</h1>
        <p>{wallets.length} Registered Wallets</p>
      </div>

      <div className="content-card">
        <h2>Deposit or Withdraw Money</h2>

        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label>Select Customer</label>
            <select
              value={customerId}
              onChange={(event) => setCustomerId(event.target.value)}
              required
            >
              <option value="">Choose customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Operation</label>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="Deposit">Deposit</option>
              <option value="Withdrawal">Withdrawal</option>
            </select>
          </div>

          <div className="form-group">
            <label>Amount (KES)</label>
            <input
              type="number"
              min="1"
              placeholder="Enter amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="action-button">
            Process Transaction
          </button>
        </form>
      </div>

      <div className="content-card">
        <h2>Customer Wallets</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Wallet ID</th>
                <th>Customer</th>
                <th>Balance</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {wallets.map((wallet) => {
                const customer = customers.find(
                  (item) => item.id === wallet.customerId
                );

                return (
                  <tr key={wallet.id}>
                    <td>WAL{String(wallet.id).padStart(3, "0")}</td>
                    <td>{customer ? customer.name : "Unknown Customer"}</td>
                    <td>{formatAmount(wallet.balance)}</td>
                    <td>
                      <span className="status completed">
                        {wallet.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Wallets;
