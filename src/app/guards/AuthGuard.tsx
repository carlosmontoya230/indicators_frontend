import { Navigate } from "react-router-dom";

import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const token = localStorage.getItem("token");
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si quieres proteger por roles:
  if (
    allowedRoles &&
    !roles.some((role: string) => allowedRoles.includes(role))
  ) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
