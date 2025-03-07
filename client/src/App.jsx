import React, { useContext, useState } from "react";
import {
  HashRouter as Router,
  Route,
  Navigate,
  Routes,
  useNavigate,
} from "react-router-dom";
import Client from "./Routes/Client";
import Agent from "./Routes/Agent";
import AdminPage from "./Routes/AdminPage";
import Unauthorized from "./Routes/Unauthorized";
import { Header } from "./components/Header";
import ProtectedRoute from "./Routes/ProtectedRoute";
import SignIn from "./Routes/SignInPage"; // from material ui templates
const App = () => {
  const [user, setUser] = useState(null);
  const handleLogin = () =>
    setUser({ id: "1", name: "robin", roles: ["admin", "agent"] });
  const handleLogout = () => setUser(null);
  return (
    <Router>
      <React.Fragment>
        <Header user={user} login={handleLogin} logout={handleLogout}></Header>
        <Routes>
          <Route exact path="/" element={<Client />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute
                allowedRoles={!user}
              >
                <SignIn user={setUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agent"
            element={
              <ProtectedRoute
                allowedRoles={!!user && user.roles.includes("agent")}
              >
                <Agent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute
                allowedRoles={!!user && user.roles.includes("admin")}
              >
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </React.Fragment>
    </Router>
  );
};
export default App;
