import { useState } from "react";
import { ArrowRight, BarChart3, BookOpen, CircleHelp, LifeBuoy, Package, Search, Settings, ShoppingBag, Users } from "lucide-react";
import { PageHeading, Panel } from "../components/ui";
const topics = [
  { icon: BookOpen, title: "Getting started", text: "Set up your storefront, add your first products, and get ready to sell.", category: "Basics", count: "6 guides" },
  { icon: ShoppingBag, title: "Orders & fulfillment", text: "Learn how to process, ship, refund, and keep track of orders.", category: "Selling", count: "8 guides" },
  { icon: Package, title: "Products & inventory", text: "Build your catalog and make sure your best sellers stay in stock.", category: "Selling", count: "5 guides" },
  { icon: Users, title: "Customers", text: "Understand customer profiles, loyalty, and building lasting relationships.", category: "Growth", count: "4 guides" },
  { icon: BarChart3, title: "Reports & analytics", text: "Turn your store data into practical decisions for your business.", category: "Growth", count: "7 guides" },
  { icon: Settings, title: "Account & settings", text: "Manage your account, team preferences, and store configuration.", category: "Basics", count: "5 guides" },
];
function Help() {
  const [search, setSearch] = useState("");
  const filteredTopics = topics.filter((topic) => `${topic.title} ${topic.text} ${topic.category}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="page-stack">
    <PageHeading eyebrow="WE’RE HERE TO HELP" title="Help center" description="Find the answers and guidance you need to keep your store moving." />
    <Panel className="help-hero">
      <span className="help-hero-icon"><LifeBuoy size={22} /></span>
      <h2>What can we help you with?</h2><p>Search guides, explore popular topics, or get in touch with our team.</p>
      <label className="help-search"><Search size={18} />
      <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try “how do I fulfill an order?”" />
      <kbd>⌕</kbd>
      </label>
        <div className="popular-searches">
          <span>Popular:</span>
          {["Track an order", "Add a product", "View sales"].map((term) => 
          <button key={term} onClick={() => setSearch(term)}>{term}</button>)}
        </div>
      </Panel>
    <div className="help-section-heading">
      <div>
        <h2>Browse by topic</h2>
        <p>Step-by-step guides to help you get the most from Marketly.</p>
      </div>
      <span>{filteredTopics.length} topics</span>
    </div>
    {filteredTopics.length ? 
    <div className="help-topic-grid">
      {filteredTopics.map(({ icon: Icon, title, text, category, count }) => 
      <article className="help-topic-card" key={title}>
        <span className="help-topic-icon"><Icon size={19} />
        </span>
        <span className="help-category">{category}</span>
        <h3>{title}</h3>
        <p>{text}</p>
        <button onClick={() => setSearch(title)}>{count} <ArrowRight size={15} /></button>
        </article>)}
    </div> : 
    <div className="empty-state">
      <Search size={26} />
      <strong>No guides found</strong>
      <span>Try a different keyword or reach out to support.</span>
    </div>}
    <div className="support-banner">
      <div className="support-icon">
        <CircleHelp size={21} />
      </div>
      <div>
        <strong>Still need a hand?</strong>
        <p>Our friendly support team is here Monday to Friday, 9am–6pm ET.</p>
      </div>
        <a className="button button-primary" href="mailto:niyonkurufrank91@gmail.com?subject=Marketly%20support">Contact support <ArrowRight size={15} /></a>
      </div>
  </div>;
}
export default Help;
