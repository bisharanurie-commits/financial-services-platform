
import React, { useState } from "react";
import "./App.css";
import Customers from "./components/Customers";
import Transactions from "./components/Transactions";
import Wallets from "./components/Wallets";
import BillPayments from "./components/BillPayments";
import Agents from "./components/Agents";
function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  // Shared customer data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Ahmed Nurie",
      phone: "0712345678",
      email: "ahmed@gmail.com",
      status: "Active"
    },
    {
      id: 2,
      name: "Azmi Ali",
      phone: "0723456789",
      email: "azmi@gmail.com",
      status: "Active"
    },
    {
      id: 3,
      name: "Abdullahi Abdi",
      phone: "0734567890",
      email: "abdullahi@gmail.com",
      status: "Inactive"
    }
  ]);

  const navigation = [
    "Dashboard",
    "Customers",
    "Wallets",
    "Transactions",
    "Bill Payments",
    "Agents",
    "Reports",
    "Settings"
  ];
  const [wallets, setWallets] = useState([
  {
    id: 1,
    customerId: 1,
    balance: 10000,
    status: "Active"
  },
  {
    id: 2,
    customerId: 2,
    balance: 25000,
    status: "Active"
  },
  {
    id: 3,
    customerId: 3,
    balance: 5000,
    status: "Active"
  }
]);

  // Transactions use the registered customer names
  const [transactions, setTransactions] = useState([
  {
    id: "TRX001",
    customerId: 1,
    type: "Money Transfer",
    amount: 2000,
    status: "Completed"
  },
  {
    id: "TRX002",
    customerId: 2,
    type: "Wallet Deposit",
    amount: 5000,
    status: "Completed"
  },
  {
    id: "TRX003",
    customerId: 3,
    type: "Bill Payment",
    amount: 1500,
    status: "Pending"
  }
]);
 const totalTransactionValue = transactions.reduce(
  (total, transaction) => total + Number(transaction.amount),
  0
);

const completedTransactions = transactions.filter(
  (transaction) => transaction.status === "Completed"
).length;

const pendingTransactions = transactions.filter(
  (transaction) => transaction.status === "Pending"
).length;

const statistics = [
  {
    title: "Total Customers",
    value: customers.length,
    change: "+12.5%"
  },
  {
    title: "Total Wallet Balance",
    value: "KES 8.5M",
    change: "+8.2%"
  },
  {
    title: "Total Transactions",
    value: transactions.length,
    change: "+15.3%"
  },
  {
    title: "Active Agents",
    value: "245",
    change: "+5.4%"
  },
  {
    title: "Transaction Value",
    value: `KES ${totalTransactionValue.toLocaleString("en-KE")}`,
    change: "All transactions"
  },
  {
    title: "Completed Transactions",
    value: completedTransactions,
    change: "Successful"
  },
  {
    title: "Pending Transactions",
    value: pendingTransactions,
    change: "Awaiting processing"
  }
];


  return (
    <div className="app-container">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="brand">
          <h2>FinServe</h2>
          <p>Financial Services Platform</p>
        </div>

        <div className="menu-heading">
          MAIN MENU
        </div>

        <nav className="navigation">
          {navigation.map((item) => (
            <button
              key={item}
              className={
                activePage === item
                  ? "nav-link active"
                  : "nav-link"
              }
              onClick={() => setActivePage(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>Administrator</p>
          <small>System Administrator</small>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">

        <header className="topbar">
          <div>
            <h1>{activePage}</h1>
            <p>Welcome back! Manage your financial services.</p>
          </div>

          <div className="admin-info">
            <span>Administrator</span>
          </div>
        </header>

        {activePage === "Dashboard" ? (

          <>

            {/* STATISTICS */}
            <section className="statistics-grid">

              {statistics.map((stat) => (
                <div className="stat-card" key={stat.title}>
                  <p>{stat.title}</p>
                  <h2>{stat.value}</h2>
                  <span>{stat.change} from last month</span>
                </div>
              ))}

            </section>

            {/* RECENT TRANSACTIONS */}
            <section className="content-card">

              <div className="section-heading">
                <div>
                  <h2>Recent Transactions</h2>
                  <p>Monitor recent financial activities.</p>
                </div>

                <button
                  className="text-button"
                  onClick={() => setActivePage("Transactions")}
                >
                  View All
                </button>
              </div>

              <div className="table-container">

                <table>
                  <thead>
                    <tr>
                      <th>Reference</th>
                      <th>Customer</th>
                      <th>Transaction Type</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactions.map((transaction) => {
                      const customer = customers.find(
                        (item) => item.id === transaction.customerId
                      );

                      return (
                        <tr key={transaction.id}>
                          <td>{transaction.id}</td>
                          <td>
                            {customer ? customer.name : "Unknown Customer"}
                          </td>
                          <td>{transaction.type}</td>
                          <td>{transaction.amount}</td>
                          <td>
                            <span
                              className={`status ${transaction.status.toLowerCase()}`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

              </div>
            </section>

            {/* FINANCIAL OVERVIEW */}
            <section className="bottom-grid">

              <div className="content-card">
                <h2>Financial Overview</h2>
                <p>Summary of platform activities.</p>

                <div className="overview-row">
                  <span>Total Deposits</span>
                  <strong>KES 4,500,000</strong>
                </div>

                <div className="overview-row">
                  <span>Total Withdrawals</span>
                  <strong>KES 2,100,000</strong>
                </div>

                <div className="overview-row">
                  <span>Bill Payments</span>
                  <strong>KES 950,000</strong>
                </div>
              </div>

              <div className="content-card">
                <h2>Quick Actions</h2>
                <p>Access important platform operations.</p>

                <button
                  className="action-button"
                  onClick={() => setActivePage("Customers")}
                >
                  Register Customer
                </button>

                <button
                  className="action-button"
                  onClick={() => setActivePage("Wallets")}
                >
                  Manage Wallets
                </button>

                <button
                  className="action-button"
                  onClick={() => setActivePage("Transactions")}
                >
                  View Transactions
                </button>
              </div>

            </section>

          </>

       ) : activePage === "Customers" ? (

  <Customers
    customers={customers}
    setCustomers={setCustomers}
  />
) : activePage === "Transactions" ? (

  <Transactions
    customers={customers}
    transactions={transactions}
    setTransactions={setTransactions}
  />

) : activePage === "Wallets" ? (
  <Wallets
    customers={customers}
    wallets={wallets}
    setWallets={setWallets}
    setTransactions={setTransactions}
  />
) : activePage === "Bill Payments" ? (
  <BillPayments customers={customers} />
) : activePage === "Agents" ? (
  <Agents />
) : (
          <section className="content-card module-page">
            <h2>{activePage} Management</h2>

            <p>
              Welcome to the {activePage} module.
              This section will contain the tools and
              operations for managing {activePage.toLowerCase()}.
            </p>

            <button
              className="action-button"
              onClick={() => setActivePage("Dashboard")}
            >
              Return to Dashboard
            </button>
          </section>

        )}

        <footer>
          FinServe Financial Services Platform
          <br />
          Copyright 2026. All rights reserved.
        </footer>

      </main>

    </div>
  );
}

export default App;
