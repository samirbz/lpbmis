import { useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import LocaleContext from "./context/LocaleContext";

import { Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoginPage from "./pages/LoginPage";
import "./config/i18n";
import AuthContext from "./context/AuthContext";
import { getUserFromLocalStorage } from "./utils/localStorageUtils";
import LandingSection from "./components/LandingSection";
import LayoutPage from "./pages/LayoutPage";
import Board from "./components/Board";
import { ToastContainer } from "react-toastify";
import ProjectOverviewTab from "./components/ProjectOverviewTab";
import ProjectRequests from "./components/ProjectRequests";
import ProjectRequestDetail from "./components/ProjectRequestDetail";
import Account from "./components/Account";
import ProjectRegisterTab from "./components/ProjectRegisterTab";
import ProjectEditTab from "./components/ProjectEditTab";
import ProjectEditDetails from "./components/ProjectEditDetails";
import Project from "./components/Project";
import ProjectDetails from "./components/ProjectDetails";
import OverviewPage from "./components/OverviewPage";
import PublicLayoutPage from "./components/PublicLayoutPage";
import NiceModal from "@ebay/nice-modal-react";
import useDetectMobile from "./hooks/useDetectMobile";
import ProjectDraftsTab from "./components/ProjectDraftsTab";
import NotificationBoard from "./components/NotificationBoard";
import AdminLayoutPage from "./pages/AdminLayoutPage";
import AccountManagementBoard from "./components/AccountManagementBoard";
import AccountsOverview from "./components/AccountsOverview";
import AccountRegister from "./components/AccountRegister";
import PalikaManagementBoard from "./components/PalikaManagementBoard";
import PalikaOverview from "./components/PalikaOverview";
import PalikaManagement from "./components/PalikaManagement";

function App() {
  useDetectMobile();

  const [locale, setLocale] = useState("en");
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken"));
  const [user, setUser] = useState(getUserFromLocalStorage());
  const queryClient = new QueryClient();

  return (
    <AuthContext.Provider
      value={{
        jwtToken,
        setJwtToken,
        user,
        setUser,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <LocaleContext.Provider value={{ locale, setLocale }}>
          <NiceModal.Provider>
            <ToastContainer />
            <Routes>
              <Route path="" element={<PublicLayoutPage />}>
                <Route index element={<LandingSection />} />
                <Route path="/login" element={<LoginPage />} />
              </Route>
              <Route path="/dashboard" element={<LayoutPage />}>
                <Route index element={<OverviewPage />} />
                <Route path="account" element={<Account />} />
                <Route path="notifications" element={<NotificationBoard />} />
                <Route path="projects" element={<Board />}>
                  <Route index element={<ProjectOverviewTab />} />
                  <Route path="one" element={<ProjectDetails />}>
                    <Route path=":projectId" element={<ProjectDetails />} />
                  </Route>
                  <Route path="register" element={<ProjectRegisterTab />} />
                  <Route path="edit" element={<ProjectEditTab />}>
                    <Route path=":projectId" element={<ProjectEditDetails />} />
                  </Route>
                  <Route path="drafts" element={<ProjectDraftsTab />}>
                    <Route path=":projectId" element={<Project />} />
                  </Route>
                  <Route path="requests" element={<ProjectRequests />}>
                    <Route
                      path=":projectId"
                      element={<ProjectRequestDetail />}
                    />
                  </Route>
                  <Route path="*" element={<div>Not found</div>} />
                </Route>
              </Route>
              <Route path="/admin" element={<AdminLayoutPage />}>
                <Route path="palika" element={<PalikaManagementBoard />}>
                  <Route
                    index
                    element={<Navigate to="/admin/palika/manage" replace />}
                  />
                  <Route path="manage" element={<PalikaManagement />} />
                </Route>
                <Route path="accounts" element={<AccountManagementBoard />}>
                  <Route
                    index
                    element={<Navigate to="/admin/accounts/overview" replace />}
                  />
                  <Route path="overview" element={<AccountsOverview />} />
                  <Route path="register" element={<AccountRegister />} />
                </Route>
              </Route>
            </Routes>
          </NiceModal.Provider>
        </LocaleContext.Provider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
