import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownRight, ArrowUpRight, CalendarDays, Download, ShoppingBag, Users, Wallet } from "lucide-react";
import { MetricCard, PageHeading, Panel } from "../components/ui";
const monthlySales = [
  { month: "Dec", sales: 22800 },
  { month: "Jan", sales: 26400 }, 
  { month: "Feb", sales: 23800 }, 
  { month: "Mar", sales: 31200 }, 
  { month: "Apr", sales: 35600 }, 
  { month: "May", sales: 48294 }];
const categories = [
  { name: "Home & Living", amount: 18450, color: "#d7a84e" }, 
  { name: "Accessories", amount: 12620, color: "#90a9c4" }, 
  { name: "Wellness", amount: 9320, color: "#a99ac6" }, 
  { name: "Apparel", amount: 7904, color: "#8db19c" }];

function Analytics() {
  return <div className="page-stack">
    <PageHeading eyebrow="STORE PERFORMANCE" title="Analytics" description="Make confident decisions with a clearer view of your growth." actions={<><button className="button button-secondary"><CalendarDays size={16} /> May 1 – May 31, 2026</button><button className="button button-primary"><Download size={16} /> Download report</button></>} />
    <div className="metric-grid"><MetricCard label="Net sales" value="$48,294" change="12.8% vs last month" icon={Wallet} tone="gold" /><MetricCard label="Orders placed" value="1,284" change="8.2% vs last month" icon={ShoppingBag} tone="blue" /><MetricCard label="New customers" value="184" change="16.7% vs last month" icon={Users} tone="purple" /><MetricCard label="Conversion rate" value="3.84%" change="0.6% vs last month" icon={ArrowUpRight} tone="green" /></div>
    <div className="analytics-grid"><Panel title="Sales over time" subtitle="Monthly sales for the last six months" action={<span className="chart-key"><i className="legend-dot legend-gold" /> Net sales</span>} className="analytics-wide-panel"><div className="chart-summary"><strong>$48,294</strong><span className="summary-tag"><ArrowUpRight size={14} /> 12.8%</span><small>May sales are up compared to April</small></div><div className="analytics-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={monthlySales} margin={{ top: 12, right: 8, left: -20, bottom: 0 }}><CartesianGrid stroke="#252a32" strokeDasharray="3 5" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#7d8792", fontSize: 12 }} tickMargin={12} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#7d8792", fontSize: 11 }} tickFormatter={(value) => `$${value / 1000}k`} /><Tooltip cursor={{ fill: "#ffffff08" }} contentStyle={{ background: "#171b20", border: "1px solid #303740", borderRadius: 10, color: "#f4f2ec" }} formatter={(value) => [`$${Number(value).toLocaleString()}`, "Sales"]} /><Bar dataKey="sales" radius={[6, 6, 0, 0]}>{monthlySales.map((entry, index) => <Cell key={entry.month} fill={index === monthlySales.length - 1 ? "#d7a84e" : "#6f674f"} />)}</Bar></BarChart></ResponsiveContainer></div></Panel>
      <Panel title="Sales by category" subtitle="Revenue contribution this month"><div className="category-list">{categories.map((item, index) => <div className="category-row" key={item.name}><div className="category-info"><span className="category-marker" style={{ backgroundColor: item.color }}>{String(index + 1).padStart(2, "0")}</span><span>{item.name}</span><strong>${item.amount.toLocaleString()}</strong></div><div className="inventory-track category-track"><span style={{ width: `${(item.amount / 48294) * 100}%`, backgroundColor: item.color }} /></div><small>{((item.amount / 48294) * 100).toFixed(1)}% of total sales</small></div>)}</div></Panel>
    </div>
    <div className="analytics-bottom-grid">
      <Panel title="Customer acquisition" subtitle="How your audience is growing">
        <div className="acquisition-highlight">
          <span className="acquisition-icon"><Users size={19} /></span>
        <div>
          <strong>184 <span>new customers</span></strong>
          <p>That’s 26 more than last month.</p>
        </div>
        <span className="summary-tag"><ArrowUpRight size={14} /> 16.7%</span>
        </div>
        <div className="acquisition-bars">
          <div>
            <span>Organic search</span>
            <div className="inventory-track">
              <span style={{ width: "72%" }} />
            </div>
            <strong>72</strong>
          </div>
          <div>
            <span>Social media</span>
            <div className="inventory-track">
              <span style={{ width: "54%" }} />
            </div>
            <strong>54</strong>
          </div>
          <div>
            <span>Direct</span>
            <div className="inventory-track">
              <span style={{ width: "38%" }} />
            </div>
            <strong>38</strong>
          </div>
          <div>
            <span>Referral</span>
            <div className="inventory-track">
              <span style={{ width: "20%" }} />
            </div>
            <strong>20</strong>
          </div>
        </div>
      </Panel>
      <Panel title="Store insights" subtitle="A few things worth knowing">
        <div className="insight-list">
          <div className="insight-item">
            <span className="insight-symbol insight-up">
              <ArrowUpRight size={16} />
            </span>
            <div>
              <strong>Average order value is up</strong>
              <p>Customers spend $37.61 per order, up 4.3% from April.</p>
            </div>
          </div>
          <div className="insight-item">
            <span className="insight-symbol insight-down">
              <ArrowDownRight size={16} />
            </span>
            <div>
              <strong>Weekend sales are softer</strong>
              <p>Saturday revenue dipped 6%. Consider a weekend offer.</p>
            </div>
          </div>
          <div className="insight-item">
            <span className="insight-symbol insight-up">
              <ShoppingBag size={15} />
            </span>
            <div>
              <strong>Home & Living leads</strong>
              <p>Your top category accounts for 38.2% of monthly sales.</p>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  </div>;
}
export default Analytics;
