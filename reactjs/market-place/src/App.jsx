import { useState } from "react";
import "./App.css";
import Layout from "./components/layout";

import Dashboard from "./pages/dashboard";
import Orders from "./pages/orders";
import Products from "./pages/products";
import Customers from "./pages/customers";
import Analytics from "./pages/analytics";
import Messages from "./pages/messages";
import Settings from "./pages/settings";
import Help from "./pages/help";

function App() {
  const [page, setPage] = useState("Dashboard");

  const pages = {
    Dashboard: <Dashboard key="dashboard" />,
    Orders: <Orders key="orders" />,
    Products: <Products key="products" />,
    Customers: <Customers key="customers" />,
    Analytics: <Analytics key="analytics" />,
    Messages: <Messages key="messages" />,
    Settings: <Settings key="settings" />,
    Help: <Help key="help" />,
  };

  return (
    <Layout page={page} setPage={setPage}>
      {pages[page] || <Dashboard />}
    </Layout>
  );
}

export default App;