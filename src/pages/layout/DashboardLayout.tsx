import { useEffect, useState } from "react";
import SidebarUnix from "../../components/molecules/sidebar/Sidebar";

const SIDEBAR_WIDTH = 220;
const SIDEBAR_WIDTH_CLOSED = 0;

const sidebarItems = [
  {
    label: "Inicio",
    path: "/home",
    icon: <span>🏠</span>,
    allowedRoles: [
      "admin",
      "user",
      "Verificador",
      "Validador",
      "Administrativo",
      "invitado",
      "Estandar",
      "EstandarPlus",
    ],
  },
  {
    label: "Users",
    path: "/adminUsers",
    icon: <span>👪</span>,
    allowedRoles: ["admin"],
  },
  {
    label: "Indicadores",
    path: "/indicators",
    icon: <span>📊</span>,
    allowedRoles: ["admin", "Administrativo", "Verificador"],
  },
  {
    label: "Responsables",
    path: "/responsible",
    icon: <span>👨‍🏭</span>,
    allowedRoles: ["admin", "Validador", "Verificador"],
  },
  {
    label: "Fuente",
    path: "/source",
    icon: <span>🖊️</span>,
    allowedRoles: ["admin", "Validador"],
  },
  {
    label: "Resultados",
    path: "/results",
    icon: <span>💫</span>,
    allowedRoles: ["admin", "Verificador"],
  },
  {
    label: "Representación Visual",
    path: "/visual-representation",
    icon: <span>👁️</span>,
    allowedRoles: ["admin", "Validador", "Verificador"],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [roles, setRoles] = useState<(string | number)[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setRoles(JSON.parse(localStorage.getItem("roles") || "[]"));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <SidebarUnix
        items={sidebarItems}
        userRoles={roles}
        onToggle={setSidebarOpen}
      />
      <div
        style={{
          marginLeft: sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_CLOSED,
          width: "100%",
          transition: "margin-left 0.35s cubic-bezier(.77,0,.18,1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
