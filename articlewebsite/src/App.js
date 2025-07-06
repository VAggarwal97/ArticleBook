import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
// import Admin from './Admin/Admin';
import './App.css';
import ArticleSection from "./components/ArticleSection";
import ArticleDetail from "./components/ArticleDetail";
import AdminPanel from './Admin/AdminPanel';
import AuthorManager from './Admin/AuthorManager';
import Login from "./Admin/Login";
import PrivateRoute from "./Admin/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ArticleSection />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/admin/AuthorManager" element={<AuthorManager />} />
      </Routes>
    </Router>
  );
}

export default App;
