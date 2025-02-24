import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../data/theme";
import Sidebar from "../components/admin/dashboard/Scenes/Sidebar";
import Topbar from "../components/admin/dashboard/Scenes/Topbar";

// Import các trang Admin
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/admin/dashboard/Scenes/dashboard";
import Team from "../components/admin/dashboard/Scenes/team";
import Invoices from "../components/admin/dashboard/Scenes/invoices";
import Contacts from "../components/admin/dashboard/Scenes/contacts";
import Bar from "../components/admin/dashboard/Scenes/bar";
import Form from "../components/admin/dashboard/Scenes/form";
import Line from "../components/admin/dashboard/Scenes/line";
import Pie from "../components/admin/dashboard/Scenes/pie";
import FAQ from "../components/admin/dashboard/Scenes/faq";
import "../assets/css/Admin.css";
function Admin() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="team" element={<Team />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="form" element={<Form />} />
              <Route path="bar" element={<Bar />} />
              <Route path="pie" element={<Pie />} />
              <Route path="line" element={<Line />} />
              <Route path="faq" element={<FAQ />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Admin;
