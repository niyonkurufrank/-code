import { useState } from "react";
import { Download, Plus, Search, ShoppingBag, Wallet, Clock3, PackageCheck, X } from "lucide-react";
import { MetricCard, PageHeading, Panel, StatusPill } from "../components/ui";
import { downloadCsv } from "../utils/downloadCsv";

const initialOrders = [
  { id: "#ML-2841", customer: "Sophia Johnson", email: "sophia.j@email.com", item: "Canvas Weekender", date: "May 26, 2026", amount: 248, status: "Processing" },
  { id: "#ML-2840", customer: "Marcus Lee", email: "marcus.lee@email.com", item: "Everyday Ceramic Set", date: "May 26, 2026", amount: 86.5, status: "Shipped" },
  { id: "#ML-2839", customer: "Emma Rodriguez", email: "emma.r@email.com", item: "Linen Table Throw", date: "May 25, 2026", amount: 124, status: "Delivered" },
  { id: "#ML-2838", customer: "Daniel Kim", email: "daniel.k@email.com", item: "Minimal Desk Lamp", date: "May 25, 2026", amount: 192, status: "Processing" },
  { id: "#ML-2837", customer: "Olivia Lopez", email: "olivia.l@email.com", item: "Botanical Candle Trio", date: "May 24, 2026", amount: 58, status: "Cancelled" },
  { id: "#ML-2836", customer: "Noah Williams", email: "noah.w@email.com", item: "Woven Market Tote", date: "May 24, 2026", amount: 72, status: "Delivered" },
  { id: "#ML-2835", customer: "Ava Patel", email: "ava.p@email.com", item: "Stoneware Serving Bowl", date: "May 23, 2026", amount: 94, status: "Shipped" },
];
const tabs = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];
function Orders() {
  const [orders, setOrders] = useState(initialOrders); const [activeTab, setActiveTab] = useState("All"); const [search, setSearch] = useState(""); const [showNewOrder, setShowNewOrder] = useState(false); const [customer, setCustomer] = useState(""); const [amount, setAmount] = useState("");
  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === "All" || order.status === activeTab;
    const term = search.trim().toLowerCase();
    return matchesTab && (!term || `${order.id} ${order.customer} ${order.email} ${order.item}`.toLowerCase().includes(term));
  });
  const exportOrders = () => downloadCsv(
    "marketly-orders.csv",
    ["Order", "Customer", "Product", "Date", "Amount", "Status"],
    filteredOrders.map((order) => [order.id, order.customer, order.item, order.date, order.amount.toFixed(2), order.status]),
  );
  const addOrder = (event) => { event.preventDefault(); if (!customer.trim() || !Number(amount)) return; setOrders((current) => [{ id: `#ML-${2842 + current.length - initialOrders.length}`, customer: customer.trim(), email: "—", item: "Custom order", date: "May 26, 2026", amount: Number(amount), status: "Processing" }, ...current]); setCustomer(""); setAmount(""); setShowNewOrder(false); };
  return <div className="page-stack">
    <PageHeading eyebrow="SALES & FULFILLMENT" title="Orders" description="Track, manage, and fulfill your customer orders." actions={<><button className="button button-secondary" onClick={exportOrders}><Download size={16} /> Export</button><button className="button button-primary" onClick={() => setShowNewOrder(true)}><Plus size={17} /> Create order</button></>} />
    <div className="metric-grid"><MetricCard label="Total orders" value="1,284" change="8.2% vs last month" icon={ShoppingBag} tone="gold" /><MetricCard label="Gross sales" value="$48,294" change="12.8% vs last month" icon={Wallet} tone="green" /><MetricCard label="To fulfill" value="23" change="Needs your attention" icon={Clock3} tone="blue" /><MetricCard label="Delivered" value="1,142" change="96.4% on-time rate" icon={PackageCheck} tone="purple" /></div>
    <Panel title="All orders" subtitle={`${filteredOrders.length} orders shown`}><div className="table-controls"><div className="tab-list" role="tablist" aria-label="Filter orders by status">{tabs.map((tab) => <button role="tab" aria-selected={activeTab === tab} key={tab} className={`filter-tab ${activeTab === tab ? "filter-tab-active" : ""}`} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div><label className="table-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search orders..." /></label></div><div className="table-wrap"><table className="data-table orders-table"><thead><tr><th>Order</th><th>Customer</th><th>Product</th><th>Date</th><th>Status</th><th>Total</th></tr></thead><tbody>{filteredOrders.map((order) => <tr key={order.id}><td className="table-id">{order.id}</td><td><span className="customer-cell"><i className="customer-avatar">{order.customer.split(" ").map((part) => part[0]).join("")}</i><span>{order.customer}<small className="customer-email">{order.email}</small></span></span></td><td>{order.item}</td><td>{order.date}</td><td><StatusPill>{order.status}</StatusPill></td><td className="table-amount">${order.amount.toFixed(2)}</td></tr>)}{filteredOrders.length === 0 && <tr><td colSpan="6" className="empty-table">No orders match your search.</td></tr>}</tbody></table></div><div className="table-pagination"><span>Showing <strong>{filteredOrders.length}</strong> of <strong>{orders.length}</strong> orders</span><div><button className="button button-secondary button-small" disabled>Previous</button><button className="button button-secondary button-small">Next</button></div></div></Panel>
    {showNewOrder && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowNewOrder(false); }}><form className="modal-card" onSubmit={addOrder}><div className="modal-heading"><div><p className="eyebrow">MANUAL ENTRY</p><h2>Create an order</h2></div><button type="button" className="icon-button" onClick={() => setShowNewOrder(false)} aria-label="Close dialog"><X size={18} /></button></div><label className="form-field">Customer name<input autoFocus required value={customer} onChange={(event) => setCustomer(event.target.value)} placeholder="e.g. Jamie Rivera" /></label><label className="form-field">Order total<input required min="0.01" step="0.01" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" /></label><div className="modal-actions"><button type="button" className="button button-secondary" onClick={() => setShowNewOrder(false)}>Cancel</button><button className="button button-primary" type="submit"><Plus size={16} /> Create order</button></div></form></div>}
  </div>;
}
export default Orders;
