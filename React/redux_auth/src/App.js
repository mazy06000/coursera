import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import Welcome from "./features/auth/Welcome";
import RequireAuth from "./features/auth/RequireAuth";
import Public from "./components/Public";
import UsersList from "./features/users/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* private routes */}
        <Route element={<RequireAuth />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="userslist" element={<UsersList />} />
      </Route>
    </Routes>
  );
}

export default App;
