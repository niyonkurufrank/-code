import { useState } from "react";
import { Download, Plus, Search, UserRoundCheck, Users, Wallet, X } from "lucide-react";
import { MetricCard, PageHeading, Panel, StatusPill } from "../components/ui";
import { downloadCsv } from "../utils/downloadCsv";
const initialCustomers = [
  { name: "Sophia Johnson", email: "sophia.j@email.com", orders: 24, spent: 4280, joined: "Mar 12, 2025", tier: "Platinum" },
  { name: "Marcus Lee", email: "marcus.lee@email.com", orders: 18, spent: 3120, joined: "Jun 03, 2025", tier: "Gold" },
  { name: "Emma Rodriguez", email: "emma.r@email.com", orders: 16, spent: 2890, joined: "Jul 21, 2025", tier: "Gold" },
  { name: "Daniel Kim", email: "daniel.k@email.com", orders: 12, spent: 2140, joined: "Sep 09, 2025", tier: "Silver" },
  { name: "Olivia Lopez", email: "olivia.l@email.com", orders: 9, spent: 1850, joined: "Oct 18, 2025", tier: "Silver" },
  { name: "Noah Williams", email: "noah.w@email.com", orders: 7, spent: 1120, joined: "Jan 04, 2026", tier: "Silver" },
  { name: "Ava Patel", email: "ava.p@email.com", orders: 4, spent: 640, joined: "Feb 12, 2026", tier: "Member" },
];
function Customers() {
  const [customers, setCustomers] = useState(initialCustomers); const [search, setSearch] = useState(""); const [dialogOpen, setDialogOpen] = useState(false); const [form, setForm] = useState({ name: "", email: "" });
  const filteredCustomers = customers.filter((customer) => `${customer.name} ${customer.email}`.toLowerCase().includes(search.toLowerCase()));
  const addCustomer = (event) => { event.preventDefault(); if (!form.name.trim() || !form.email.trim()) return; setCustomers((current) => [{ ...form, name: form.name.trim(), orders: 0, spent: 0, joined: "May 26, 2026", tier: "Member" }, ...current]); setForm({ name: "", email: "" }); setDialogOpen(false); };
  const exportList = () => downloadCsv(
    "marketly-customers.csv",
    ["Name", "Email", "Orders", "Total spent", "Joined", "Tier"],
    filteredCustomers.map((person) => [person.name, person.email, person.orders, person.spent, person.joined, person.tier]),
  );
  return <div className="page-stack">
    <PageHeading eyebrow="YOUR COMMUNITY" title="Customers" description="Get to know the people behind every order." actions={<><button className="button button-secondary" onClick={exportList}><Download size={16} /> Export list</button><button className="button button-primary" onClick={() => setDialogOpen(true)}><Plus size={17} /> Add customer</button></>} />
    <div className="metric-grid metric-grid-three"><MetricCard label="Total customers" value="892" change="18 new this month" icon={Users} tone="gold" /><MetricCard label="Repeat customers" value="68.4%" change="4.2% vs last month" icon={UserRoundCheck} tone="green" /><MetricCard label="Lifetime value" value="$184.20" change="Average per customer" icon={Wallet} tone="purple" /></div>
    <Panel title="Customer directory" subtitle={`${filteredCustomers.length} customers`}><div className="catalog-controls"><label className="table-search catalog-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name or email..." /></label><span className="catalog-count">Sorted by most recent</span></div><div className="table-wrap"><table className="data-table customers-table"><thead><tr><th>Customer</th><th>Orders</th><th>Total spent</th><th>Customer since</th><th>Loyalty tier</th></tr></thead><tbody>{filteredCustomers.map((person) => <tr key={person.email}><td><span className="customer-cell"><i className="customer-avatar customer-avatar-large">{person.name.split(" ").map((part) => part[0]).join("")}</i><span className="customer-name">{person.name}<small className="customer-email">{person.email}</small></span></span></td><td>{person.orders} orders</td><td className="table-amount">${person.spent.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td><td>{person.joined}</td><td><StatusPill tone={person.tier.toLowerCase()}>{person.tier}</StatusPill></td></tr>)}{filteredCustomers.length === 0 && <tr><td colSpan="5" className="empty-table">No customers match your search.</td></tr>}</tbody></table></div><div className="table-pagination"><span>Showing <strong>{filteredCustomers.length}</strong> of <strong>{customers.length}</strong> customers</span><div><button className="button button-secondary button-small" disabled>Previous</button><button className="button button-secondary button-small">Next</button></div></div></Panel>
    {dialogOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialogOpen(false); }}><form className="modal-card" onSubmit={addCustomer}><div className="modal-heading"><div><p className="eyebrow">CUSTOMER DIRECTORY</p><h2>Add a customer</h2></div><button type="button" className="icon-button" onClick={() => setDialogOpen(false)} aria-label="Close dialog"><X size={18} /></button></div><label className="form-field">Full name<input autoFocus required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Jamie Rivera" /></label><label className="form-field">Email address<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="jamie@example.com" /></label><div className="modal-actions"><button type="button" className="button button-secondary" onClick={() => setDialogOpen(false)}>Cancel</button><button type="submit" className="button button-primary"><Plus size={16} /> Add customer</button></div></form></div>}
  </div>;
}
export default Customers;
