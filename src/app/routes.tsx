import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminUsersPage from "../pages/admin/AdminPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/register";
import Homepage from "../pages/home/HomePage";
import IndicatorsPage from "../pages/indicators/IndicatorsPage";
import LandingPage from "../pages/landing/LandingPage";
import DashboardLayout from "../pages/layout/DashboardLayout";
import ResponsiblePage from "../pages/responsible/ResponsiblePage";
import ResultsPage from "../pages/results/Results";
import SourcePage from "../pages/source/SourcePage";
import VisualRepresentationPage from "../pages/visualRepresentation/visualRepresentation";
import AuthGuard from "./guards/AuthGuard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/home"
          element={
            <AuthGuard
              allowedRoles={[
                "admin",
                "user",
                "Verificador",
                "Validador",
                "Administrativo",
                "invitado",
                "Estandar",
                "EstandarPlus",
              ]}
            >
              <DashboardLayout>
                <Homepage />
              </DashboardLayout>
            </AuthGuard>
          }
        />
        <Route
          path="/adminUsers"
          element={
            <AuthGuard
              allowedRoles={["admin", "Administrativo", "Verificador"]}
            >
              <DashboardLayout>
                <AdminUsersPage />
              </DashboardLayout>
            </AuthGuard>
          }
        />
        <Route
          path="/indicators"
          element={
            <AuthGuard allowedRoles={["admin", "Administrativo"]}>
              <DashboardLayout>
                <IndicatorsPage />
              </DashboardLayout>
            </AuthGuard>
          }
        />
        <Route
          path="/responsible"
          element={
            <AuthGuard allowedRoles={["admin", "Validador", "Verificador"]}>
              <DashboardLayout>
                <ResponsiblePage />
              </DashboardLayout>
            </AuthGuard>
          }
        />
        <Route
          path="/source"
          element={
            <AuthGuard allowedRoles={["admin", "Validador"]}>
              <DashboardLayout>
                <SourcePage />
              </DashboardLayout>
            </AuthGuard>
          }
        />
        <Route
          path="/results"
          element={
            <AuthGuard allowedRoles={["admin", "Verificador"]}>
              <DashboardLayout>
                <ResultsPage />
              </DashboardLayout>
            </AuthGuard>
          }
        />
        <Route
          path="/visual-representation"
          element={
            <AuthGuard allowedRoles={["admin", "Validador", "Verificador"]}>
              <DashboardLayout>
                <VisualRepresentationPage />
              </DashboardLayout>
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
