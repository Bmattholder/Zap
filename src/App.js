import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SideNav from "./components/SideNav";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewTicketForm from "./components/NewTicketForm";
import TicketDetails from "./components/TicketDetails";

function App() {
  return (
    <Router>
      <SideNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-ticket" element={<NewTicketForm />} />
        <Route path="/tickets/:id" element={<TicketDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
