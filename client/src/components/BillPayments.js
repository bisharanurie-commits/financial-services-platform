
import React, { useState } from "react";

function BillPayments({ customers }) {
  const [payments, setPayments] = useState([
    {
      id: "BILL001",
      customerId: 1,
      billType: "Electricity",
      accountNumber: "123456789",
      amount: 2500,
      status: "Completed"
    },
    {
      id: "BILL002",
      customerId: 2,
      billType: "Water",
      accountNumber: "987654321",
      amount: 1200,
      status: "Pending"
    }
  ]);

  const [formData, setFormData] = useState({
    customerId: "",
    billType: "Electricity",
    accountNumber: "",
    amount: ""
  });

  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const amount = Number(formData.amount);

    if (!formData.customerId || !formData.accountNumber.trim() || amount <= 0) {
      alert("Please enter all payment details correctly.");
      return;
    }

    const newPayment = {
      id: `BILL${Date.now()}`,
      customerId: Number(formData.customerId),
      billType: formData.billType,
      accountNumber: formData.accountNumber.trim(),
      amount,
      status: "Completed"
    };

    setPayments((previous) => [newPayment, ...previous]);

    setFormData({
      customerId: "",
      billType: "Electricity",
      accountNumber: "",
      amount: ""
    });

    alert("Bill payment recorded successfully!");
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this payment record?")) {
      setPayments((previous) =>
        previous.filter((payment) => payment.id !== id)
      );
    }
  }

  function formatAmount(amount) {
    return `KES ${Number(amount).toLocaleString("en-KE")}`;
  }

  const filteredPayments = payments.filter((payment) => {
    const customer = customers.find(
      (item) => item.id === payment.customerId
    );

    return (
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.billType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer && customer.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const totalPayments = payments.reduce(
    (total, payment) => total + payment.amount,
    0
  );

  return (
    <div className="bill-payments-page">
      <div className="page-heading">
        <h2>Bill Payments</h2>
        <p>Manage and track customer utility bill payments.</p>
      </div>

      <div className="customer-summary">
        <div className="summary-card">
          <h3>Total Payments</h3>
          <h2>{payments.length}</h2>
        </div>

        <div className="summary-card">
          <h3>Total Amount</h3>
          <h2>{formatAmount(totalPayments)}</h2>
        </div>

        <div className="summary-card">
          <h3>Completed</h3>
          <h2>{payments.filter((item) => item.status === "Completed").length}</h2>
        </div>

        <div className="summary-card">
          <h3>Pending</h3>
          <h2>{payments.filter((item) => item.status === "Pending").length}</h2>
        </div>
      </div>

      <div className="content-card">
        <div className="section-heading">
          <h2>Make a Bill Payment</h2>
        </div>

        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label>Select Customer</label>
            <select
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
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
            <label>Bill Type</label>
            <select
              name="billType"
              value={formData.billType}
              onChange={handleChange}
            >
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Internet">Internet</option>
              <option value="TV Subscription">TV Subscription</option>
            </select>
          </div>

          <div className="form-group">
            <label>Account / Meter Number</label>
            <input
              type="text"
              name="accountNumber"
              placeholder="Enter account or meter number"
              value={formData.accountNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Amount (KES)</label>
            <input
              type="number"
              name="amount"
              min="1"
              placeholder="Enter payment amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="action-button">
            Process Bill Payment
          </button>
        </form>
      </div>

      <div className="content-card">
        <div className="section-heading">
          <h2>Payment Records</h2>
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Customer</th>
                <th>Bill Type</th>
                <th>Account Number</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.map((payment) => {
                const customer = customers.find(
                  (item) => item.id === payment.customerId
                );

                return (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{customer ? customer.name : "Unknown Customer"}</td>
                    <td>{payment.billType}</td>
                    <td>{payment.accountNumber}</td>
                    <td>{formatAmount(payment.amount)}</td>
                    <td>
                      <span className={`status ${payment.status.toLowerCase()}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="text-button"
                        onClick={() => handleDelete(payment.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="7">No payment records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BillPayments;
