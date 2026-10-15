import { useMemo, useState } from "react";
import {
  Archive,
  ArrowDownLeft,
  ArrowUpRight,
  BadgeCheck,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  Clock3,
  Inbox,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Smile,
  Star,
  Tag,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { MetricCard, PageHeading, Panel, StatusPill } from "../components/ui";

const customers = [
  { id: 1, name: "Sophia Johnson", email: "sophia.j@email.com", orders: 24, spent: 4280, joined: "Mar 12, 2025", tier: "Platinum", color: "violet", product: "Canvas Weekender", orderId: "#ML-2841", subject: "Question about my Canvas Weekender", preview: "Could you tell me if the straps are adjustable?", time: "10:42 AM", unread: 2, priority: true, messages: [{ text: "Hi! I just placed an order for the Canvas Weekender. It looks beautiful.", time: "10:28 AM", mine: false }, { text: "Thanks so much, Sophia! Your order #ML-2841 is being prepared. What can I help you with?", time: "10:34 AM", mine: true }, { text: "Could you tell me if the straps are adjustable?", time: "10:42 AM", mine: false }] },
  { id: 2, name: "Marcus Lee", email: "marcus.lee@email.com", orders: 18, spent: 3120, joined: "Jun 03, 2025", tier: "Gold", color: "blue", product: "Everyday Ceramic Set", orderId: "#ML-2840", subject: "Delivery update", preview: "Perfect, thanks for checking on that!", time: "10:18 AM", unread: 0, priority: false, messages: [{ text: "Hey, do you have an update on my ceramic set?", time: "9:55 AM", mine: false }, { text: "Hi Marcus, your order #ML-2840 has shipped and is expected to arrive tomorrow.", time: "10:02 AM", mine: true }, { text: "Perfect, thanks for checking on that!", time: "10:18 AM", mine: false }] },
  { id: 3, name: "Emma Rodriguez", email: "emma.r@email.com", orders: 16, spent: 2890, joined: "Jul 21, 2025", tier: "Gold", color: "rose", product: "Linen Table Throw", orderId: "#ML-2839", subject: "Care instructions", preview: "Is it safe to machine wash on a gentle cycle?", time: "9:56 AM", unread: 1, priority: false, messages: [{ text: "I received my linen throw yesterday and love the texture!", time: "9:43 AM", mine: false }, { text: "So glad it arrived safely, Emma. Is there anything else I can help with?", time: "9:48 AM", mine: true }, { text: "Is it safe to machine wash on a gentle cycle?", time: "9:56 AM", mine: false }] },
  { id: 4, name: "Daniel Kim", email: "daniel.k@email.com", orders: 12, spent: 2140, joined: "Sep 09, 2025", tier: "Silver", color: "green", product: "Minimal Desk Lamp", orderId: "#ML-2838", subject: "Lamp setup help", preview: "That worked right away. Appreciate it!", time: "9:21 AM", unread: 0, priority: false, messages: [{ text: "I'm having trouble pairing the desk lamp with the app.", time: "8:58 AM", mine: false }, { text: "Try holding the touch control for five seconds until the light pulses. That resets pairing.", time: "9:12 AM", mine: true }, { text: "That worked right away. Appreciate it!", time: "9:21 AM", mine: false }] },
  { id: 5, name: "Olivia Lopez", email: "olivia.l@email.com", orders: 9, spent: 1850, joined: "Oct 18, 2025", tier: "Silver", color: "gold", product: "Botanical Candle Trio", orderId: "#ML-2837", subject: "Exchange request", preview: "One candle arrived with a chipped lid.", time: "Yesterday", unread: 1, priority: true, messages: [{ text: "One candle arrived with a chipped lid.", time: "Yesterday", mine: false }] },
  { id: 6, name: "Noah Williams", email: "noah.w@email.com", orders: 7, spent: 1120, joined: "Jan 04, 2026", tier: "Silver", color: "teal", product: "Woven Market Tote", orderId: "#ML-2836", subject: "Product question", preview: "Do you plan to restock the larger size?", time: "Yesterday", unread: 0, priority: false, messages: [{ text: "Do you plan to restock the larger size of the woven tote?", time: "Yesterday", mine: false }, { text: "We expect another batch early next month. I can let you know when it's available.", time: "Yesterday", mine: true }] },
  { id: 7, name: "Ava Patel", email: "ava.p@email.com", orders: 4, spent: 640, joined: "Feb 12, 2026", tier: "Member", color: "purple", product: "Stoneware Serving Bowl", orderId: "#ML-2835", subject: "Order question", preview: "Thank you for the quick reply!", time: "Mon", unread: 0, priority: false, messages: [{ text: "Is the serving bowl dishwasher safe?", time: "Mon", mine: false }, { text: "Yes, it's dishwasher and microwave safe.", time: "Mon", mine: true }, { text: "Thank you for the quick reply!", time: "Mon", mine: false }] },
];

const filters = ["All inbox", "Unread", "Priority", "Archived"];
const quickReplies = ["Thanks for reaching out!", "I’ll look into this for you.", "Your order is on its way!"];
const initials = (name) => name.split(" ").map((part) => part[0]).join("");

function Messages() {
  const [conversations, setConversations] = useState(() => customers.map((customer) => customer.id === 1 ? { ...customer, unread: 0 } : customer));
  const [activeId, setActiveId] = useState(1);
  const [filter, setFilter] = useState("All inbox");
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [showDetails, setShowDetails] = useState(true);
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeCustomer, setComposeCustomer] = useState("");
  const [composeText, setComposeText] = useState("");
  const active = conversations.find((conversation) => conversation.id === activeId);
  const unreadCount = conversations.filter((conversation) => conversation.unread > 0 && !conversation.archived).length;
  const visible = useMemo(() => conversations.filter((conversation) => {
    const term = search.trim().toLowerCase();
    const matchesSearch = !term || `${conversation.name} ${conversation.email} ${conversation.subject} ${conversation.preview} ${conversation.product}`.toLowerCase().includes(term);
    const matchesFilter = filter === "All inbox" ? !conversation.archived : filter === "Unread" ? conversation.unread > 0 && !conversation.archived : filter === "Priority" ? conversation.priority && !conversation.archived : conversation.archived;
    return matchesSearch && matchesFilter;
  }), [conversations, filter, search]);

  function openConversation(conversation) {
    setActiveId(conversation.id);
    setConversations((current) => current.map((item) => item.id === conversation.id ? { ...item, unread: 0 } : item));
  }

  function sendMessage(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !active) return;
    const time = new Intl.DateTimeFormat([], { hour: "2-digit", minute: "2-digit" }).format(new Date());
    setConversations((current) => current.map((item) => item.id === active.id ? { ...item, preview: text, time, messages: [...item.messages, { text, time, mine: true }] } : item));
    setDraft("");
  }

  function startConversation(event) {
    event.preventDefault();
    const customerId = Number(composeCustomer);
    const recipient = customers.find((customer) => customer.id === customerId);
    const text = composeText.trim();
    if (!recipient || !text) return;
    const time = new Intl.DateTimeFormat([], { hour: "2-digit", minute: "2-digit" }).format(new Date());
    setConversations((current) => {
      const existing = current.find((item) => item.id === recipient.id);
      if (existing) return current.map((item) => item.id === recipient.id ? { ...item, archived: false, unread: 0, preview: text, time, messages: [...item.messages, { text, time, mine: true }] } : item);
      return [{ ...recipient, subject: "New conversation", preview: text, time, unread: 0, priority: false, archived: false, messages: [{ text, time, mine: true }] }, ...current];
    });
    setActiveId(recipient.id);
    setFilter("All inbox");
    setComposeCustomer("");
    setComposeText("");
    setComposeOpen(false);
  }

  function togglePriority() {
    if (!active) return;
    setConversations((current) => current.map((item) => item.id === active.id ? { ...item, priority: !item.priority } : item));
  }

  function toggleArchived() {
    if (!active) return;
    setConversations((current) => current.map((item) => item.id === active.id ? { ...item, archived: !item.archived } : item));
    setFilter("All inbox");
  }

  function navigateToCustomers() {
    window.dispatchEvent(new CustomEvent("marketly:navigate", { detail: "Customers" }));
  }

  return <div className="page-stack messages-page">
    <PageHeading eyebrow="CUSTOMER RELATIONSHIPS" title="Messages" description="Every customer conversation, order update, and follow-up in one place." actions={<><span className="inbox-health"><i /> Inbox is healthy</span><button className="button button-primary" onClick={() => setComposeOpen(true)}><Plus size={16} /> New message</button></>} />
    <div className="metric-grid metric-grid-three messages-metrics">
      <MetricCard label="Open conversations" value={String(conversations.filter((conversation) => !conversation.archived).length).padStart(2, "0")} change="Across your customer inbox" icon={MessageCircle} tone="gold" />
      <MetricCard label="Awaiting your reply" value={String(conversations.filter((conversation) => conversation.unread > 0 && !conversation.archived).length).padStart(2, "0")} change="Customers are waiting" icon={Mail} tone="blue" />
      <MetricCard label="VIP customers" value={String(conversations.filter((conversation) => ["Gold", "Platinum"].includes(conversation.tier)).length).padStart(2, "0")} change="Gold & Platinum members" icon={BadgeCheck} tone="purple" />
    </div>

    <Panel className="messages-panel" title="Customer inbox" subtitle={`${unreadCount} unread conversations · synced with your customer directory`} action={<span className="inbox-live"><i /> Live inbox</span>}>
      <div className="messages-workspace">
        <aside className="inbox-column" aria-label="Conversation list">
          <label className="messages-search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search people, orders, messages" aria-label="Search conversations" /><kbd>⌘ K</kbd></label>
          <div className="inbox-filters" role="tablist" aria-label="Filter inbox">
            {filters.map((item) => <button key={item} role="tab" aria-selected={filter === item} className={filter === item ? "inbox-filter inbox-filter-active" : "inbox-filter"} onClick={() => setFilter(item)}>{item}{item === "Unread" && unreadCount > 0 && <span>{unreadCount}</span>}</button>)}
          </div>
          <div className="conversation-list">
            {visible.map((conversation) => <button type="button" key={conversation.id} className={`conversation-row${activeId === conversation.id ? " conversation-row-active" : ""}`} onClick={() => openConversation(conversation)}>
              <span className={`conversation-avatar avatar-${conversation.color}`}>{initials(conversation.name)}<i className="avatar-presence" /></span>
              <span className="conversation-preview"><span className="conversation-row-top"><strong>{conversation.name}</strong><time>{conversation.time}</time></span><span className="conversation-subject">{conversation.subject}</span><span className="conversation-lastline">{conversation.preview}</span><span className="conversation-badges">{conversation.tier === "Platinum" && <span className="mini-vip"><Star size={10} fill="currentColor" /> VIP</span>}{conversation.priority && <span className="mini-priority">Priority</span>}<span className="conversation-order">{conversation.orderId}</span></span></span>
              {conversation.unread > 0 && <span className="unread-badge">{conversation.unread}</span>}
            </button>)}
            {visible.length === 0 && <div className="inbox-empty"><Inbox size={23} /><strong>No conversations found</strong><span>Try another filter or search term.</span></div>}
          </div>
          <div className="inbox-footer"><UsersRound size={14} /><span>Showing {visible.length} of {conversations.length} customers</span><button type="button" onClick={navigateToCustomers}>Directory <ChevronRight size={13} /></button></div>
        </aside>

        <section className="thread-column" aria-label={active ? `Conversation with ${active.name}` : "Conversation"}>
          {active ? <>
            <header className="thread-header">
              <div className="thread-contact"><span className={`conversation-avatar thread-avatar avatar-${active.color}`}>{initials(active.name)}<i className="avatar-presence" /></span><div className="thread-contact-copy"><strong>{active.name}{active.tier === "Platinum" && <BadgeCheck size={14} />}</strong><span>{active.email} <i /> Customer since {active.joined}</span></div></div>
              <div className="thread-actions"><button type="button" className={`thread-action${active.priority ? " thread-action-selected" : ""}`} onClick={togglePriority} aria-label={active.priority ? "Remove priority" : "Mark as priority"}><Star size={16} fill={active.priority ? "currentColor" : "none"} /></button><button type="button" className="thread-action" onClick={toggleArchived} aria-label={active.archived ? "Unarchive conversation" : "Archive conversation"}><Archive size={16} /></button><button type="button" className="thread-action thread-details-toggle" onClick={() => setShowDetails((show) => !show)} aria-label="Toggle customer details"><MoreHorizontal size={18} /></button></div>
            </header>
            <div className="order-context"><span className="order-context-icon"><Tag size={14} /></span><div><span>Related order</span><strong>{active.orderId} <i /> {active.product}</strong></div><StatusPill tone={active.orderId === "#ML-2837" ? "cancelled" : "delivered"}>{active.orderId === "#ML-2837" ? "Needs attention" : "Order placed"}</StatusPill><button type="button" onClick={() => window.dispatchEvent(new CustomEvent("marketly:navigate", { detail: "Orders" }))}>View order <ChevronRight size={13} /></button></div>
            <div className="thread-messages"><div className="thread-day-divider"><span />Today, May 26<span /></div>{active.messages.map((message, index) => <div className={`message-line${message.mine ? " message-line-mine" : ""}`} key={`${active.id}-${index}-${message.time}`}>
              {!message.mine && <span className={`message-avatar avatar-${active.color}`}>{initials(active.name)}</span>}
              <div className="message-body"><span className="message-author">{message.mine ? "You" : active.name}</span><div className="message-bubble">{message.text}</div><span className="message-time">{message.time}{message.mine && <CheckCheck size={13} />}</span></div>
            </div>)}</div>
            <div className="quick-replies"><span>Quick replies</span>{quickReplies.map((reply) => <button type="button" key={reply} onClick={() => setDraft(reply)}>{reply}</button>)}</div>
            <form className="message-composer" onSubmit={sendMessage}><div className="composer-input-wrap"><textarea aria-label="Write a reply" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={`Reply to ${active.name.split(" ")[0]}…`} rows="1" onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(event); } }} /><div className="composer-tools"><button type="button" aria-label="Attach file"><Paperclip size={16} /></button><button type="button" aria-label="Insert emoji"><Smile size={16} /></button><span>Press Enter to send · Shift + Enter for a new line</span></div></div><button className="send-message-button" type="submit" disabled={!draft.trim()}><Send size={15} /><span>Send</span></button></form>
          </> : <div className="thread-placeholder"><MessageCircle size={30} /><strong>Select a conversation</strong><span>Choose a customer from your inbox to view their conversation.</span></div>}
        </section>

        {active && showDetails && <aside className="customer-details" aria-label="Customer details"><div className="details-title"><span>Customer profile</span><button type="button" onClick={() => setShowDetails(false)} aria-label="Hide customer details"><X size={15} /></button></div><div className="customer-profile"><span className={`profile-avatar-large avatar-${active.color}`}>{initials(active.name)}</span><strong>{active.name}</strong><span>{active.email}</span><StatusPill tone={active.tier.toLowerCase()}>{active.tier} member</StatusPill><button type="button" className="profile-directory-link" onClick={navigateToCustomers}>View customer profile <ChevronRight size={13} /></button></div>
          <div className="customer-stats"><div><span>Total spent</span><strong>${active.spent.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong></div><div><span>Orders</span><strong>{active.orders}</strong></div></div>
          <div className="details-section"><div className="details-section-heading"><span>Recent order</span><button type="button" onClick={() => window.dispatchEvent(new CustomEvent("marketly:navigate", { detail: "Orders" }))}>All orders</button></div><div className="recent-order-card"><span className="recent-order-icon"><ArrowDownLeft size={15} /></span><div><strong>{active.product}</strong><span>{active.orderId} · May 26, 2026</span></div><ChevronDown size={14} /></div></div>
          <div className="details-section customer-tags"><div className="details-section-heading"><span>Customer since</span></div><div className="joined-date"><Clock3 size={14} />{active.joined}</div><div className="details-tip"><ShieldCheck size={15} /><span>Customer information is synced with your directory.</span></div></div>
          <button type="button" className="details-open-directory" onClick={navigateToCustomers}><UserRound size={15} /> Open in customer directory <ArrowUpRight size={14} /></button>
        </aside>}
      </div>
    </Panel>

    {composeOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setComposeOpen(false); }}><form className="modal-card compose-modal" onSubmit={startConversation}><div className="modal-heading"><div><p className="eyebrow">CUSTOMER SUPPORT</p><h2>Start a conversation</h2></div><button type="button" className="icon-button" onClick={() => setComposeOpen(false)} aria-label="Close dialog"><X size={18} /></button></div><label className="form-field">Customer<select required autoFocus value={composeCustomer} onChange={(event) => setComposeCustomer(event.target.value)}><option value="">Choose a customer…</option>{customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name} · {customer.email}</option>)}</select></label><label className="form-field">Message<textarea required rows="4" value={composeText} onChange={(event) => setComposeText(event.target.value)} placeholder="Write a helpful, personal message…" /></label><div className="modal-actions"><button type="button" className="button button-secondary" onClick={() => setComposeOpen(false)}>Cancel</button><button type="submit" className="button button-primary"><Send size={15} /> Send message</button></div></form></div>}
  </div>;
}

export default Messages;
