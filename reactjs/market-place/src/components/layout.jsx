import { useEffect, useState } from "react";
import {
  BarChart3,
  Bell,
  ChevronDown,
  CircleHelp,
  Command,
  LayoutDashboard,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Orders", icon: ShoppingBag, badge: "7" },
  { label: "Products", icon: Package },
  { label: "Customers", icon: Users },
  { label: "Analytics", icon: BarChart3 },
  { label: "Messages", icon: Bell, badge: "3" },
];

function Layout({ children, page, setPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleNavigate = (event) => setPage(event.detail);
    window.addEventListener("marketly:navigate", handleNavigate);
    return () => window.removeEventListener("marketly:navigate", handleNavigate);
  }, [setPage]);

  const navigate = (nextPage) => {
    setPage(nextPage);
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-shell">
      {mobileMenuOpen && <button aria-label="Close navigation" className="sidebar-scrim" onClick={() => setMobileMenuOpen(false)} />}
      <aside className={`sidebar ${mobileMenuOpen ? "sidebar-open" : ""}`}>
        <div className="brand-row">
          <button className="brand" onClick={() => navigate("Dashboard")} aria-label="Go to dashboard">
            <span className="brand-mark"><Command size={21} strokeWidth={2.4} /></span>
            <span className="brand-copy"><strong>Market<span>ly</span></strong><small>SELLER STUDIO</small></span>
          </button>
          <button className="sidebar-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu"><X size={19} /></button>
        </div>

        <button className="workspace-switcher" onClick={() => navigate("Settings")}>
          <span className="workspace-avatar">N</span>
          <span className="workspace-copy"><strong>Northstar Goods</strong><small>Pro workspace</small></span>
          <ChevronDown size={15} />
        </button>

        <p className="nav-caption">WORKSPACE</p>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navigation.map(({ label, icon: Icon, badge }) => (
            <button key={label} className={`nav-link ${page === label ? "nav-link-active" : ""}`} onClick={() => navigate(label)} aria-current={page === label ? "page" : undefined}>
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {badge && <span className="nav-badge">{badge}</span>}
            </button>
          ))}
        </nav>

        <p className="nav-caption nav-caption-lower">PREFERENCES</p>
        <nav className="sidebar-nav" aria-label="Preferences">
          <button className={`nav-link ${page === "Settings" ? "nav-link-active" : ""}`} onClick={() => navigate("Settings")} aria-current={page === "Settings" ? "page" : undefined}><Settings size={18} strokeWidth={1.8} /><span>Settings</span></button>
          <button className={`nav-link ${page === "Help" ? "nav-link-active" : ""}`} onClick={() => navigate("Help")} aria-current={page === "Help" ? "page" : undefined}><CircleHelp size={18} strokeWidth={1.8} /><span>Help & support</span></button>
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card"><span className="upgrade-spark">✦</span><strong>Make more happen</strong><p>Unlock deeper insights and grow your store faster.</p><button onClick={() => navigate("Analytics")}>Explore Pro <span>↗</span></button></div>
          <button className="profile-row" onClick={() => navigate("Settings")}><span className="profile-avatar">AM</span><span className="profile-copy"><strong>NIYONKUR Frank</strong><small>Store owner</small></span><ChevronDown size={15} /></button>
        </div>
      </aside>

      <div className="main-shell">
        <header className="topbar">
          <button className="mobile-menu-button icon-button" onClick={() => setMobileMenuOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
          <div className="topbar-crumb"><span>Store</span><span className="crumb-divider">/</span><strong>{page}</strong></div>
          <div className="topbar-actions">
            <label className="global-search"><Search size={16} /><input aria-label="Search dashboard" placeholder="Search anything..." /><kbd>⌘ K</kbd></label>
            <button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button>
            <button className="topbar-profile" onClick={() => navigate("Settings")}><span className="profile-avatar profile-avatar-small">AM</span><ChevronDown size={14} /></button>
          </div>
        </header>
        <main className="page-content" key={page}>{children}</main>
        <footer className="app-footer"><span>© 2026 Marketly, Inc.</span><span>Made for makers <span className="footer-heart">♥</span></span><div><button onClick={() => navigate("Help")}>Help center</button><button onClick={() => navigate("Settings")}>Privacy</button></div></footer>
      </div>
    </div>
  );
}

export default Layout;
