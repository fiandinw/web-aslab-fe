import { useState, useMemo } from "react"
import { Route, Routes } from "react-router-dom"
import Admin from "./containers/Admin"
import AdminAkun from "./containers/AdminAkun"
import AdminDashboard from "./containers/AdminDashboard"
import AdminRekap from "./containers/AdminRekap"
import Dashboard from "./containers/Dashboard"
import Homepage from "./containers/Homepage"
import Lapor from "./containers/Lapor"
import Login from "./containers/Login"
import Page404 from "./containers/Page404"
import Rekap from "./containers/Rekap"
import { UserContext } from "./context/UserContext"

function App() {
  const [user, setUser] = useState('')
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={value}>
      <div className="bg-gradient-to-br from-cyan-700 to-cyan-900 min-h-screen">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="lapor" element={<Lapor />} />
          <Route path="rekap" element={<Rekap />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/akun" element={<AdminAkun />} />
          <Route path="admin/rekap" element={<AdminRekap />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </UserContext.Provider>
  )
}

export default App
