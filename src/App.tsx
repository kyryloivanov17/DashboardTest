import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DashboardStats from "./components/DashboardStats";
import CampaignsTable from "./components/CampaignsTable";
import AgentTraining from "./components/AgentTraining";
import Leads from "./pages/Leads";
import Clients from "./pages/Clients";
import Appointments from "./pages/Appointments";
import Settings from "./pages/Settings";
import Campaigns from "./components/Campaigns";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <DashboardStats />
            <CampaignsTable />
          </div>
        );
      case "leads":
        return <Leads />;
      case "clients":
        return <Clients />;
      case "appointments":
        return <Appointments />;
      case "agent-training":
        return <AgentTraining />;
      case "settings":
        return <Settings />;
      case "campaigns":
        return <Campaigns />;
      default:
        return (
          <div className="space-y-6">
            <DashboardStats />
            <CampaignsTable />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex-1 min-w-0">
        <Header
          setIsSidebarOpen={setIsSidebarOpen}
          currentPage={currentPage}
          isMobile={isMobile}
        />
        <main className="p-4 md:p-6 mt-16">
          <div className="max-w-7xl mx-auto">{renderPage()}</div>
        </main>
      </div>
    </div>
  );
}
