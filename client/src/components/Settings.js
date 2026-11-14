
import React, { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    platformName: "Financial Services Platform",
    supportEmail: "support@example.com",
    phone: "0700000000",
    adminName: "System Administrator",
    language: "English",
    currency: "KES",
    emailNotifications: true,
    transactionAlerts: true,
    securityAlerts: true,
    twoFactor: false
  });

  const [saved, setSaved] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value
    });

    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    localStorage.setItem("platformSettings", JSON.stringify(settings));

    setSaved(true);
  }

  return (
    <div className="settings-page">
      <div className="page-heading">
        <h2>System Settings</h2>
        <p>Manage your platform information, preferences and security.</p>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="content-card settings-section">
          <div className="settings-heading">
            <h3>Platform Information</h3>
            <p>Configure your financial platform details.</p>
          </div>

          <div className="settings-grid">
            <div className="form-group">
              <label>Platform Name</label>
              <input
                type="text"
                name="platformName"
                value={settings.platformName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Support Email</label>
              <input
                type="email"
                name="supportEmail"
                value={settings.supportEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Support Phone</label>
              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Currency</label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
              >
                <option value="KES">KES - Kenyan Shilling</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
          </div>
        </div>

        <div className="content-card settings-section">
          <div className="settings-heading">
            <h3>Administrator Profile</h3>
            <p>Manage administrator account information.</p>
          </div>

          <div className="settings-grid">
            <div className="form-group">
              <label>Administrator Name</label>
              <input
                type="text"
                name="adminName"
                value={settings.adminName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Language</label>
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
              >
                <option value="English">English</option>
                <option value="Swahili">Swahili</option>
              </select>
            </div>
          </div>
        </div>

        <div className="content-card settings-section">
          <div className="settings-heading">
            <h3>Notification Preferences</h3>
            <p>Choose which alerts you want to receive.</p>
          </div>

          <div className="settings-options">
            <label className="setting-option">
              <span>
                <strong>Email Notifications</strong>
                <small>Receive important platform updates.</small>
              </span>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
              />
            </label>

            <label className="setting-option">
              <span>
                <strong>Transaction Alerts</strong>
                <small>Receive alerts about financial transactions.</small>
              </span>
              <input
                type="checkbox"
                name="transactionAlerts"
                checked={settings.transactionAlerts}
                onChange={handleChange}
              />
            </label>

            <label className="setting-option">
              <span>
                <strong>Security Alerts</strong>
                <small>Receive important security notifications.</small>
              </span>
              <input
                type="checkbox"
                name="securityAlerts"
                checked={settings.securityAlerts}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <div className="content-card settings-section">
          <div className="settings-heading">
            <h3>Security Settings</h3>
            <p>Manage additional account security preferences.</p>
          </div>

          <label className="setting-option">
            <span>
              <strong>Two-Factor Authentication</strong>
              <small>Enable an additional verification step for administrator access.</small>
            </span>

            <input
              type="checkbox"
              name="twoFactor"
              checked={settings.twoFactor}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="settings-actions">
          <button type="submit" className="action-button">
            Save Settings
          </button>

          {saved && (
            <span className="settings-success">
              Settings saved successfully!
            </span>
          )}
        </div>

      </form>
    </div>
  );
}

export default Settings;
