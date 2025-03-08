import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../data/theme";
import Sidebar from "../components/admin/dashboard/Scenes/Sidebar";
import Topbar from "../components/admin/dashboard/Scenes/Topbar";

// Import các trang Admin
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/admin/dashboard/Scenes/dashboard";
import Tutor from "../components/admin/dashboard/Scenes/Tutor";
import Course from "../components/admin/dashboard/Scenes/Category";
import Learner from "../components/admin/dashboard/Scenes/Learner";
import Bar from "../components/admin/dashboard/Scenes/bar";
import Form from "../components/admin/dashboard/Scenes/form";
import Line from "../components/admin/dashboard/Scenes/line";
import Pie from "../components/admin/dashboard/Scenes/pie";
import FAQ from "../components/admin/dashboard/Scenes/faq";
import Ad from "../components/admin/dashboard/Scenes/Admin";
import "../assets/css/Admin.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function Admin() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Ad />} />
              <Route path="ad" element={<Ad/>} />
              <Route path="team" element={<Tutor />} />
              <Route path="contacts" element={<Learner />} />
              <Route path="invoices" element={<Course />} />
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
    </QueryClientProvider>
  );
}

export default Admin;
