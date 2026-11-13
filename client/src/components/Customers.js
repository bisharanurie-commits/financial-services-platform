
import React, { useState } from "react";

function Customers({ customers, setCustomers }) {

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    status: "Active"
  });

  const [editingId, setEditingId] = useState(null);

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Add or update customer
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim()
    ) {
      alert("Please fill in all customer details.");
      return;
    }

    if (editingId !== null) {

      setCustomers((previousCustomers) =>
        previousCustomers.map((customer) =>
          customer.id === editingId
            ? { ...formData, id: editingId }
            : customer
        )
      );

      alert("Customer updated successfully!");

      setEditingId(null);

    } else {

      const newCustomer = {
        ...formData,
        id: customers.length > 0
          ? Math.max(...customers.map((customer) => customer.id)) + 1
          : 1
      };

      setCustomers((previousCustomers) => [
        ...previousCustomers,
        newCustomer
      ]);

      alert("Customer added successfully!");
    }

    setFormData({
      name: "",
      phone: "",
      email: "",
      status: "Active"
    });
  };

  // Edit customer
  const handleEdit = (customer) => {
    setFormData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      status: customer.status
    });

    setEditingId(customer.id);
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      status: "Active"
    });

    setEditingId(null);
  };

  // Delete customer
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (confirmDelete) {
      setCustomers((previousCustomers) =>
        previousCustomers.filter((customer) => customer.id !== id)
      );

      alert("Customer deleted successfully!");

      if (editingId === id) {
        handleCancel();
      }
    }
  };

  // Search customers
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone.includes(search) ||
    customer.email.toLowerCase().includes(search.toLowerCase())
  );

  // Customer statistics
  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  return (
    <div className="customers-page">

      <div className="page-heading">
        <div>
          <h2>Customer Management</h2>
          <p>Register and manage your FinServe customers.</p>
        </div>
      </div>

      {/* CUSTOMER STATISTICS */}
      <div className="customer-summary">

        <div className="summary-card">
          <h3>Total Customers</h3>
          <h2>{totalCustomers}</h2>
        </div>

        <div className="summary-card">
          <h3>Active Customers</h3>
          <h2>{activeCustomers}</h2>
        </div>

        <div className="summary-card">
          <h3>Inactive Customers</h3>
          <h2>{inactiveCustomers}</h2>
        </div>

      </div>

      {/* CUSTOMER FORM */}
      <section className="content-card">

        <h2>
          {editingId !== null ? "Edit Customer" : "Register New Customer"}
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Customer Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter customer name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Customer Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

          </div>

          <div className="form-actions">

            <button type="submit" className="action-button">
              {editingId !== null ? "Update Customer" : "Add Customer"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="text-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </section>

      {/* CUSTOMER LIST */}
      <section className="content-card">

        <div className="section-heading">
          <div>
            <h2>Registered Customers</h2>
            <p>View and manage all registered customers.</p>
          </div>

          <input
            type="search"
            placeholder="Search customers..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>No.</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredCustomers.length > 0 ? (

                filteredCustomers.map((customer, index) => (

                  <tr key={customer.id}>

                    <td>{index + 1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>

                    <td>
                      <span
                        className={`status ${customer.status.toLowerCase()}`}
                      >
                        {customer.status}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="text-button"
                        onClick={() => handleEdit(customer)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="text-button"
                        onClick={() => handleDelete(customer.id)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="6">No customers found.</td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

export default Customers;
