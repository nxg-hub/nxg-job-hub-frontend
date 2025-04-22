import { useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  matchesData,
  messagesData,
  candidatesData,
  employersData,
  jobsData,
  industryOptions,
  locationOptions,
  typeOptions,
  agentData,
} from "@/utils/data/agent-mock-data";
import DashboardSidebar from "./Dashboard/Agent/dashboard-sidebar";
import DashboardHeader from "./Dashboard/Agent/dashboard-header";
import DashboardTab from "./Dashboard/Agent/dashboard-tab";
import MatchesTab from "./Dashboard/Agent/matches-tab";
import JobsTab from "./Dashboard/Agent/jobs-tab";
import CandidatesTab from "./Dashboard/Agent/candidates-tabs";
import EmployersTab from "./Dashboard/Agent/employers-tab";
import MessagesTab from "./Dashboard/Agent/messages-tab";
import AgentProfilePage from "./Dashboard/Agent/agentprofile";

export default function DashboardForAgent() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <SidebarInset>
          <div className="flex h-full flex-col">
            <DashboardHeader />
            <main className="flex-1 overflow-auto p-4 lg:p-6">
              {activeTab === "dashboard" && <DashboardTab />}

              {activeTab === "matches" && <MatchesTab />}

              {activeTab === "jobs" && (
                <JobsTab
                  jobsData={jobsData}
                  industryOptions={industryOptions}
                  locationOptions={locationOptions}
                  typeOptions={typeOptions}
                />
              )}

              {activeTab === "candidates" && (
                <CandidatesTab candidatesData={candidatesData} />
              )}

              {activeTab === "employers" && (
                <EmployersTab employersData={employersData} />
              )}

              {activeTab === "messages" && (
                <MessagesTab messagesData={messagesData} />
              )}

              {activeTab === "profile" && (
                <AgentProfilePage agentData={agentData} />
              )}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
