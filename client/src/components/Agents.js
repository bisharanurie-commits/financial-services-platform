
import React, { useState } from "react";

function Agents() {
  const [agents, setAgents] = useState([
    {
      id: 1,
      agentId: "AGT001",
      name: "Mohamed Hassan",
      phone: "0712345678",
      email: "mohamed@gmail.com",
      location: "Garissa",
      status: "Active"
    },
    {
      id: 2,
      agentId: "AGT002",
      name: "Abdi Noor",
      phone: "0723456789",
      email: "abdi@gmail.com",
      location: "Nairobi",
      status: "Active"
    },
    {
      id: 3,
      agentId: "AGT003",
      name: "Fatuma Ali",
      phone: "0734567890",
      email: "fatuma@gmail.com",
      location: "Mombasa",
      status: "Inactive"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    status: "Active"
  });

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.location.trim()
    ) {
      alert("Please complete all agent details.");
      return;
    }

    if (editingId !== null) {
      setAgents((previous) =>
        previous.map((agent) =>
          agent.id === editingId
            ? { ...agent, ...formData }
            : agent
        )
      );

      alert("Agent updated successfully!");
      setEditingId(null);
    } else {
      const nextId =
        agents.length > 0
          ? Math.max(...agents.map((agent) => agent.id)) + 1
          : 1;

      const newAgent = {
        id: nextId,
        agentId: `AGT${String(nextId).padStart(3, "0")}`,
        ...formData
      };

      setAgents((previous) => [...previous, newAgent]);
      alert("New agent registered successfully!");
    }

    setFormData({
      name: "",
      phone: "",
      email: "",
      location: "",
      status: "Active"
    });
  }

  function handleEdit(agent) {
    setEditingId(agent.id);

    setFormData({
      name: agent.name,
      phone: agent.phone,
      email: agent.email,
      location: agent.location,
      status: agent.status
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this agent?"
    );

    if (confirmDelete) {
      setAgents((previous) =>
        previous.filter((agent) => agent.id !== id)
      );

      if (editingId === id) {
        handleCancel();
      }
    }
  }

  function handleCancel() {
    setEditingId(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      location: "",
      status: "Active"
    });
  }

  const filteredAgents = agents.filter((agent) =>
    [
      agent.agentId,
      agent.name,
      agent.phone,
      agent.email,
      agent.location,
      agent.status
    ].some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const activeAgents = agents.filter(
    (agent) => agent.status === "Active"
  ).length;

  const inactiveAgents = agents.filter(
    (agent) => agent.status === "Inactive"
  ).length;

  return (
    <div className="agents-page">

      <div className="page-heading">
        <h2>Agent Management</h2>
        <p>Register, manage and monitor financial service agents.</p>
      </div>

      <div className="customer-summary">
        <div className="summary-card">
          <h3>Total Agents</h3>
          <h2>{agents.length}</h2>
        </div>

        <div className="summary-card">
          <h3>Active Agents</h3>
          <h2>{activeAgents}</h2>
        </div>

        <div className="summary-card">
          <h3>Inactive Agents</h3>
          <h2>{inactiveAgents}</h2>
        </div>
      </div>

      <div className="content-card">
        <div className="section-heading">
          <h2>
            {editingId !== null ? "Update Agent" : "Register New Agent"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
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
              placeholder="07XXXXXXXX"
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
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter agent location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Agent Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="action-button">
              {editingId !== null ? "Update Agent" : "Register Agent"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="action-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>

        </form>
      </div>

      <div className="content-card">
        <div className="section-heading">
          <h2>Registered Agents</h2>

          <input
            type="text"
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Agent ID</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAgents.map((agent) => (
                <tr key={agent.id}>
                  <td>{agent.agentId}</td>
                  <td>{agent.name}</td>
                  <td>{agent.phone}</td>
                  <td>{agent.email}</td>
                  <td>{agent.location}</td>

                  <td>
                    <span
                      className={`status ${
                        agent.status === "Active"
                          ? "completed"
                          : "pending"
                      }`}
                    >
                      {agent.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => handleEdit(agent)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="text-button"
                      onClick={() => handleDelete(agent.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredAgents.length === 0 && (
                <tr>
                  <td colSpan="7">No agents found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Agents;
