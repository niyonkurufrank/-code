import { useState } from "react";
import { Boxes, CircleDollarSign, ImagePlus, Package, Plus, Search, SlidersHorizontal, Trash2, X } from "lucide-react";
import { MetricCard, PageHeading, Panel, StatusPill } from "../components/ui";
import headphonesImage from "../images/headphones.jpg";
import smartwatchImage from "../images/smartwatch.jpeg";
import walletImage from "../images/wallets.jpeg";
const startProducts = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 199, stock: 12, sold: 148, mark: "WH", tone: "sand", image: headphonesImage },
  { id: 2, name: "Smart Watch Pro", category: "Wearables", price: 249, stock: 4, sold: 96, mark: "SW", tone: "sage", image: smartwatchImage },
  { id: 3, name: "Linen Table Throw", category: "Home & Living", price: 85, stock: 21, sold: 74, mark: "LT", tone: "rose", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCqPLfavKzrvLqaAOzRfSUbw6erSHEb7R8AZ_No_Pi6w&s" },
  { id: 4, name: "Botanical Candle Trio", category: "Wellness", price: 58, stock: 0, sold: 63, mark: "BC", tone: "lilac", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZjfhUQWb9Go5XYym_lMZ99W_1TslhQ9ByN-jMipgIY--hCFr4tuL01XEj&s=10"},
  { id: 5, name: "Minimal Desk Lamp", category: "Home & Living", price: 192, stock: 12, sold: 51, mark: "DL", tone: "blue", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjSBEQiHrllZF8uK3-i-p4HjNxaN0xqgFIpsbspqHzXQ&s=10" },
  { id: 6, name: "Leather Wallet", category: "Accessories", price: 59, stock: 20, sold: 47, mark: "LW", tone: "gold", image: walletImage },
];
function Products() {
  const [products, setProducts] = useState(startProducts); 
  const [search, setSearch] = useState(""); 
  const [category, setCategory] = useState("All categories"); 
  const [dialogOpen, setDialogOpen] = useState(false); 
  const [imageError, setImageError] = useState(""); 
  const [form, setForm] = useState(
    { name: "", category: "Accessories", price: "", stock: "", image: "" });
  const categories = ["All categories", ...new Set(products.map((product) => product.category))];
  const filteredProducts = products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase()) && (category === "All categories" || product.category === category));
  const chooseImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setImageError("Choose an image file such as JPG, PNG, or WebP.");
      event.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Images must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, image: String(reader.result) }));
      setImageError("");
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };
  const clearForm = () => {
    setForm({ name: "", category: "Accessories", price: "", stock: "", image: "" });
    setImageError("");
    setDialogOpen(false);
  };
  const addProduct = (event) => { event.preventDefault(); const name = form.name.trim(); if (!name || !Number(form.price)) return; setProducts((current) => [{ id: Date.now(), name, category: form.category, price: Number(form.price), stock: Number(form.stock) || 0, sold: 0, mark: name.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase(), tone: "gold", image: form.image }, ...current]); clearForm(); };
  const removeProduct = (id) => setProducts((current) => current.filter((product) => product.id !== id));
  const inventoryValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);
  return <div className="page-stack">
    <PageHeading eyebrow="CATALOG & INVENTORY" title="Products" description="Keep your catalog fresh and your inventory in check." actions={<button className="button button-primary" onClick={() => setDialogOpen(true)}><Plus size={17} /> Add product</button>} />
    <div className="metric-grid metric-grid-three"><MetricCard label="Total products" value={String(products.length).padStart(2, "0")} change="Across all collections" icon={Boxes} tone="gold" /><MetricCard label="Inventory value" value={`$${inventoryValue.toLocaleString()}`} change="At current retail pricing" icon={CircleDollarSign} tone="green" /><MetricCard label="Low stock items" value={String(products.filter((product) => product.stock > 0 && product.stock < 10).length).padStart(2, "0")} change="Restock recommended" icon={Package} tone="blue" /></div>
    <Panel title="Product catalog" subtitle={`${filteredProducts.length} products`}><div className="catalog-controls"><label className="table-search catalog-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products..." /></label><label className="select-control"><SlidersHorizontal size={15} /><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category">{categories.map((option) => <option key={option}>{option}</option>)}</select></label><span className="catalog-count">Showing {filteredProducts.length} of {products.length}</span></div>
      {filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <article className="catalog-card" key={product.id}><div className={`catalog-art art-${product.tone}`}>{product.image ? <img className="catalog-photo" src={product.image} alt={product.name} /> : <span className="product-mark">{product.mark}</span>}<span className="catalog-category">{product.category}</span><button className="catalog-delete" onClick={() => removeProduct(product.id)} aria-label={`Delete ${product.name}`}><Trash2 size={15} /></button></div><div className="catalog-card-body"><div className="catalog-title-row"><div><h3>{product.name}</h3><p>SKU-{String(product.id).padStart(4, "0")}</p></div><strong className="catalog-price">${product.price.toFixed(2)}</strong></div><div className="catalog-meta"><span className="stock-line"><i className={`stock-dot ${product.stock === 0 ? "stock-dot-out" : product.stock < 10 ? "stock-dot-low" : ""}`} />{product.stock === 0 ? "Out of stock" : `${product.stock} in stock`}</span><span>{product.sold} sold</span></div><div className="inventory-track"><span style={{ width: `${Math.min(product.stock * 2, 100)}%` }} className={product.stock < 10 ? "inventory-low" : ""} /></div><div className="catalog-card-footer"><StatusPill tone={product.stock === 0 ? "cancelled" : product.stock < 10 ? "pending" : "delivered"}>{product.stock === 0 ? "Out of stock" : product.stock < 10 ? "Low stock" : "In stock"}</StatusPill><button className="text-button" onClick={() => setDialogOpen(true)}>Edit details <span>↗</span></button></div></div></article>)}</div> : <div className="empty-state"><Package size={28} /><strong>No products found</strong><span>Try a different search or category.</span></div>}
    </Panel>
    {dialogOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) clearForm(); }}><form className="modal-card" onSubmit={addProduct}><div className="modal-heading"><div><p className="eyebrow">CATALOG</p><h2>Add a product</h2></div><button type="button" className="icon-button" onClick={clearForm} aria-label="Close dialog"><X size={18} /></button></div><label className="product-image-upload">{form.image ? <img src={form.image} alt="Product upload preview" /> : <span className="image-upload-prompt"><ImagePlus size={23} /><strong>Add a product photo</strong><small>JPG, PNG or WebP · up to 5 MB</small></span>}<input type="file" accept="image/*" onChange={chooseImage} aria-label="Choose product photo" />{form.image && <span className="replace-photo">Choose a different photo</span>}</label>{imageError && <p className="image-upload-error" role="alert">{imageError}</p>}<label className="form-field">Product name<input autoFocus required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Handmade mug" /></label><label className="form-field">Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>{["Accessories", "Home & Living", "Wellness", "Apparel", "Electronics", "Wearables"].map((item) => <option key={item}>{item}</option>)}</select></label><div className="form-row"><label className="form-field">Price<input required min="0.01" step="0.01" type="number" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="0.00" /></label><label className="form-field">Starting stock<input min="0" type="number" value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} placeholder="0" /></label></div><div className="modal-actions"><button type="button" className="button button-secondary" onClick={clearForm}>Cancel</button><button type="submit" className="button button-primary"><Plus size={16} /> Add product</button></div></form></div>}
  </div>;
}
export default Products;
