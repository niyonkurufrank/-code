import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function PageHeading({ eyebrow, title, description, actions }) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="page-description">{description}</p>}
      </div>
      {actions && <div className="heading-actions">{actions}</div>}
    </div>
  );
}

export function MetricCard({ label, value, change, icon: Icon, tone = "gold", negative = false }) {
  return (
    <article className="metric-card">
      <div className="metric-topline">
        <span>{label}</span>
        {Icon && <span className={`metric-icon metric-icon-${tone}`}><Icon size={17} strokeWidth={1.8} /></span>}
      </div>
      <strong className="metric-value">{value}</strong>
      {change && <div className={`metric-change ${negative ? "change-negative" : ""}`}>
        {negative ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
        <span>{change}</span>
      </div>}
    </article>
  );
}

export function StatusPill({ children, tone }) {
  const normalized = tone || String(children).toLowerCase().replaceAll(" ", "-");
  return <span className={`status-pill status-${normalized}`}>{children}</span>;
}

export function Panel({ title, subtitle, action, children, className = "", id }) {
  return (
    <section id={id} className={`panel ${className}`}>
      {(title || action) && <div className="panel-heading">
        <div>{title && <h2>{title}</h2>}{subtitle && <p>{subtitle}</p>}</div>
        {action && <div className="panel-action">{action}</div>}
      </div>}
      {children}
    </section>
  );
}