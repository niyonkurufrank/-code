import { useState } from "react";
import { Bell, Building2, CreditCard, LockKeyhole, Save, ShieldCheck, UserRound } from "lucide-react";
import { PageHeading, Panel } from "../components/ui";
const startingPreferences = [
  { id: "orders", title: "New order alerts", description: "Get notified as soon as a customer places an order.", enabled: true },
  { id: "inventory", title: "Low inventory reminders", description: "Know when products are running low on stock.", enabled: true },
  { id: "customers", title: "Customer updates", description: "Updates about reviews, messages, and repeat buyers.", enabled: false },
  { id: "weekly", title: "Weekly performance digest", description: "A weekly email summary of your store’s performance.", enabled: true },
];
function Settings() {
  const [profile, setProfile] = useState({ name: "NIYONKURU Frank", email: "niyonkurufrank91@gmail.com", store: "Northstar Goods", phone: "+1 (415) 555-0138" });
  const [preferences, setPreferences] = useState(startingPreferences); const [saved, setSaved] = useState(false);
  const updateProfile = (event) => { event.preventDefault(); setSaved(true); window.setTimeout(() => setSaved(false), 2800); };
  const togglePreference = (id) => setPreferences((current) => current.map((item) => item.id === id ? { ...item, enabled: !item.enabled } : item));
  return <div className="page-stack settings-page">
    <PageHeading eyebrow="YOUR ACCOUNT" title="Settings" description="Manage your profile, store preferences, and notifications." />
    <div className="settings-layout">
      <nav className="settings-nav" aria-label="Settings sections">
        <a className="settings-nav-active" href="#profile"><UserRound size={17} /> Profile</a>
        <a href="#store"><Building2 size={17} /> Store details</a>
        <a href="#notifications"><Bell size={17} /> Notifications</a>
        <a href="#security"><LockKeyhole size={17} /> Security</a>
        <a href="#billing"><CreditCard size={17} /> Billing</a>
      </nav>
      <div className="settings-content">
        <Panel title="Profile information" subtitle="Update the personal details connected to your account." className="settings-panel">
          <form onSubmit={updateProfile}>
            <div className="settings-avatar-row">
              <span className="profile-avatar settings-avatar">NF</span>
              <div>
                <strong>Profile photo</strong>
                <p>This will be visible to your team.</p>
              </div>
              <button type="button" className="button button-secondary button-small">Change photo</button>
            </div>
            <div className="settings-fields">
              <label className="form-field">Full name<input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} /></label>
              <label className="form-field">Email address<input type="email" value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} /></label>
              <label className="form-field">Store name<input value={profile.store} onChange={(event) => setProfile({ ...profile, store: event.target.value })} /></label>
              <label className="form-field">Phone number<input value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} /></label>
            </div>
            <div className="settings-save-row">
              <span className={saved ? "saved-message" : "save-hint"}>
                {saved ? (
                  <>
                    <ShieldCheck size={15} /> Your changes have been saved.
                  </>
                ) : (
                  "Changes are saved to this browser session."
                )}
              </span>
              <button type="submit" className="button button-primary">
                <Save size={16} /> Save changes
              </button>
            </div>
          </form>
        </Panel>
        <Panel title="Email notifications" subtitle="Choose the updates you’d like to receive." className="settings-panel">
          <div className="preference-list" id="notifications">
            {preferences.map((item) => (
              <div className="preference-row" key={item.id}>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={item.enabled}
                  aria-label={item.title}
                  className={`toggle-switch ${item.enabled ? "toggle-on" : ""}`}
                  onClick={() => togglePreference(item.id)}
                >
                  <span />
                </button>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Security" subtitle="Keep your account protected." className="settings-panel">
          <div className="security-row">
            <div className="security-icon">
              <LockKeyhole size={18} />
            </div>
            <div>
              <strong>Password</strong>
              <p>Last changed more than 90 days ago.</p>
            </div>
            <button className="button button-secondary button-small">Update password</button>
          </div>
          <div className="security-row">
            <div className="security-icon">
              <ShieldCheck size={18} />
            </div>
            <div>
              <strong>Two-factor authentication</strong>
              <p>Add an extra layer of security to your account.</p>
            </div>
            <button className="button button-secondary button-small">Set up 2FA</button>
          </div>
        </Panel>
      </div>
    </div>
  </div>;
}
export default Settings;
